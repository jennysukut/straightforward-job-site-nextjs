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
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const [disabledButton, setDisabledButton] = useState(false);
  const [accTitle, setAccTitle] = useState("");
  const [accDetails, setAccDetails] = useState("");
  const [id, setId] = useState("");
  const type = "accomplishment";
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(AccomplishmentSchema),
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
    console.log("handling deletion");
    handleDelete(type, id);
    hideModal();
  };

  const deleteExperience = () => {
    console.log("deleting - will need confirmation");
    showModal(
      <DeleteConfirmationModal
        continueDelete={continueDelete}
        item="this accomplishment"
      />,
    );
  };

  useEffect(() => {
    if (canDelete) {
      setAccTitle(itemInfo.accTitle);
      setAccDetails(itemInfo.accDetails);
      setId(itemInfo.id);
    }
  }, []);

  return (
    <div className="AddExperienceModal flex w-[50vw] max-w-[450px] flex-col gap-4 text-jade">
      <Dialog.Title className="Title mb-8 max-w-[450px] self-center text-center text-xl font-bold">
        additional accomplishments
      </Dialog.Title>
      <form
        className="AddExperienceForm xs:pt-8 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* accomplishment input */}
        <label htmlFor="award">accomplishment*</label>
        <input
          type="text"
          value={accTitle}
          placeholder="Your Accomplishment"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          onChange={(e) => {
            const value = e.target.value;
            setAccTitle(value);
            setValue("accTitle", value);
          }}
        />
        {errors.accTitle?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.accTitle.message.toString()}
          </p>
        )}

        {/* accomplishment details input */}
        <label htmlFor="companyName" className="pt-4">
          details
        </label>
        <input
          type="text"
          value={accDetails}
          placeholder="Details About Your Accomplishment"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          onChange={(e) => {
            const value = e.target.value;
            setAccDetails(value);
            setValue("accDetails", value);
          }}
        />
        {errors.accDetails?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.accDetails.message.toString()}
          </p>
        )}

        {/* form submission button */}
        {canDelete ? (
          <div className="ButtonContainer -mb-6 mt-6 flex justify-between">
            <button onClick={deleteExperience}>
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
