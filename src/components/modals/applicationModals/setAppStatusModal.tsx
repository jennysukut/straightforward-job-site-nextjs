import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";
import { stageList } from "@/lib/stageList";
import SiteButton from "@/components/buttonsAndLabels/siteButton";
import RejectAppModal from "./rejectAppModal";

export default function SetAppStatusModal({
  application,
  applicant,
  appStatus,
  updateStatus,
}: any) {
  const { showModal, replaceModalStack, goBack, hideModal } = useModal();

  const rejectClick = () => {
    // showModal for rejection confirmation
  };

  const confirmReject = () => {
    // code here after rejection is verified
  };

  const nextStage = () => {
    const currentIndex = stageList.findIndex((stage) => stage === appStatus);
    return currentIndex !== -1 && currentIndex < stageList.length - 1
      ? stageList[currentIndex + 1]
      : null;
  };

  return (
    <div className="SetAppStatusModal flex w-[350px] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {`Set Status for ${applicant}`}
      </Dialog.Title>
      <div className="Buttons mt-4 flex flex-col items-start gap-y-4">
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="c1"
          aria="delete"
          addClasses="w-[250px]"
          onClick={() => updateStatus(nextStage())}
        >
          continue to {nextStage()}
        </SiteButton>
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="b3"
          aria="go back"
          addClasses="w-[250px]"
          onClick={() =>
            showModal(
              <RejectAppModal
                applicant={applicant}
                application={application}
              />,
            )
          }
        >
          reject
        </SiteButton>
      </div>
    </div>
  );
}
