"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { skillsList } from "@/lib/skillsList";
import { useJob } from "@/contexts/JobContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useMutation } from "@apollo/client";
import { ADD_JOB_LISTING_DETAILS_3_MUTATION } from "@/graphql/mutations";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import InputComponent from "@/components/inputComponents/inputComponent";
import DeleteHandler from "@/components/handlers/deleteHandler";
import AddHandler from "@/components/handlers/addHandler";
import ButtonOptionsComponent from "@/components/buttonsAndLabels/buttonOptionsComponent";
import LabelGeneratorAndDisplayComp from "@/components/buttonsAndLabels/labelGenAndDisplayComponent";

const jobSchema = z.object({
  experienceLevel: z.string(),
  preferredSkills: z
    .array(z.string())
    .min(1, { message: "You Must Have At Least 1 Skill Listed" }),
  moreAboutPosition: z
    .string()
    .min(3, { message: "Please Provide More Details About This Position" }),
});

type FormData = z.infer<typeof jobSchema>;

export default function PostAJobStep3() {
  const { job, setJob } = useJob();
  const { textColor, titleColor } = useColorOptions();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [preferredSkills, setPreferredSkills] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  const [addJobListingDetailsStep3, { loading, error }] = useMutation(
    ADD_JOB_LISTING_DETAILS_3_MUTATION,
  );
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

  // handlers for adding, updating, and deleting details
  const handleAdd = (
    type: "experienceLevel" | "preferredSkills",
    data: any,
  ) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        preferredSkills: setPreferredSkills,
        experienceLevel: setExperienceLevel,
      },
      setValue,
      clearErrors,
      oneChoice: {
        experienceLevel: true,
        preferredSkills: false,
      },
    });
  };

  const handleDelete = (
    type: "experienceLevel" | "preferredSkills",
    id: any,
  ) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        preferredSkills: setPreferredSkills,
        experienceLevel: setExperienceLevel,
      },
      setValue,
      clearErrors,
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    try {
      const response = await addJobListingDetailsStep3({
        variables: {
          id: job?.jobId,
          experienceLevel: experienceLevel,
          preferredSkills: preferredSkills,
          moreAboutPosition: data.moreAboutPosition,
        },
      });

      console.log(
        "Details saved successfully, Details:",
        response.data.addJobListingDetailsStep3,
      );

      setJob({
        ...job,
        experienceLevel: experienceLevel,
        preferredSkills: preferredSkills,
        moreAboutPosition: data.moreAboutPosition,
        // jobIsBeingEdited: false,
      });
      if (job?.jobIsBeingEdited) {
        router.push("/listing");
      } else {
        router.push("/post-a-job/step4");
      }
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  useEffect(() => {
    setPreferredSkills(
      Array.isArray(job?.preferredSkills) ? job?.preferredSkills : [],
    );
    setExperienceLevel(
      Array.isArray(job?.experienceLevel) ? job?.experienceLevel : [],
    );
    setValue("preferredSkills", job?.preferredSkills || []);
    setValue("experienceLevel", job?.experienceLevel?.[0] || "");
  }, []);

  return (
    <div
      className={`PostAJobPage2 flex w-[95vw] max-w-[1600px] ${textColor} flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8`}
    >
      <div className="PostAJobContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <h1 className={`JobName pl-8 tracking-superwide ${titleColor}`}>
          {job?.jobTitle || "Test Job Title"}
        </h1>
        <p className="PositionTypeDetails -mt-8 pl-8 italic">
          Experience Level, Skills, and Other Details:
        </p>

        <form
          className="PostAJobStep3Form xs:pt-8 flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* experience level details */}
          <ButtonOptionsComponent
            type="experienceLevel"
            title="Experience Level:"
            buttons={["entry", "junior", "senior"]}
            selectedArray={experienceLevel}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            errors={errors.experienceLevel}
            required
            classesForButtons="px-[3rem] py-3"
            addClasses="mt-4 -mb-2"
          />

          {/* preferred skills input & generator */}
          <LabelGeneratorAndDisplayComp
            handleAdd={handleAdd}
            errors={errors.preferredSkills}
            selectedArray={preferredSkills}
            handleDelete={handleDelete}
            placeholder="Preferred Skills"
            name="preferredSkills"
            variant="functional"
            options
            searchData={skillsList}
            width="full"
          />

          {/*  more about the position input */}
          <InputComponent
            type="text"
            placeholderText="More About This Position..."
            errors={errors.moreAboutPosition}
            register={register}
            registerValue="moreAboutPosition"
            defaultValue={job?.moreAboutPosition}
            size="tall"
            width="full"
          />

          <div className="ButtonContainer -mb-6 mt-6 flex justify-end self-end">
            <SiteButton
              variant="hollow"
              colorScheme="f1"
              aria="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={disabledButton}
            >
              {disabledButton && job?.jobIsBeingEdited === true
                ? "Returning To Profile..."
                : !disabledButton && job?.jobIsBeingEdited === true
                  ? "update"
                  : disabledButton && job?.jobIsBeingEdited === false
                    ? "Saving Information.."
                    : "continue"}
              {/* {disabledButton ? "Saving Information..." : "continue"} */}
            </SiteButton>
          </div>
        </form>
      </div>
    </div>
  );
}
