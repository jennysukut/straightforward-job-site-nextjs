"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

import ErrorModal from "../errorModal";
import DeleteConfirmationModal from "../deleteConfirmationModal";
import FormInputComponent from "@/components/inputComponents/formInputComponent";
import FormSubmissionButton from "@/components/buttonsAndLabels/formSubmissionButton";

const EducationSchema = z.object({
  degree: z.string().min(2, { message: "Degree / Certificate Required" }),
  school: z.string().min(2, { message: "School Name Required" }),
  fieldOfStudy: z.string().optional(),
});

type FormData = z.infer<typeof EducationSchema>;

export default function AddEducationModal({
  handleAdd,
  canDelete,
  handleDelete,
  itemInfo,
  handleUpdate,
}: any) {
  const { showModal, hideModal } = useModal();
  const { textColor } = useColorOptions();
  const [disabledButton, setDisabledButton] = useState(false);
  const type = "education";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(EducationSchema),
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
    try {
      // const result = await signUp({ variables: data })
      //   .then((result) => {
      //     sendFellowSignupEmail(data.email, data.name, betaTester);
      //     showModal(<SignupModalIndividual2 />);
      //   })
      //   .catch((error) => {
      //     showModal(<ErrorModal />);
      //   });
    } catch (err) {
      showModal(<ErrorModal />);
    }
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
        item="these education details"
      />,
    );
  };

  return (
    <div
      className={`AddEducationModal flex w-[50vw] max-w-[450px] flex-col gap-4 ${textColor}`}
    >
      <Dialog.Title className="Title mb-4 max-w-[450px] self-center text-center text-xl font-bold">
        education
      </Dialog.Title>
      <form
        className="AddExperienceForm xs:pt-8 flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* degree input */}
        <FormInputComponent
          type="text"
          title="degree / certificate*"
          defaultValue={itemInfo?.degree}
          placeholderText="Your Degree or Certificate"
          register={register}
          registerValue="degree"
          errors={errors.degree}
        />

        {/* school input */}
        <FormInputComponent
          type="text"
          title="school*"
          defaultValue={itemInfo?.school}
          placeholderText="Your School"
          register={register}
          registerValue="school"
          errors={errors.school}
        />

        {/* field of study input */}
        <FormInputComponent
          type="text"
          title="field of study"
          defaultValue={itemInfo?.fieldOfStudy}
          placeholderText="Your Field Of Study"
          register={register}
          registerValue="fieldOfStudy"
          errors={errors.fieldOfStudy}
        />

        {/* form submission button */}
        <FormSubmissionButton
          canDelete={canDelete}
          clickDelete={clickDelete}
          disabledButton={disabledButton}
          handleSubmit={handleSubmit(onSubmit)}
          addText="add education"
          addingText="Adding Education..."
        />
      </form>
    </div>
  );
}
