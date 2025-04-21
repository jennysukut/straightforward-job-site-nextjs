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
import { useMutation } from "@apollo/client";
import { KEEP_NOTES, EDIT_NOTE, DELETE_NOTE } from "@/graphql/mutations";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import InputComponent from "@/components/inputComponents/inputComponent";
import FormSubmissionButton from "@/components/buttonsAndLabels/formSubmissionButton";
import DeleteConfirmationModal from "../deleteConfirmationModal";

const ApplicationNoteSchema = z.object({
  note: z
    .string()
    .min(2, { message: "Message must be more than 2 characters long." }),
});

type FormData = z.infer<typeof ApplicationNoteSchema>;

export default function ApplicationNoteModal({
  app,
  note,
  unclickButton,
  setNewNote,
  noteId,
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
    resolver: zodResolver(ApplicationNoteSchema),
  });
  const [keepNotes, { loading, error }] = useMutation(KEEP_NOTES);
  const [editNote] = useMutation(EDIT_NOTE);
  const [deleteNote] = useMutation(DELETE_NOTE);

  const clickDelete = (event: any) => {
    event.preventDefault();
    showModal(
      <DeleteConfirmationModal
        item="this note"
        continueDelete={confirmDelete}
      />,
    );
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteNote({
        variables: {
          noteId: noteId,
        },
      });
      console.log(
        "Details saved successfully, Details:",
        response.data.deleteNote,
      );
      setNewNote(true);
      hideModal();
    } catch (error) {
      console.error("deletion error:", error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    try {
      const response = await keepNotes({
        variables: {
          jobApplicationId: app.id,
          notes: data.note,
        },
      });
      console.log(
        "Details saved successfully, Details:",
        response.data.keepNotes,
      );
      setNewNote(true);
    } catch (error) {
      console.error("Signup error:", error);
      setDisabledButton(false);
      // Optionally, you can set an error state here to display to the user
    }

    // const updatedApplications = applications?.map((application) => {
    //   if (application.id === app.id) {
    //     if (accountType === "Fellow") {
    //       const existingNotes = [...(application.fellowNote || [])];
    //       if (note) {
    //         // If editing an existing note, find and update it
    //         const noteIndex = existingNotes.indexOf(note);
    //         if (noteIndex !== -1) {
    //           existingNotes[noteIndex] = data.note;
    //         }
    //       } else {
    //         // If adding a new note, append it
    //         existingNotes.push(data.note);
    //         if (unclickButton) {
    //           unclickButton();
    //         }
    //       }
    //       return {
    //         ...application,
    //         fellowNote: existingNotes,
    //       };
    //     } else if (accountType === "Business") {
    //       const existingNotes = [...(application.businessNote || [])];
    //       if (note) {
    //         // If editing an existing note, find and update it
    //         const noteIndex = existingNotes.indexOf(note);
    //         if (noteIndex !== -1) {
    //           existingNotes[noteIndex] = data.note;
    //         }
    //       } else {
    //         // If adding a new note, append it
    //         existingNotes.push(data.note);
    //       }
    //       return {
    //         ...application,
    //         businessNote: existingNotes,
    //       };
    //     }
    //   }
    //   return application;
    // });

    // setApplications(updatedApplications || []);
    hideModal();
    setDisabledButton(true);
  };

  useEffect(() => {
    if (accountType === "Business" && note) {
      setValue("note", note);
    } else if (accountType === "Fellow" && note) {
      setValue("note", note);
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
        <div className="SubmitButton mt-8 self-end">
          <FormSubmissionButton
            canDelete={note}
            clickDelete={clickDelete}
            disabledButton={disabledButton}
            addText="save"
            addingText="Saving..."
            handleSubmit={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </div>
  );
}
