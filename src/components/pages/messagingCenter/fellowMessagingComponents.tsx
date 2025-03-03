import SiteButton from "@/components/buttonsAndLabels/siteButton";
import SiteLabel from "@/components/buttonsAndLabels/siteLabel";
import InfoBox from "@/components/informationDisplayComponents/infoBox";

import { useModal } from "@/contexts/ModalContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useApplications } from "@/contexts/ApplicationsContext";
import { useFellow } from "@/contexts/FellowContext";
import { useEffect, useState } from "react";

const RenderFellowMessageList = ({
  colorArray,
  activeApp,
  showMessages,
  setCurrentMessages,
}: any) => {
  const { showModal, hideModal } = useModal();
  const { applications, setApplications } = useApplications();
  const { fellow } = useFellow();
  const [filters, setFilters] = useState<string[]>([]);
  const [filteredMsgs, setFilteredMsgs] = useState<string[]>([]);

  // TODO: Set filter here so we only show messages related to active job posts?
  // TODO: Make filters to show different stages of the job as well?
  const filterMessages = () => {
    const filteredMessages: any = currentMsgs?.filter((msg: any) => {
      console.log(msg.appStatus);
      const activeAppMessages = msg.appStatus !== "closed";

      return activeAppMessages;
    });

    setFilteredMsgs(filteredMessages);
    // setCurrentMessages(filteredMessages);
  };

  const currentMsgs = applications
    ?.filter((app: any) => app.applicant === fellow?.id && app.mail.length > 0)
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

  //lint wants me to include currentApps in the dependency array for this useEffect, but it rerenders endlessly if I do that...
  useEffect(() => {
    // this one set *all* messages, even ones attached to closed applications
    // setCurrentMessages(currentMsgs);
    // this one is setting only ones attached to open applications, but it isn't setting an active app
    setCurrentMessages(filteredMsgs);
  }, []);

  useEffect(() => {
    filterMessages();
  }, []);

  return (
    <div className="MessageListGroup flex flex-col gap-4">
      {filteredMsgs?.map((app: any, index: any) => {
        const recentMessages = app.mail?.filter(
          (message: any) => message.sender === "business",
        );
        const messageStatus = recentMessages
          ? recentMessages[recentMessages.length - 1].read === true
            ? "read"
            : "new"
          : "no messages";

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
              <div className="MsgInfo flex justify-between">
                <p className="BusinessName w-[70%] overflow-hidden truncate text-left">
                  {app.business}
                </p>
                <p className="ReadStatus">| {messageStatus}</p>
              </div>
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
