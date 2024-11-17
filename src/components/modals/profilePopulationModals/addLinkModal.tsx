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

const LinkSchema = z.object({
  linkType: z.string().min(2, { message: "Link Type Required" }),
  link: z.string().url(),
});

type FormData = z.infer<typeof LinkSchema>;

export default function AddLinkModal({
  handleAdd,
  canDelete,
  itemInfo,
  handleDelete,
  handleUpdate,
}: any) {
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const [disabledButton, setDisabledButton] = useState(false);
  const [linkType, setLinkType] = useState("");
  const [link, setLink] = useState("");
  const [id, setId] = useState("");
  const type = "link";
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LinkSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    if (canDelete) {
      handleUpdate(data, id);
    } else {
      handleAdd(data);
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
        item="this link"
      />,
    );
  };

  useEffect(() => {
    if (canDelete) {
      setLinkType(itemInfo.linkType);
      setLink(itemInfo.link);
      setId(itemInfo.id);
    }
  }, []);

  return (
    <div className="AddHobbyModal flex w-[50vw] max-w-[450px] flex-col gap-4 text-jade">
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        attach link
      </Dialog.Title>
      <form
        className="AddHobbyForm xs:pt-8 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* link type input */}
        <label htmlFor="award">link type*</label>
        <input
          type="text"
          value={linkType}
          placeholder="Personal Website / Portfolio / Instagram / Etc..."
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          onChange={(e) => {
            const value = e.target.value;
            setLinkType(value);
            setValue("linkType", value);
          }}
        />
        {errors.linkType?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.linkType.message.toString()}
          </p>
        )}

        {/* how long input */}
        <label htmlFor="howLong" className="pt-4">
          link URL*
        </label>
        <input
          type="url"
          value={link}
          placeholder="http://website.com"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          onChange={(e) => {
            const value = e.target.value;
            setLink(value);
            setValue("link", value);
          }}
        />
        {errors.link?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.link.message.toString()}
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
