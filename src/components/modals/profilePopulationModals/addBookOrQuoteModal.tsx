"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import SiteButton from "../../siteButton";
import ErrorModal from "../errorModal";

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
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const [disabledButton, setDisabledButton] = useState(false);
  const [bookOrQuote, setBookOrQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [id, setId] = useState("");
  const type = "bookOrQuote";
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(BookOrQuoteSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    if (canDelete) {
      handleUpdate(type, data, id);
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
    handleDelete(type, id);
    hideModal();
  };

  const deleteItem = () => {
    showModal(
      <DeleteConfirmationModal
        continueDelete={continueDelete}
        item="this hobby"
      />,
    );
  };

  useEffect(() => {
    if (canDelete) {
      setBookOrQuote(itemInfo.bookOrQuote);
      setAuthor(itemInfo.author);
      setId(itemInfo.id);
    }
  }, []);

  return (
    <div className="AddBookOrQuoteModal flex w-[50vw] max-w-[450px] flex-col gap-4 text-jade">
      <Dialog.Title className="Title mb-8 max-w-[450px] self-center text-center text-xl font-bold">
        your favorite book or quote
      </Dialog.Title>
      <form
        className="AddBookOrQuoteForm xs:pt-8 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* book or quote input */}
        <label htmlFor="bookOrQuote">Book or Quote*</label>
        <input
          type="text"
          value={bookOrQuote}
          placeholder="Your Favorite Book or Quote"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          onChange={(e) => {
            const value = e.target.value;
            setBookOrQuote(value);
            setValue("bookOrQuote", value);
          }}
        />
        {errors.bookOrQuote?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.bookOrQuote.message.toString()}
          </p>
        )}

        {/* author input */}
        <label htmlFor="author" className="pt-4">
          Author*
        </label>
        <input
          type="text"
          value={author}
          placeholder="2 Days - 200 Years"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          onChange={(e) => {
            const value = e.target.value;
            setAuthor(value);
            setValue("author", value);
          }}
        />
        {errors.author?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.author.message.toString()}
          </p>
        )}

        {/* form submission button */}
        {canDelete ? (
          <div className="ButtonContainer -mb-6 mt-6 flex justify-between">
            <button onClick={deleteItem}>
              <Image
                className="DeleteButton opacity-75 hover:opacity-100"
                src="/delete-icon.svg"
                width={18}
                height={18}
                alt="delete"
              />
            </button>
            <SiteButton
              variant="hollow"
              colorScheme="f1"
              aria="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={disabledButton}
              addClasses="px-8"
            >
              {disabledButton ? "Updating..." : "update"}
            </SiteButton>
          </div>
        ) : (
          <div className="ButtonContainer -mb-6 mt-6 flex justify-end">
            <SiteButton
              variant="hollow"
              colorScheme="f1"
              aria="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={disabledButton}
              addClasses="px-8"
            >
              {disabledButton ? "Adding ..." : "add"}
            </SiteButton>
          </div>
        )}
      </form>
    </div>
  );
}
