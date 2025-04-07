import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";
import { useFellow } from "@/contexts/FellowContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useRouter } from "next/navigation";
import { useApplication } from "@/contexts/ApplicationContext";
import { useEffect } from "react";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import AddAMessageModal from "./addAMessageModal";

export default function SuccessfulApplicationModal({
  jobTitle,
  businessName,
}: any) {
  const { showModal, replaceModalStack, goBack, hideModal } = useModal();
  const { fellow } = useFellow();
  const { textColor, secondaryTextColor, titleColor } = useColorOptions();
  const { application } = useApplication();
  const router = useRouter();
  const appsLeft = 5 - fellow?.profile?.dailyApplications?.count;

  const goToAms = () => {
    router.push("/ams");
    setTimeout(() => {
      hideModal();
    }, 500);
  };

  const backToSearch = () => {
    router.push("/job-board");
    setTimeout(() => {
      hideModal();
    }, 500);
  };

  return (
    <div
      className={`ApplyModal flex w-[40vw] flex-col items-center gap-4 ${textColor}`}
    >
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {`Successfully Applied!`}
      </Dialog.Title>
      <h4
        className={`DailyLimit font-medium italic ${secondaryTextColor}`}
      >{`daily apps left: ${appsLeft}`}</h4>

      <p
        className={`Details ${titleColor} text-center`}
      >{`We wish you the best of luck!`}</p>
      <p
        className={`Details ${titleColor} text-center`}
      >{`You can keep up with this application in your application management system.`}</p>
      <div className="Buttons mt-4 flex flex-row items-start gap-4">
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="b3"
          aria="go back"
          onClick={goToAms}
        >
          application manager
        </SiteButton>
        {appsLeft > 0 && (
          <SiteButton
            variant="hollow"
            size="large"
            colorScheme="f1"
            aria="go back"
            onClick={backToSearch}
          >
            back to job search
          </SiteButton>
        )}
      </div>
    </div>
  );
}
