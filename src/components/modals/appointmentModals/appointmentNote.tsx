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
import SiteButton from "@/components/buttonsAndLabels/siteButton";
import InputComponent from "@/components/inputComponents/inputComponent";

const AppointmentNoteSchema = z.object({
  note: z
    .string()
    .min(2, { message: "Message must be more than 2 characters long." }),
});

type FormData = z.infer<typeof AppointmentNoteSchema>;

export default function AppointmentNoteModal({ appointment }: any) {
  const [disabledButton, setDisabledButton] = useState(false);
  const { showModal, replaceModalStack, goBack, hideModal } = useModal();
  const { textColor, secondaryTextColor, titleColor } = useColorOptions();
  const { fellow, setFellow } = useFellow();
  const { application, setApplication } = useApplication();
  const { appointments, setAppointments } = useAppointments();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(AppointmentNoteSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (appointments) {
      setAppointments(
        appointments.map((app) =>
          app.id === appointment.id ? { ...app, note: data.note } : app,
        ),
      );
    }
    hideModal();
    setDisabledButton(true);
  };


  useEffect(() => {
    if (appointment?.note) {
      setValue("note", appointment?.note);
    }
  });

  return (
    <div
      className={`AppointmentNoteModal flex w-[40vw] flex-col items-center gap-4 ${textColor}`}
    >
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {`Your Note:`}
      </Dialog.Title>
      <form onSubmit={handleSubmit(onSubmit)} className="AppointmentNoteForm">
        <InputComponent
          type="text"
          placeholderText="Your Note Here..."
          size="tall"
          width="medium"
          addClasses="mt-6"
          register={register}
          registerValue="note"
          errors={errors.note}
        ></InputComponent>
        <div className="SignupButtons -mb-3 mt-5 self-end">
          <SiteButton
            type="submit"
            variant="hollow"
            colorScheme="b3"
            aria="go back"
            size="wide"
            onClick={handleSubmit(onSubmit)}
            disabled={disabledButton}
          >
            {disabledButton ? "Saving..." : "save"}
          </SiteButton>
        </div>
      </form>
    </div>
  );
}
