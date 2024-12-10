"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useBusiness } from "@/contexts/BusinessContext";
import { skillsList } from "@/lib/skillsList";

import SiteButton from "@/components/siteButton";
import DeleteHandler from "@/components/deleteHandler";
import AddHandler from "@/components/addHandler";
import UpdateHandler from "@/components/updateHandler";
import PopulateDisplayField from "@/components/populateDisplayField";
import AddInterviewProcessModal from "@/components/modals/postAJobModals/addInterviewProcessModal";

const jobSchema = z.object({
  interviewProcess: z
    .array(z.string())
    .min(1, { message: "You Must Have At Least 1 Responsibility Listed" }),
});

type FormData = z.infer<typeof jobSchema>;

export default function PostAJobStep5() {
  const { business, setBusiness } = useBusiness();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [interviewProcess, setInterviewProcess] = useState<string[]>([]);
  const [processCounter, setProcessCounter] = useState(1);

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
  const handleAdd = (type: "interviewProcess", data: any, stage: any) => {
    console.log(data);
    AddHandler({
      item: data,
      type,
      setFunctions: {
        interviewProcess: setInterviewProcess,
      },
      counterFunctions: {
        interviewProcess: setProcessCounter,
      },
      counterDetails: {
        interviewProcess: processCounter,
      },
      setValue,
      clearErrors,
      hasId: true,
    });
  };

  const handleUpdate = (
    type: "interviewProcess",
    updatedData: any,
    id: any,
  ) => {
    UpdateHandler({
      item: id,
      updatedData,
      type,
      setFunctions: {
        interviewProcess: setInterviewProcess,
      },
    });
  };

  const handleDelete = (type: "interviewProcess", id: any) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        interviewProcess: setInterviewProcess,
      },
      setValue,
      clearErrors,
      hasId: true,
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
              interviewProcess: interviewProcess,
            };
          }
          return job;
        }) || [],
    });
    // router.push("/post-a-job/step5");
    router.push("/profile");
  };

  useEffect(() => {
    // setInterviewProcess(
    //   Array.isArray(business?.activeJobs[latestArrayIndex].interviewProcess)
    //     ? business?.activeJobs[latestArrayIndex].interviewProcess
    //     : [],
    // );
    // setValue(
    //   "interviewProcess",
    //   business?.activeJobs[latestArrayIndex].interviewProcess || [],
    // );
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
          {/* Add + Display Interview Process */}
          <PopulateDisplayField
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            selectedArray={interviewProcess}
            aria="interviewProcess"
            title={`Interview Process`}
            addModal={<AddInterviewProcessModal />}
            displayOption1="stage"
            displayOption2="step"
            displayPunct=":"
            id={processCounter}
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
