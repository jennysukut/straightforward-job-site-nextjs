"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useModal } from "@/contexts/ModalContext";
import { useJob } from "@/contexts/JobContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useMutation } from "@apollo/client";
import { ADD_JOB_LISTING_DETAILS_5_MUTATION } from "@/graphql/mutations";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import DeleteHandler from "@/components/handlers/deleteHandler";
import AddHandler from "@/components/handlers/addHandler";
import UpdateHandler from "@/components/handlers/updateHandler";
import PopulateDisplayField from "@/components/informationDisplayComponents/populateDisplayField";
import AddInterviewProcessModal from "@/components/modals/postAJobModals/addInterviewProcessModal";
import ApplicationLimitModal from "@/components/modals/postAJobModals/applicationLimitModal";

const jobSchema = z.object({
  interviewProcess: z
    .array(
      z.object({
        stage: z.string(),
        step: z.string().min(1, { message: "Step Name is Required" }),
        details: z
          .string()
          .min(2, { message: "Please Include More Information" }),
        id: z.number(),
      }),
    )
    .min(1, {
      message: "Please Provide More Details About Your Interviewing Process",
    }),
});

type FormData = z.infer<typeof jobSchema>;

export default function PostAJobStep5() {
  const { job, setJob } = useJob();
  const { textColor, titleColor } = useColorOptions();
  const { showModal } = useModal();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [interviewProcess, setInterviewProcess] = useState<
    Array<{
      stage: string;
      step: string;
      details: string;
      id: number;
    }>
  >([]);
  const [processCounter, setProcessCounter] = useState(1);
  const [addJobListingDetailsStep5, { loading, error }] = useMutation(
    ADD_JOB_LISTING_DETAILS_5_MUTATION,
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
      hasId: { interviewProcess: true },
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

    try {
      const response = await addJobListingDetailsStep5({
        variables: {
          id: job?.id,
          interviewProcess: interviewProcess,
        },
      });

      console.log(
        "Details saved successfully, Details:",
        response.data.addJobListingDetailsStep4,
      );

      setJob({
        ...job,
        interviewProcess: interviewProcess,
        roundNumber: "1",
        beingEdited: false,
      });
      if (job?.beingEdited) {
        router.push("/listing");
      } else {
        router.push("/listing");
        showModal(<ApplicationLimitModal jobId={job?.id} />);
      }
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  useEffect(() => {
    setInterviewProcess(
      Array.isArray(job?.interviewProcess) ? job?.interviewProcess : [],
    );
    setValue("interviewProcess", job?.interviewProcess || []);
  }, [job?.interviewProcess, setValue]);

  useEffect(() => {
    setValue("interviewProcess", interviewProcess);
    clearErrors("interviewProcess");
  }, [interviewProcess, setValue, clearErrors]);

  return (
    <div
      className={`PostAJobPage2 flex w-[95vw] max-w-[1600px] ${textColor} flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8`}
    >
      <div className="PostAJobContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <h1 className={`JobName pl-8 tracking-superwide ${titleColor}`}>
          {job?.jobTitle || "Test Job Title"}
        </h1>
        <form
          className="PostAJobStep3Form xs:pt-8 flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            errors={errors.interviewProcess}
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
              {disabledButton && job?.beingEdited === true
                ? "Returning To Listing..."
                : !disabledButton && job?.beingEdited === true
                  ? "update"
                  : disabledButton && job?.beingEdited === false
                    ? "Saving Information.."
                    : "continue"}
            </SiteButton>
          </div>
        </form>
      </div>
    </div>
  );
}
