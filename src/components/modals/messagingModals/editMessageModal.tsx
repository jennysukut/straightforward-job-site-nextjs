import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useState, useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useFellow } from "@/contexts/FellowContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApplication } from "@/contexts/ApplicationContext";
import { useAppointments } from "@/contexts/AppointmentsContext";
import { usePageContext } from "@/contexts/PageContext";
import { useApplications } from "@/contexts/ApplicationsContext";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import InputComponent from "@/components/inputComponents/inputComponent";
import FormSubmissionButton from "@/components/buttonsAndLabels/formSubmissionButton";
import DeleteConfirmationModal from "../deleteConfirmationModal";

const EditMessageSchema = z.object({
  message: z
    .string()
    .min(2, { message: "Message must be more than 2 characters long." }),
});

type FormData = z.infer<typeof EditMessageSchema>;

export default function EditMessageModal({
  message,
  setMessages,
  messages,
}: any) {
  const [disabledButton, setDisabledButton] = useState(false);
  const { showModal, replaceModalStack, goBack, hideModal } = useModal();
  const { textColor, secondaryTextColor, titleColor } = useColorOptions();
  const { accountType } = usePageContext();
  const { applications, setApplications } = useApplications();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(EditMessageSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const updatedMessages = messages.map((msg: any) =>
      msg.id === message.id
        ? { ...msg, text: data.message, edited: true }
        : msg,
    );
    console.log(updatedMessages);
    setMessages(updatedMessages);
    hideModal();
  };

  useEffect(() => {
    setValue("message", message.text);
  });

  return (
    <div
      className={`ApplicationNoteModal flex w-[40vw] flex-col items-center gap-4 ${textColor}`}
    >
      <Dialog.Title className="Title -my-2 w-full text-center text-xl font-bold">
        {`Edit Your Message:`}
      </Dialog.Title>
      <form onSubmit={handleSubmit(onSubmit)} className="MessageEditingForm">
        <InputComponent
          type="text"
          placeholderText="Your Message Here..."
          size="tall"
          width="medium"
          addClasses="mt-6"
          register={register}
          registerValue="message"
          errors={errors.message}
        ></InputComponent>
        <div className="SubmitButton mt-8 self-end">
          <FormSubmissionButton
            // canDelete={message}
            // clickDelete={clickDelete}
            disabledButton={disabledButton}
            addText="update"
            addingText="Saving..."
            handleSubmit={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </div>
  );
}
