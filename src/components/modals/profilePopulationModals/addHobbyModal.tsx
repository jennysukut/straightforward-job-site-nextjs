"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useModal } from "@/contexts/ModalContext";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

import FormInputComponent from "@/components/formInputComponent";
import FormSubmissionButton from "@/components/formSubmissionButton";
import DeleteConfirmationModal from "../deleteConfirmationModal";

const HobbySchema = z.object({
  hobbyTitle: z.string().min(2, { message: "Hobby Title Required" }),
  howLong: z.string().optional(),
});

type FormData = z.infer<typeof HobbySchema>;

export default function AddHobbyModal({
  handleAdd,
  canDelete,
  itemInfo,
  handleDelete,
  handleUpdate,
}: any) {
  const { showModal, hideModal } = useModal();
  const { textColor } = useColorOptions();
  const [disabledButton, setDisabledButton] = useState(false);
  const type = "hobby";
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(HobbySchema),
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
        item="this hobby"
      />,
    );
  };

  return (
    <div
      className={`AddHobbyModal flex w-[50vw] max-w-[450px] flex-col gap-4 ${textColor}`}
    >
      <Dialog.Title className="Title mb-4 max-w-[450px] self-center text-center text-xl font-bold">
        share your hobby
      </Dialog.Title>
      <form
        className="AddHobbyForm xs:pt-8 flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* hobby input */}
        <FormInputComponent
          type="text"
          title="hobby*"
          defaultValue={itemInfo?.hobbyTitle}
          placeholderText="Your Fantastic Hobby"
          register={register}
          registerValue="hobbyTitle"
          errors={errors.hobbyTitle}
        />

        {/* hobby input */}
        <FormInputComponent
          type="text"
          title="how long have you had this pastime?"
          defaultValue={itemInfo?.howLong}
          placeholderText="Hobby Timeline"
          register={register}
          registerValue="howLong"
          errors={errors.howLong}
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
