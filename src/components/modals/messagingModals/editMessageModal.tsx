import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useState, useEffect, useRef, forwardRef } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useFellow } from "@/contexts/FellowContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApplication } from "@/contexts/ApplicationContext";
import { useAppointments } from "@/contexts/AppointmentsContext";
import { usePageContext } from "@/contexts/PageContext";
import { useApplications } from "@/contexts/ApplicationsContext";

import TextareaAutosize from "react-textarea-autosize";
import SiteButton from "@/components/buttonsAndLabels/siteButton";
import InputComponent from "@/components/inputComponents/inputComponent";
import FormSubmissionButton from "@/components/buttonsAndLabels/formSubmissionButton";
import DeleteConfirmationModal from "../deleteConfirmationModal";

interface MessageEditProps {
  paragraphs: string[];
  onSave: (newParagraphs: string[], editId: any) => void;
  onCancel: () => void;
  editId: any;
}

export default function EditMessageModal({
  paragraphs,
  onSave,
  onCancel,
  editId,
}: MessageEditProps) {
  const [disabledButton, setDisabledButton] = useState(false);
  const [text, setText] = useState(paragraphs);
  const textRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  const { showModal, replaceModalStack, goBack, hideModal } = useModal();
  const { textColor, secondaryTextColor, titleColor } = useColorOptions();
  const { accountType } = usePageContext();
  const { applications, setApplications } = useApplications();

  const handleSave = () => {
    onSave(text, editId);
  };

  return (
    <div
      className={`ApplicationNoteModal flex w-[40vw] flex-col items-center gap-4 ${textColor}`}
    >
      <Dialog.Title className="Title -my-2 w-full text-center text-xl font-bold">
        {`Edit Your Message:`}
      </Dialog.Title>

      <div className="Message mt-4 flex max-h-[50vh] w-full flex-col gap-2 overflow-y-auto rounded-2xl border-2 border-jade bg-cream p-4">
        {text.map((paragraph, index) => (
          <TextareaAutosize
            key={index}
            ref={(el) => {
              textRefs.current[index] = el;
            }}
            value={paragraph}
            onChange={(e) => {
              const newText = [...text];
              newText[index] = e.target.value;
              setText(newText);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const newText = [...text, ""];
                setText(newText);
                setTimeout(() => {
                  textRefs.current[newText.length - 1]?.focus();
                }, 0);
              }
            }}
            className="EditedMessageText h-auto w-full resize-none overflow-y-auto bg-cream pr-2 focus:outline-none"
          />
        ))}
      </div>

      <div className="ButtonOptions -mb-4 mt-2 flex w-full justify-between gap-2">
        <SiteButton
          variant="hollow"
          colorScheme="c5"
          aria="cancel"
          onClick={onCancel}
        >
          cancel
        </SiteButton>
        <SiteButton
          variant="filled"
          colorScheme="d4"
          aria="save"
          onClick={handleSave}
          size="medium"
        >
          save
        </SiteButton>
      </div>
    </div>
  );
}
