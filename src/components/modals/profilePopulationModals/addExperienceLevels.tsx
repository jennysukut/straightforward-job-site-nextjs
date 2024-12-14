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

const ExperienceLevelSchema = z.object({
  experienceLevel: z.string().min(2, { message: "Skill Level Required" }),
  expLevelSkill: z.string().min(2),
  skillYears: z.string().optional(),
});

type FormData = z.infer<typeof ExperienceLevelSchema>;

export default function AddExperienceLevelModal({
  handleAdd,
  canDelete,
  itemInfo,
  handleDelete,
  handleUpdate,
}: any) {
  const { showModal, hideModal } = useModal();
  const { textColor } = useColorOptions();
  const [disabledButton, setDisabledButton] = useState(false);
  const type = "experienceLevel";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ExperienceLevelSchema),
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
    console.log("handling deletion");
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
        experience level
      </Dialog.Title>
      <form
        className="AddExperienceForm xs:pt-8 flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* experience level input */}
        <FormInputComponent
          type="text"
          title="experience level*"
          defaultValue={itemInfo?.experienceLevel}
          placeholderText="Entry / Intermediate / Senior / Etc..."
          register={register}
          registerValue="experienceLevel"
          errors={errors.experienceLevel}
        />

        {/* experience skill input */}
        <FormInputComponent
          type="text"
          title="selected skill*"
          defaultValue={itemInfo?.expLevelSkill}
          placeholderText="Your Particular Skill"
          register={register}
          registerValue="expLevelSkill"
          errors={errors.expLevelSkill}
        />

        {/* skill years input */}
        <FormInputComponent
          type="text"
          title="number of years"
          defaultValue={itemInfo?.skillYears}
          placeholderText="Optional: Years You've Had Said Skill"
          register={register}
          registerValue="skillYears"
          errors={errors.skillYears}
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
