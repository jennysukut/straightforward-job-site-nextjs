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
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const [disabledButton, setDisabledButton] = useState(false);
  const type = "experience";
  const {
    register,
    handleSubmit,
    reset,
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
    console.log("trying to delete");
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

  console.log(itemInfo);

  useEffect(() => {
    console.log("add experience modal was rendered");
  });

  return (
    <div className="AddExperienceModal flex w-[50vw] max-w-[450px] flex-col gap-4 text-jade">
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        experience
      </Dialog.Title>
      <form
        className="AddExperienceForm xs:pt-8 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* title input */}
        <label htmlFor="title">title*</label>
        <input
          type="text"
          defaultValue={itemInfo?.title}
          {...register("title")}
          placeholder="Job Title"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-midnight placeholder:text-jade/50 focus:border-jade focus:outline-none"
        />
        {errors.title?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.title.message.toString()}
          </p>
        )}

        {/* company name input */}
        <label htmlFor="companyName" className="pt-4">
          company*
        </label>
        <input
          type="text"
          //this is the issue right here, when I give the companyName a default value, it won't let me delete the item, strange...
          defaultValue={itemInfo?.companyName}
          {...register("companyName")}
          placeholder="Company Name"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-midnight placeholder:text-jade/50 focus:border-jade focus:outline-none"
        />
        {errors.companyName?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.companyName.message.toString()}
          </p>
        )}

        {/* year/years input */}
        <label htmlFor="years" className="mt-4">
          year/years
        </label>
        <input
          type="text"
          defaultValue={itemInfo?.yearDetails}
          {...register("yearDetails")}
          placeholder="Optional: Time You Held Position"
          className="text-md border-b-2 border-jade/50 bg-transparent pb-3 pt-0 text-midnight placeholder:text-jade/50 focus:border-jade focus:outline-none"
        />
        {errors.yearDetails?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.yearDetails.message.toString()}
          </p>
        )}

        {/* details input */}
        <label htmlFor="details" className="mt-4">
          details
        </label>
        <input
          type="text"
          defaultValue={itemInfo?.details}
          {...register("details")}
          placeholder="Details Describing Your Experience / Role"
          className="text-md border-b-2 border-jade/50 bg-transparent pb-3 pt-0 text-midnight placeholder:text-jade/50 focus:border-jade focus:outline-none"
        />
        {errors.details?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.details.message.toString()}
          </p>
        )}

        {/* form submission button */}
        {canDelete ? (
          <div className="ButtonContainer -mb-6 mt-6 flex justify-between">
            <button onClick={clickDelete}>
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
            >
              {disabledButton ? "Adding Experience..." : "add experience"}
            </SiteButton>
          </div>
        )}
      </form>
    </div>
  );
}
