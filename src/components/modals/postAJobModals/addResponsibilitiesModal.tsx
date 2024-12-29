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

const ResponsibilitySchema = z.object({
  responsibility: z.string().min(3, { message: "More Info Required" }),
});

type FormData = z.infer<typeof ResponsibilitySchema>;

export default function AddResponsibilityModal({
  handleAdd,
  canDelete,
  handleDelete,
  itemInfo,
  handleUpdate,
}: any) {
  const { showModal, hideModal } = useModal();
  const { textColor, titleColor } = useColorOptions();
  const [disabledButton, setDisabledButton] = useState(false);
  const type = "responsibilities";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ResponsibilitySchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    console.log(data);
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
    console.log("handling deletion");
    console.log(type, itemInfo.id);
    handleDelete(type, itemInfo.id);
    hideModal();
  };

  const clickDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    showModal(
      <DeleteConfirmationModal
        continueDelete={continueDelete}
        item="this responsibility"
      />,
    );
  };

  return (
    <div
      className={`AddResponsibilityModal flex w-[50vw] max-w-[450px] flex-col gap-4 ${textColor}`}
    >
      <Dialog.Title className="Title mb-4 max-w-[450px] self-center text-center text-xl font-bold">
        responsibility
      </Dialog.Title>
      <form
        className="AddExperienceForm xs:pt-8 flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* responsibility input */}
        <FormInputComponent
          type="text"
          title="task*"
          defaultValue={itemInfo?.responsibility}
          placeholderText="This Job Is Responsible For..."
          register={register}
          registerValue="responsibility"
          errors={errors.responsibility}
        />

        {/* form submission button */}
        <FormSubmissionButton
          canDelete={canDelete}
          clickDelete={clickDelete}
          disabledButton={disabledButton}
          handleSubmit={handleSubmit(onSubmit)}
          addText="add details"
          addingText="Adding Details..."
        />
      </form>
    </div>
  );
}
