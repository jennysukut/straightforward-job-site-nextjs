import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";
import { stageList } from "@/lib/stageList";
import SiteButton from "@/components/buttonsAndLabels/siteButton";
import RejectionConfirmationModal from "./rejectConfirmationModal";
import RejectionOptionsModal from "./rejectionOptionsModal";

export default function RejectionStep1Modal() {
  const { showModal, goBack, hideModal } = useModal();

  const basicMessage = () => {
    // code here after rejection is verified
    // We'll need to go ahead and set the status of the application as closed and initiate the rejection messages
  };

  return (
    <div className="SetAppStatusModal flex w-[350px] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {`Non-Specific Rejection`}
      </Dialog.Title>
      <p className="Details text-center text-sm text-olive">
        {`We have a few options for general rejections. Would you like us to send our favorite or would you like to take a look at some options? `}{" "}
      </p>
      <div className="Buttons mt-4 flex flex-col items-center gap-4">
        <SiteButton
          variant="hollow"
          addClasses="w-[250px]"
          colorScheme="d2"
          aria="basicMessage"
        >
          send a basic message
        </SiteButton>
        <SiteButton
          variant="hollow"
          colorScheme="c6"
          aria="options"
          addClasses="w-[250px]"
          onClick={() => showModal(<RejectionOptionsModal />)}
        >
          look at options{" "}
        </SiteButton>
      </div>
    </div>
  );
}
