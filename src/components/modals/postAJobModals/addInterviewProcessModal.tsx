"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useModal } from "@/contexts/ModalContext";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

import FormInputComponent from "@/components/inputComponents/formInputComponent";
import FormSubmissionButton from "@/components/buttonsAndLabels/formSubmissionButton";
import DeleteConfirmationModal from "../deleteConfirmationModal";

const InterviewProcessSchema = z.object({
  stage: z.string(),
  step: z.string().min(2, { message: "Step Required" }),
  details: z.string().optional(),
});

type FormData = z.infer<typeof InterviewProcessSchema>;

export default function AddInterviewProcessModal({
  handleAdd,
  canDelete,
  itemInfo,
  handleDelete,
  handleUpdate,
  id,
}: any) {
  const { showModal, hideModal } = useModal();
  const { textColor } = useColorOptions();
  const [disabledButton, setDisabledButton] = useState(false);
  const type = "interviewProcess";
  const stageNumber = id;
  const stage = "Stage " + stageNumber;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(InterviewProcessSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    if (canDelete) {
      handleUpdate(type, data, itemInfo.id);
    } else {
      handleAdd(type, data);
    }

    setTimeout(() => {
      hideModal();
    }, 500);

    //send details to the server to be saved and rendered on the next page
    //   try {
    //   } catch (err) {
    //     showModal(<ErrorModal />);
    //   }
  };

  const continueDelete = () => {
    handleDelete(type, itemInfo.id);
    hideModal();
  };

  const clickDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    showModal(
      <DeleteConfirmationModal
        continueDelete={continueDelete}
        item="this step"
      />,
    );
  };

  useEffect(() => {
    setValue("stage", stage);
  }, [setValue, stage]);

  return (
    <div
      className={`AddExperienceModal flex w-[50vw] max-w-[450px] flex-col gap-4 ${textColor}`}
    >
      <Dialog.Title className="Title mb-4 max-w-[450px] self-center text-center text-xl font-bold">
        interview stage {stageNumber}:
      </Dialog.Title>
      <form
        className="InterviewStepsForm xs:pt-8 flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* interview step input */}
        <FormInputComponent
          type="text"
          title="step*"
          defaultValue={itemInfo?.step}
          placeholderText="Interview Step"
          register={register}
          registerValue="step"
          errors={errors.step}
        />

        {/* details input */}
        <FormInputComponent
          type="text"
          title="details*"
          defaultValue={itemInfo?.details}
          placeholderText="Details About This Step"
          register={register}
          registerValue="details"
          errors={errors.details}
        />

        {/* form submission button */}
        <FormSubmissionButton
          canDelete={canDelete}
          clickDelete={clickDelete}
          disabledButton={disabledButton}
          handleSubmit={handleSubmit(onSubmit)}
          addText="add"
          addingText="Adding..."
        />
      </form>
    </div>
  );
}
