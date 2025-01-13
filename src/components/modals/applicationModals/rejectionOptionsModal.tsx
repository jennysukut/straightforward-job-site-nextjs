import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";
import { stageList } from "@/lib/stageList";
import { rejectionOptions } from "@/lib/rejectionOptions";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import RejectionConfirmationModal from "./rejectConfirmationModal";
import RejectionMessageModal from "./rejectionMessageModal";

export default function RejectionOptionsModal() {
  const { showModal, goBack, hideModal } = useModal();

  const setMessage = (title: any) => {
    // code here after rejection is verified
    // We'll need to go ahead and set the status of the application as closed and initiate the rejection messages
    showModal(<RejectionMessageModal title={title} />);
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
