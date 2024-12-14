"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";
import React, { useState } from "react";

import { useModal } from "@/contexts/ModalContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

import FormInputComponent from "@/components/formInputComponent";
import FormSubmissionButton from "@/components/formSubmissionButton";
import DeleteConfirmationModal from "../deleteConfirmationModal";

const AccomplishmentSchema = z.object({
  accTitle: z.string().min(2, { message: "Title Required" }),
  accDetails: z.string().optional(),
});

type FormData = z.infer<typeof AccomplishmentSchema>;

export default function AddAccomplishmentModal({
  handleAdd,
  canDelete,
  itemInfo,
  handleDelete,
  handleUpdate,
}: any) {
  const { showModal, hideModal } = useModal();
  const { textColor } = useColorOptions();
  const [disabledButton, setDisabledButton] = useState(false);
  const type = "accomplishment";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(AccomplishmentSchema),
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
        item="this accomplishment"
      />,
    );
  };

  return (
    <div
      className={`AddExperienceModal flex w-[50vw] max-w-[450px] flex-col gap-4 ${textColor}`}
    >
      <Dialog.Title className="Title mb-8 max-w-[450px] self-center text-center text-xl font-bold">
        additional accomplishments
      </Dialog.Title>
      <form
        className="AddExperienceForm xs:pt-8 flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* accomplishment input */}
        <FormInputComponent
          type="text"
          title="accomplishment*"
          defaultValue={itemInfo?.accTitle}
          placeholderText="Your Accomplishment"
          register={register}
          registerValue="accTitle"
          errors={errors.accTitle}
        />

        {/* accomplishment details input */}
        <FormInputComponent
          type="text"
          title="details"
          defaultValue={itemInfo?.accDetails}
          placeholderText="Details About Your Accomplishment"
          register={register}
          registerValue="accDetails"
          errors={errors.accDetails}
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
