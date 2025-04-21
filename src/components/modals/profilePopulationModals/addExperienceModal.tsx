"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useModal } from "@/contexts/ModalContext";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

import DeleteConfirmationModal from "../deleteConfirmationModal";
import FormSubmissionButton from "@/components/buttonsAndLabels/formSubmissionButton";
import FormInputComponent from "@/components/inputComponents/formInputComponent";

const ExperienceSchema = z.object({
  title: z.string().min(2, { message: "Job Title Required" }),
  companyName: z.string().min(2, { message: "Company Name Required" }),
  yearDetails: z.string().optional(),
  details: z.string().optional(),
});

type FormData = z.infer<typeof ExperienceSchema>;

export default function AddExperienceModal({
  handleAdd,
  canDelete,
  handleDelete,
  handleUpdate,
  itemInfo,
}: any) {
  const { showModal, hideModal } = useModal();
  const { textColor } = useColorOptions();
  const [disabledButton, setDisabledButton] = useState(false);
  const type = "experience";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ExperienceSchema),
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

    //send data to the server
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
        item="this experience"
      />,
    );
  };

  return (
    <div
      className={`AddExperienceModal flex w-[50vw] max-w-[450px] flex-col gap-4 ${textColor}`}
    >
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        experience
      </Dialog.Title>
      <form
        className="AddExperienceForm flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* title input */}
        <FormInputComponent
          type="text"
          title="title*"
          defaultValue={itemInfo?.title}
          placeholderText="Job Title"
          register={register}
          registerValue="title"
          errors={errors.title}
        />

        {/* company name input */}
        <FormInputComponent
          type="text"
          title="company*"
          defaultValue={itemInfo?.companyName}
          placeholderText="Company Name"
          register={register}
          registerValue="companyName"
          errors={errors.companyName}
        />

        {/* year/years  input */}
        <FormInputComponent
          type="text"
          title="year/years"
          defaultValue={itemInfo?.yearDetails}
          placeholderText="Optional: Time You Held Position"
          register={register}
          registerValue="yearDetails"
          errors={errors.yearDetails}
        />

        {/*  details input */}
        <FormInputComponent
          type="text"
          title="details"
          defaultValue={itemInfo?.details}
          placeholderText="Details Describing Your Experience / Role"
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
          addText="add experience"
          addingText="Adding Experience..."
        />
      </form>
    </div>
  );
}
