"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useBusiness } from "@/contexts/BusinessContext";
import { skillsList } from "@/lib/skillsList";

import SiteButton from "@/components/siteButton";
import InputComponent from "@/components/inputComponent";
import DeleteHandler from "@/components/deleteHandler";
import AddHandler from "@/components/addHandler";
import ButtonOptionsComponent from "@/components/buttonOptionsComponent";
import LabelGeneratorAndDisplayComp from "@/components/labelGenAndDisplayComponent";

const jobSchema = z.object({
  experienceLevel: z.string().min(2, {
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

export default function PostAJobStep2() {
  const { business, setBusiness } = useBusiness();
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

  const latestArrayIndex = business?.activeJobs.length
    ? business.activeJobs.length - 1
    : -1;

  // handlers for adding, updating, and deleting details
  const handleAdd = (type: "experienceLevel" | "payOption", data: any) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        preferredSkills: setPreferredSkills,
        experienceLevel: setExperienceLevel,
      },
      setValue,
      clearErrors,
      oneChoice: true,
    });
  };

  const handleDelete = (type: "locationType" | "payOption", id: any) => {
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
    setBusiness({
      ...business,
      activeJobs:
        business?.activeJobs.map((job: any, index: number) => {
          if (index === business.activeJobs.length - 1) {
            return {
              ...job,
              experienceLevel: data.experienceLevel,
              preferredSkills: preferredSkills,
              moreAboutPosition: data.moreAboutPosition,
            };
          }
          return job;
        }) || [],
    });
    // router.push("/post-a-job/step3");
    router.push("/profile");
  };

  // useEffect(() => {
  //   setPreferredSkills(
  //     Array.isArray(business?.activeJobs[latestArrayIndex].preferredSkills)
  //       ? business?.activeJobs[latestArrayIndex].preferredSkills
  //       : [],
  //   );
  //   setExperienceLevel(
  //     Array.isArray(business?.activeJobs[latestArrayIndex].experienceLevel)
  //       ? business?.activeJobs[latestArrayIndex].experienceLevel
  //       : [],
  //   );
  //   setValue(
  //     "preferredSkills",
  //     business?.activeJobs[latestArrayIndex].preferredSkills || [],
  //   );
  //   setValue(
  //     "experienceLevel",
  //     business?.activeJobs[latestArrayIndex].experienceLevel || [],
  //   );
  // }, []);

  useEffect(() => {
    const latestJob = business?.activeJobs[latestArrayIndex];
    console.log(latestJob);
  }, []);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="PostAJobPage2 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
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
            // title="preferred skills:"
            width="full"
          />

          {/*  more about the position input */}
          <InputComponent
            type="text"
            placeholderText="More About This Position..."
            errors={errors.moreAboutPosition}
            register={register}
            registerValue="moreAboutPosition"
            size="medium"
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
