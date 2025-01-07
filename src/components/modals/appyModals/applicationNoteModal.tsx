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

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import InputComponent from "@/components/inputComponents/inputComponent";

const ApplicationNoteSchema = z.object({
  note: z
    .string()
    .min(2, { message: "Message must be more than 2 characters long." }),
});

type FormData = z.infer<typeof ApplicationNoteSchema>;

export default function ApplicationNoteModal({ app }: any) {
  const [disabledButton, setDisabledButton] = useState(false);
  const { showModal, replaceModalStack, goBack, hideModal } = useModal();
  const { textColor, secondaryTextColor, titleColor } = useColorOptions();
  const { accountType } = usePageContext();
  const { application, setApplication } = useApplication();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ApplicationNoteSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    if (accountType === "Fellow") {
      setApplication({ ...app, fellowNote: data.note });
    } else if (accountType === "Business") {
      setApplication({ ...app, businessNote: data.note });
    }
    hideModal();
    setDisabledButton(true);
  };

  useEffect(() => {
    if (accountType === "Business" && app?.businessNote) {
      console.log("there's a business note here!");
      setValue("note", app?.businessNote);
    } else if (accountType === "Fellow" && app?.fellowNote) {
      console.log("there's a fellow note here!");
      setValue("note", app?.fellowNote);
    }
  });

  return (
    <div
      className={`ApplicationNoteModal flex w-[40vw] flex-col items-center gap-4 ${textColor}`}
    >
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {`Your Note:`}
      </Dialog.Title>
      <form onSubmit={handleSubmit(onSubmit)} className="ApplicationNoteForm">
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
