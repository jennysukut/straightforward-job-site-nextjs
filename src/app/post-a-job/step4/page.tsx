"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useJobs } from "@/contexts/JobsContext";

import SiteButton from "@/components/siteButton";
import DeleteHandler from "@/components/deleteHandler";
import AddHandler from "@/components/addHandler";
import LabelGeneratorAndDisplayComp from "@/components/labelGenAndDisplayComponent";
import PopulateDisplayField from "@/components/populateDisplayField";
import UpdateHandler from "@/components/updateHandler";
import AddResponsibilityModal from "@/components/modals/postAJobModals/addResponsibilitiesModal";

const jobSchema = z.object({
  responsibilities: z
    .array(
      z.object({
        responsibility: z
          .string()
          .min(1, { message: "Description is required" }),
        id: z.number(),
      }),
    )
    .min(0, { message: "You Must Have At Least 1 Responsibility Listed" }),
  perks: z
    .array(z.string())
    .min(1, { message: "You Must Have At Least 1 Perk Listed" }),
});

type FormData = z.infer<typeof jobSchema>;

// Responsibilities of the position might need to be shown differently - the labels just don't look right - perhaps something that shows as a bullet point or perhaps ads via a modal?

export default function PostAJobStep4() {
  const { job, setJob } = useJobs();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [responsibilities, setResponsibilities] = useState<
    Array<{
      id: number;
      responsibility: string;
    }>
  >([]);
  const [responsibilityCounter, setResponsibilityCounter] = useState(1);
  const [perks, setPerks] = useState<string[]>([]);
  const {
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      responsibilities: responsibilities,
      perks: perks,
    },
  });

  console.log(responsibilities, perks);
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
      hasId: {
        responsibilities: true,
        perks: false,
      },
      counterFunctions: {
        responsibilities: setResponsibilityCounter,
      },
      counterDetails: {
        responsibilities: responsibilityCounter,
      },
    });
  };

  const handleUpdate = (
    type: "responsibilities",
    updatedData: any,
    id: any,
  ) => {
    UpdateHandler({
      item: id,
      updatedData,
      type,
      setFunctions: {
        responsibilities: setResponsibilities,
      },
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
      hasId: {
        responsibilities: true,
        perks: false,
      },
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // put a stipulation that the responsibilities and perks section has to have more value, else you can't submit
    setDisabledButton(true);
    console.log("submitting form:", data);
    setJob({
      ...job,
      responsibilities: responsibilities,
      perks: perks,
    });
    router.push("/post-a-job/step5");
  };

  useEffect(() => {
    {
      job?.responsibilities &&
        Array.isArray(job?.responsibilities) &&
        setResponsibilities(job?.responsibilities);
    }
    setValue("responsibilities", job?.responsibilities || []);
    setPerks(Array.isArray(job?.perks) ? job?.perks : []);
    setValue("perks", job?.perks || []);
  }, []);

  useEffect(() => {
    setValue("responsibilities", responsibilities);
    setValue("perks", perks);
  }, [responsibilities, perks]);

  return (
    <div className="PostAJobPage2 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="PostAJobContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <h1 className="JobName pl-8 tracking-superwide text-midnight">
          {job?.jobTitle || "Test Job Title"}
        </h1>
        <form
          className="PostAJobStep3Form xs:pt-8 flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="PositionTypeDetails -mt-8 pl-8 italic">
            Responsibilities and Perks of the Job:
          </p>

          {/* Add + Display Responsibilities */}
          <PopulateDisplayField
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            selectedArray={responsibilities}
            aria="responsibilities"
            title={`Responsibilities Of The Position`}
            addModal={<AddResponsibilityModal />}
            displayOption1="responsibility"
            required
            height="tall"
            errors={errors.responsibilities}
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
            addClassesToResults="pl-8"
          />

          <div className="ButtonContainer -mb-6 mt-6 flex justify-end self-end">
            <SiteButton
              variant="hollow"
              colorScheme="f1"
              aria="submit"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={disabledButton}
            >
              {disabledButton && job?.jobIsBeingEdited === true
                ? "Returning To Listing..."
                : !disabledButton && job?.jobIsBeingEdited === true
                  ? "update"
                  : disabledButton && job?.jobIsBeingEdited === false
                    ? "Saving Information.."
                    : "continue"}
            </SiteButton>
          </div>
        </form>
      </div>
    </div>
  );
}
