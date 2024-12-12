"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { skillsList } from "@/lib/skillsList";
import { useJobs } from "@/contexts/JobsContext";

import SiteButton from "@/components/siteButton";
import InputComponent from "@/components/inputComponent";
import DeleteHandler from "@/components/deleteHandler";
import AddHandler from "@/components/addHandler";
import ButtonOptionsComponent from "@/components/buttonOptionsComponent";
import LabelGeneratorAndDisplayComp from "@/components/labelGenAndDisplayComponent";

const jobSchema = z.object({
  experienceLevel: z.array(z.string()).min(1, {
    message: "Experience Level Required",
  }),
  preferredSkills: z
    .array(z.string())
    .min(1, { message: "You Must Have At Least 1 Skill Listed" }),
  moreAboutPosition: z
    .string()
    .min(3, { message: "Please Provide More Details About This Position" }),
});

type FormData = z.infer<typeof jobSchema>;

export default function PostAJobStep3() {
  const { job, setJob } = useJobs();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [preferredSkills, setPreferredSkills] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
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

    setJob({
      ...job,
      experienceLevel: data.experienceLevel,
      preferredSkills: preferredSkills,
      moreAboutPosition: data.moreAboutPosition,
    });
    router.push("/post-a-job/step4");
  };

  useEffect(() => {
    setPreferredSkills(
      Array.isArray(job?.preferredSkills) ? job?.preferredSkills : [],
    );
    setExperienceLevel(
      Array.isArray(job?.experienceLevel) ? job?.experienceLevel : [],
    );
    setValue("preferredSkills", job?.preferredSkills || []);
    setValue("experienceLevel", job?.experienceLevel || []);
  }, []);

  return (
    <div className="PostAJobPage2 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="PostAJobContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <h1 className="JobName pl-8 tracking-superwide text-midnight">
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
            </SiteButton>
          </div>
        </form>
      </div>
    </div>
  );
}
