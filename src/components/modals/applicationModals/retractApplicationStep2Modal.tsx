import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import RetractionApplicationStep3Modal from "./retractApplicationStep3Modal";
export default function RetractionApplicationStep2Modal({
  continueRetract,
}: any) {
  const { showModal, goBack, hideModal } = useModal();

  return (
    <div className="DeleteConfirmationModal flex w-[350px] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {`care to share why?`}
      </Dialog.Title>
      <div className="ButtonOptions mt-4 flex flex-col items-start gap-y-4">
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="b3"
          aria="go back"
          addClasses="w-[300px]"
          onClick={() =>
            showModal(
              <RetractionApplicationStep3Modal
                continueRetract={continueRetract}
              />,
            )
          }
        >
          of course
        </SiteButton>
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="c1"
          aria="delete"
          addClasses="w-[300px]"
          onClick={continueRetract}
        >
          no thanks
        </SiteButton>
      </div>
    </div>
  );
}
