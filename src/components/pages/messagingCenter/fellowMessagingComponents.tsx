import SiteButton from "@/components/buttonsAndLabels/siteButton";
import SiteLabel from "@/components/buttonsAndLabels/siteLabel";
import InfoBox from "@/components/informationDisplayComponents/infoBox";

import { useModal } from "@/contexts/ModalContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useApplications } from "@/contexts/ApplicationsContext";
import { useFellow } from "@/contexts/FellowContext";
import { useEffect } from "react";

const RenderFellowMessageList = ({
  colorArray,
  activeApp,
  showMessages,
  setCurrentMessages,
}: any) => {
  const { showModal, hideModal } = useModal();
  const { applications, setApplications } = useApplications();
  const { fellow } = useFellow();

  const currentApps = applications
    ?.filter((app: any) => app.applicant === fellow?.id && app.mail)
    .sort((a, b) => {
      const mostRecentA = a.mail?.reduce((latest, message) => {
        const messageDate = new Date(`${message.date} ${message.timestamp}`);
        return messageDate > latest ? messageDate : latest;
      }, new Date(0));

      const mostRecentB = b.mail?.reduce((latest, message) => {
        const messageDate = new Date(`${message.date} ${message.timestamp}`);
        return messageDate > latest ? messageDate : latest;
      }, new Date(0));

      return (mostRecentB?.getTime() ?? 0) - (mostRecentA?.getTime() ?? 0); // Sort in descending order
    });

  useEffect(() => {
    setCurrentMessages(currentApps);
  }, [currentApps, setCurrentMessages]);

  return (
    <div className="MessageListGroup flex flex-col gap-4">
      {currentApps?.map((app: any, index: any) => {
        return (
          <div key={index} className="FellowMessageGroup flex gap-2">
            <SiteButton
              variant="hollow"
              size="medium"
              aria="mail item"
              addClasses="w-[25vw] overflow-hidden truncate"
              colorScheme={
                colorArray[index % colorArray.length] as ButtonColorOption
              }
              onClick={() => showMessages(app.id)}
              isSelected={activeApp === app.id}
            >
              {app.business}
            </SiteButton>

            {/* trying to make a nifty notification button */}
            {/* {app.mail.length > 3 && (
        <SiteLabel
          variant="notification"
          size="notification"
          aria="notification"
          colorScheme={
            colorArray[index % colorArray.length] as ButtonColorOption
          }
          addClasses="mt-4"
        />
      )} */}
          </div>
        );
      })}
    </div>
  );
};

export { RenderFellowMessageList };
