import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import RetractionApplicationStep2Modal from "./retractApplicationStep2Modal";

export default function RetractionConfirmationModal({
  continueRetract,
  jobTitle,
}: any) {
  const { showModal, goBack, hideModal } = useModal();

  return (
    <div className="DeleteConfirmationModal flex w-[350px] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {`retract your application for ${jobTitle}?`}
      </Dialog.Title>
      <div className="SignupButtons mt-4 flex flex-col items-start gap-y-4">
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="c1"
          aria="delete"
          addClasses="w-[300px]"
          onClick={() =>
            showModal(
              <RetractionApplicationStep2Modal
                continueRetract={continueRetract}
              />,
            )
          }
        >
          yes, retract application
        </SiteButton>
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="b3"
          aria="go back"
          addClasses="w-[300px]"
          onClick={goBack}
        >
          go back
        </SiteButton>
      </div>
    </div>
  );
}
