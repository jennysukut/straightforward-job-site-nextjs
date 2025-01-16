import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";
import { stageList } from "@/lib/stageList";
import { rejectionOptions } from "@/lib/rejectionOptions";
import { useRouter } from "next/navigation";
import { useApplications } from "@/contexts/ApplicationsContext";
import SiteButton from "@/components/buttonsAndLabels/siteButton";
import RejectionConfirmationModal from "./rejectConfirmationModal";

export default function RejectionOptionsModal({ application }: any) {
  const { showModal, goBack, hideModal } = useModal();
  const { applications, setApplications } = useApplications();
  const router = useRouter();

  const setMessage = (title: any) => {
    if (applications) {
      setApplications(
        applications.map((app) =>
          app.id === application.id
            ? { ...app, appIsBeingRejected: title }
            : app,
        ),
      );
      hideModal();
    }
  };

  return (
    <div className="RejectionOptionsModal flex w-[350px] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {`Message Options:`}
      </Dialog.Title>

      <div className="Buttons mt-4 flex flex-col items-center gap-4">
        <SiteButton
          variant="hollow"
          addClasses="w-[300px]"
          colorScheme="e5"
          aria="kindGeneral"
          onClick={() => setMessage("kindGeneral")}
        >
          kind + general message
        </SiteButton>
        <SiteButton
          variant="hollow"
          colorScheme="c6"
          aria="postInterview"
          addClasses="w-[300px]"
          onClick={() => setMessage("postInterview")}
        >
          friendly post-interview note
        </SiteButton>
        <SiteButton
          variant="hollow"
          addClasses="w-[300px]"
          colorScheme="b6"
          aria="promising"
          onClick={() => setMessage("promisingCandidate")}
        >
          promising candidate message
        </SiteButton>
        <SiteButton
          variant="hollow"
          colorScheme="d2"
          aria="underqualified"
          addClasses="w-[300px]"
          onClick={() => setMessage("underqualifiedSuggestion")}
        >
          underqualified suggestion note
        </SiteButton>
      </div>
    </div>
  );
}
