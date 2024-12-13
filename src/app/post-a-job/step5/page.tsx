"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useModal } from "@/contexts/ModalContext";
import { useJobs } from "@/contexts/JobsContext";

import SiteButton from "@/components/siteButton";
import DeleteHandler from "@/components/deleteHandler";
import AddHandler from "@/components/addHandler";
import UpdateHandler from "@/components/updateHandler";
import PopulateDisplayField from "@/components/populateDisplayField";
import AddInterviewProcessModal from "@/components/modals/postAJobModals/addInterviewProcessModal";
import ApplicationLimitModal from "@/components/modals/postAJobModals/applicationLimitModal";

const jobSchema = z.object({
  interviewProcess: z.array(z.string()).min(1, {
    message: "Please Provide More Details About Your Interviewing Process",
  }),
});

type FormData = z.infer<typeof jobSchema>;

export default function PostAJobStep5() {
  const { job, setJob } = useJobs();
  const { showModal } = useModal();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [interviewProcess, setInterviewProcess] = useState<string[]>([]);
  const [processCounter, setProcessCounter] = useState(1);

  const {
    setValue,
    register,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {},
  });

  // handlers for adding, updating, and deleting details
  const handleAdd = (type: "interviewProcess", data: any) => {
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

  const handleSubmit = () => {
    setDisabledButton(true);
    setJob({
      ...job,
      interviewProcess: interviewProcess,
    });
    router.push("/listing");
    // showModal(<ApplicationLimitModal />);
  };

  useEffect(() => {
    setInterviewProcess(
      Array.isArray(job?.interviewProcess) ? job?.interviewProcess : [],
    );
    setValue("interviewProcess", job?.interviewProcess || []);
  }, []);

  return (
    <div className="PostAJobPage2 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="PostAJobContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <h1 className="JobName pl-8 tracking-superwide text-midnight">
          {job?.jobTitle || "Test Job Title"}
        </h1>
        <p className="PositionTypeDetails -mt-8 pl-8 italic">
          What does your interview process look like?
        </p>

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
            onClick={handleSubmit}
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
      </div>
    </div>
  );
}
