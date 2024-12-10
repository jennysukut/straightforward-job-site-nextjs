"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useBusiness } from "@/contexts/BusinessContext";

import SiteButton from "@/components/siteButton";
import DeleteHandler from "@/components/deleteHandler";
import AddHandler from "@/components/addHandler";
import LabelGeneratorAndDisplayComp from "@/components/labelGenAndDisplayComponent";

const jobSchema = z.object({
  responsibilities: z
    .array(z.string())
    .min(1, { message: "You Must Have At Least 1 Responsibility Listed" }),
  perks: z
    .array(z.string())
    .min(1, { message: "You Must Have At Least 1 Perk Listed" }),
});

type FormData = z.infer<typeof jobSchema>;

export default function PostAJobStep4() {
  const { business, setBusiness } = useBusiness();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [perks, setPerks] = useState<string[]>([]);
  const {
    handleSubmit,
    setValue,
    register,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {},
  });

  const latestArrayIndex = business?.activeJobs.length
    ? business.activeJobs.length - 1
    : -1;

  // handlers for adding, updating, and deleting details
  const handleAdd = (type: "responsibilities" | "perks", data: any) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        responsibilities: setResponsibilities,
        perks: setPerks,
      },
      setValue,
      clearErrors,
    });
  };

  const handleDelete = (type: "responsibilities" | "perks", id: any) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        responsibilities: setResponsibilities,
        perks: setPerks,
      },
      setValue,
      clearErrors,
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    setBusiness({
      ...business,
      activeJobs:
        business?.activeJobs.map((job: any, index: number) => {
          if (index === business.activeJobs.length - 1) {
            return {
              ...job,
              responsibilities: responsibilities,
              perks: perks,
            };
          }
          return job;
        }) || [],
    });
    router.push("/post-a-job/step5");
  };

  useEffect(() => {
    setResponsibilities(
      Array.isArray(business?.activeJobs[latestArrayIndex].responsibilities)
        ? business?.activeJobs[latestArrayIndex].responsibilities
        : [],
    );
    setPerks(
      Array.isArray(business?.activeJobs[latestArrayIndex].perks)
        ? business?.activeJobs[latestArrayIndex].perks
        : [],
    );
    setValue(
      "responsibilities",
      business?.activeJobs[latestArrayIndex].responsibilities || [],
    );
    setValue("perks", business?.activeJobs[latestArrayIndex].perks || []);
  }, []);

  useEffect(() => {
    const latestJob = business?.activeJobs[latestArrayIndex];
  }, []);

  return (
    <div className="PostAJobPage2 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="PostAJobContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <h1 className="JobName pl-8 tracking-superwide text-midnight">
          {business?.activeJobs[latestArrayIndex].jobTitle || "Test Job Title"}
        </h1>
        <p className="PositionTypeDetails -mt-8 pl-8 italic">
          Responsibilities and Perks of the Job:
        </p>

        {/* responsibilities generator */}
        <LabelGeneratorAndDisplayComp
          handleAdd={handleAdd}
          errors={errors.responsibilities}
          selectedArray={responsibilities}
          handleDelete={handleDelete}
          placeholder="Responsibilities Of The Position"
          name="responsibilities"
          variant="functional"
          required
          width="full"
        />

        {/* perks generator */}
        <LabelGeneratorAndDisplayComp
          handleAdd={handleAdd}
          errors={errors.perks}
          selectedArray={perks}
          handleDelete={handleDelete}
          placeholder="Perks Of The Position"
          name="perks"
          variant="functional"
          required
          width="full"
        />

        <form
          className="PostAJobStep3Form xs:pt-8 flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="ButtonContainer -mb-6 mt-6 flex justify-end self-end">
            <SiteButton
              variant="hollow"
              colorScheme="f1"
              aria="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={disabledButton}
            >
              {disabledButton && business?.profileIsBeingEdited === true
                ? "Returning To Profile..."
                : !disabledButton && business?.profileIsBeingEdited === true
                  ? "update"
                  : disabledButton && business?.profileIsBeingEdited === false
                    ? "Saving Information.."
                    : "continue"}
            </SiteButton>
          </div>
        </form>
      </div>
    </div>
  );
}
