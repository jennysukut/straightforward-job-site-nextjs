"use client";

import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBusiness } from "@/contexts/BusinessContext";
import { skillsList } from "@/lib/skillsList";

import SiteButton from "@/components/siteButton";
import InputComponent from "@/components/inputComponent";
import AddHandler from "@/components/addHandler";
import DeleteHandler from "@/components/deleteHandler";
import LabelGeneratorAndDisplayComp from "@/components/labelGenAndDisplayComponent";

import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
type CurrentSchemeType = ButtonColorOption;

const jobSchema = z.object({
  positionSummary: z
    .string()
    .min(5, { message: "Your Position Summary Must Be More Than 5 Letters" }),
  nonNegSkills: z.array(z.string()),
});

type FormData = z.infer<typeof jobSchema>;

export default function PostAJobStep1() {
  const router = useRouter();
  const { business, setBusiness } = useBusiness();

  const [disabledButton, setDisabledButton] = useState(false);
  const [nonNegSkills, setNonNegSkills] = useState<string[]>([]);

  const {
    handleSubmit,
    setValue,
    register,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: { nonNegSkills: nonNegSkills },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    console.log(data.positionSummary, nonNegSkills);
    setBusiness({
      ...business,
      activeJobs:
        business?.activeJobs.map((job: any, index: number) => {
          if (index === business.activeJobs.length - 1) {
            return {
              ...job,
              positionSummary: data.positionSummary,
              nonNegSkills: nonNegSkills,
            };
          }
          return job;
        }) || [],
    });
    router.push("/post-a-job/step2");
  };

  // handlers for adding, updating, and deleting information tied to States
  const handleAdd = (type: "nonNegSkills", item: any) => {
    AddHandler({
      item,
      type,
      setFunctions: {
        nonNegSkills: setNonNegSkills,
      },
      setValue,
      clearErrors,
    });
  };

  const handleDelete = (type: "nonNegSkills", item: any) => {
    DeleteHandler({
      item,
      type,
      setFunctions: {
        nonNegSkills: setNonNegSkills,
      },
    });
  };

  const latestArrayIndex = business?.activeJobs.length
    ? business.activeJobs.length - 1
    : -1;

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    setNonNegSkills(
      Array.isArray(business?.activeJobs[latestArrayIndex].nonNegSkills)
        ? business?.activeJobs[latestArrayIndex].nonNegSkills
        : [],
    );
  }, []);

  return (
    <div className="PostAJobPage flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center justify-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="PostAJobContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <h1 className="JobName pl-8 tracking-superwide text-midnight">
          {business?.activeJobs[latestArrayIndex].jobTitle || "Test Job Title"}
        </h1>
        <p className="PositionTypeDetails -mt-8 pl-8 italic">
          Position Type:{" "}
          {capitalizeFirstLetter(
            business?.activeJobs[latestArrayIndex].positionType,
          )}
        </p>
        <form
          className="PostAJobStep1Form xs:pt-8 flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* position summary input */}
          <InputComponent
            type="text"
            placeholderText="Position Summary"
            errors={errors.positionSummary}
            register={register}
            registerValue="positionSummary"
            defaultValue={
              business?.activeJobs[latestArrayIndex].positionSummary
            }
            size="medium"
            width="full"
          />

          {/* non negotiable skills / parameters input & generator */}
          <LabelGeneratorAndDisplayComp
            handleAdd={handleAdd}
            errors={errors.nonNegSkills}
            selectedArray={nonNegSkills}
            handleDelete={handleDelete}
            placeholder="Non-Negotiable Parameters: pick 0-3"
            name="nonNegSkills"
            variant="functional"
            options
            searchData={skillsList}
            title="non-negotiable parameters:"
            width="full"
          />
        </form>

        <div className="ButtonContainer -mb-6 mt-6 flex justify-end gap-4 self-end">
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
                  : "continue"}{" "}
          </SiteButton>
        </div>
      </div>
    </div>
  );
}
