"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

import FormInputComponent from "@/components/inputComponents/formInputComponent";
import FormSubmissionButton from "@/components/buttonsAndLabels/formSubmissionButton";
import DeleteConfirmationModal from "../deleteConfirmationModal";

const AwardSchema = z.object({
  awardTitle: z.string().min(2, { message: "Award Title Required" }),
  givenBy: z.string().min(2),
  awardDetails: z.string().optional(),
});

type FormData = z.infer<typeof AwardSchema>;

export default function AddAwardsModal({
  handleAdd,
  canDelete,
  itemInfo,
  handleDelete,
  handleUpdate,
}: any) {
  const { showModal, hideModal } = useModal();
  const { textColor } = useColorOptions();
  const [disabledButton, setDisabledButton] = useState(false);
  const type = "award";
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(AwardSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    if (canDelete) {
      handleUpdate(type, data, itemInfo.id);
    } else {
      handleAdd(type, data);
    }
    hideModal();

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
        item="this award"
      />,
    );
  };

  return (
    <div
      className={`AddExperienceModal flex w-[50vw] max-w-[450px] flex-col gap-4 ${textColor}`}
    >
      <Dialog.Title className="Title mb-4 max-w-[450px] self-center text-center text-xl font-bold">
        awards / honors
      </Dialog.Title>
      <form
        className="AddExperienceForm xs:pt-8 flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* award / honor input */}
        <FormInputComponent
          type="text"
          title="award / honor*"
          defaultValue={itemInfo?.awardTitle}
          placeholderText="Your Award or Honor"
          register={register}
          registerValue="awardTitle"
          errors={errors.awardTitle}
        />

        {/* given by input */}
        <FormInputComponent
          type="text"
          title="given by*"
          defaultValue={itemInfo?.givenBy}
          placeholderText="Given By"
          register={register}
          registerValue="givenBy"
          errors={errors.givenBy}
        />

        {/* details input */}
        <FormInputComponent
          type="text"
          title="details"
          defaultValue={itemInfo?.awardDetails}
          placeholderText="Award / Honor Is For"
          register={register}
          registerValue="awardDetails"
          errors={errors.awardDetails}
        />

        {/* form submission button */}
        <FormSubmissionButton
          canDelete={canDelete}
          clickDelete={clickDelete}
          disabledButton={disabledButton}
          handleSubmit={handleSubmit(onSubmit)}
          addText="add info"
          addingText="Adding..."
        />
      </form>
    </div>
  );
}
