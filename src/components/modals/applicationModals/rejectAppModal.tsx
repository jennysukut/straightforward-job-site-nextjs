import * as Dialog from "@radix-ui/react-dialog";

import { useModal } from "@/contexts/ModalContext";
import { useRouter } from "next/navigation";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import RejectionStep1Modal from "./rejectionStep1Modal";

export default function RejectAppModal({ application, applicant }: any) {
  const { showModal, goBack, hideModal } = useModal();
  const router = useRouter();

  const chooseCustomRejection = () => {
    router.push(`/messages/${application.id}`);
    hideModal();
  };

  // console.log(application);

  return (
    <div className="SetAppStatusModal flex w-[350px] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {`Proceed with Rejection`}
      </Dialog.Title>
      <p className="ApplicantName -mt-4 font-medium italic">for {applicant}</p>
      <p className="Details text-center text-sm text-olive">
        would you like to provide any specific feedback or a personalized
        message for this rejection?
      </p>
      <div className="Buttons mt-4 flex items-center gap-4">
        <SiteButton
          variant="hollow"
          addClasses="py-2 px-8"
          colorScheme="b4"
          aria="feedback"
          onClick={chooseCustomRejection}
        >
          yes
        </SiteButton>
        <SiteButton
          variant="hollow"
          colorScheme="b3"
          aria="reject"
          addClasses="py-2 px-8"
          onClick={() =>
            showModal(<RejectionStep1Modal application={application} />)
          }
        >
          no, just reject
        </SiteButton>
      </div>
      <p className="Recommendation mt-4 text-center text-xs font-medium italic">
        {`we highly recommend feedback, particularly at later stages in the
          hiring process`}
      </p>
    </div>
  );
}
