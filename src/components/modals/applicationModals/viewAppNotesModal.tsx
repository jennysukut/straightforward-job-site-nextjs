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

import InfoBox from "@/components/informationDisplayComponents/infoBox";
import ApplicationNoteModal from "./applicationNoteModal";

export default function ViewApplicationNoteModal({ app, notes }: any) {
  const { showModal, replaceModalStack, goBack, hideModal } = useModal();
  const { textColor, secondaryTextColor, titleColor } = useColorOptions();

  return (
    <div
      className={`ViewApplicationNotesModal flex max-h-[300px] w-[400px] flex-col items-center gap-4 ${textColor} overflow-hidden overflow-y-auto`}
    >
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {notes.length > 1 ? "Your Notes:" : "Your Note:"}
      </Dialog.Title>
      <div className="Notes flex flex-col items-center gap-4 pb-8 pt-4">
        {notes.map((note: string, index: number) => {
          return (
            <InfoBox
              size="note"
              variant="hollow"
              aria="note"
              key={index}
              canEdit
              addClasses="w-[350px]"
              editClick={() =>
                showModal(<ApplicationNoteModal app={app} note={note} />)
              }
            >
              {note}
            </InfoBox>
          );
        })}
      </div>
    </div>
  );
}
