"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useModal } from "@/contexts/ModalContext";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInputComponent from "@/components/formInputComponent";
import FormSubmissionButton from "@/components/formSubmissionButton";
import DeleteConfirmationModal from "../deleteConfirmationModal";

const BookOrQuoteSchema = z.object({
  bookOrQuote: z.string().min(2, { message: "Info Required" }),
  author: z.string().min(2, { message: "Info Required" }),
});

type FormData = z.infer<typeof BookOrQuoteSchema>;

export default function AddBookOrQuoteModal({
  handleAdd,
  canDelete,
  itemInfo,
  handleDelete,
  handleUpdate,
}: any) {
  const { showModal, hideModal } = useModal();
  const [disabledButton, setDisabledButton] = useState(false);
  const type = "bookOrQuote";
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(BookOrQuoteSchema),
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
    <div className="AddBookOrQuoteModal flex w-[50vw] max-w-[450px] flex-col gap-4 text-jade">
      <Dialog.Title className="Title mb-4 max-w-[450px] self-center text-center text-xl font-bold">
        treasured book or quote
      </Dialog.Title>
      <form
        className="AddBookOrQuoteForm xs:pt-8 flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* book or quote input */}
        <FormInputComponent
          type="text"
          title="book / quote*"
          defaultValue={itemInfo?.bookOrQuote}
          placeholderText="A Beloved Book or Quote"
          register={register}
          registerValue="bookOrQuote"
          errors={errors.bookOrQuote}
        />

        {/* book or quote input */}
        <FormInputComponent
          type="text"
          title="author*"
          defaultValue={itemInfo?.author}
          placeholderText="The Book or Quote's Author"
          register={register}
          registerValue="author"
          errors={errors.author}
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
