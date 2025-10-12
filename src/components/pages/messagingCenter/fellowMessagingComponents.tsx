import SiteButton from "@/components/buttonsAndLabels/siteButton";

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
  const { applications, setApplications } = useApplications();
  const { fellow } = useFellow();
  const [filteredMsgs, setFilteredMsgs] = useState<string[]>([]);

  // console.log("applications:", applications);

  const currentMsgs = applications
    ?.filter(
      (app: any) =>
        Array.isArray(app.conversation?.messages) &&
        app.conversation.messages.length > 0,
    )
    .sort((a, b) => {
      const mostRecentA =
        Array.isArray(a.conversation?.messages) &&
        a.conversation.messages.length > 0
          ? a.conversation.messages.reduce((latest: any, message: any) => {
              const messageDate = new Date(message.createdAt);
              return messageDate > latest ? messageDate : latest;
            }, new Date(0))
          : new Date(0);

      const mostRecentB =
        Array.isArray(b.conversation?.messages) &&
        b.conversation.messages.length > 0
          ? b.conversation.messages.reduce((latest: any, message: any) => {
              const messageDate = new Date(message.createdAt);
              return messageDate > latest ? messageDate : latest;
            }, new Date(0))
          : new Date(0);

      return mostRecentB.getTime() - mostRecentA.getTime();
    });

  const filterMessages = () => {
    const filteredMessages: any = currentMsgs?.filter((msg: any) => {
      const activeAppMessages = msg.appStatus !== "closed";
      return activeAppMessages;
    });

    setFilteredMsgs(filteredMessages);
  };

  useEffect(() => {
    setCurrentMessages(filteredMsgs);
  }, [filteredMsgs]);

  useEffect(() => {
    filterMessages();
  }, []);

  return (
    <div className="MessageListGroup flex flex-col gap-4">
      <h2 className="ActiveConversations text-center">Active Conversations</h2>

      {currentMsgs?.map((app: any, index: any) => {
        const recentMessages = app.conversation.messages?.filter(
          (message: any) => message.fromBusiness === true,
        );
        // update the "read" field/status using DB
        const messageStatus = "read";
        // recentMessages
        //   ? recentMessages[recentMessages.length - 1].read === true
        //     ? "read"
        //     : "new"
        //   : "no messages";

        const businessName = app.jobListing.business.name;

        return (
          <div key={index} className="FellowMessageGroup flex gap-2">
            <SiteButton
              variant="hollow"
              aria="mail item"
              addClasses="w-[25vw] py-3 overflow-hidden truncate px-2"
              colorScheme={
                colorArray[index % colorArray.length] as ButtonColorOption
              }
              onClick={() => showMessages(app.id)}
              isSelected={activeApp === app.id}
            >
              <div className="MsgInfo flex justify-between">
                <p className="BusinessName w-[90%] overflow-hidden truncate text-left text-[.85rem]">
                  {businessName}
                </p>
                <p className="ReadStatus text-[.75rem]">| {messageStatus}</p>
              </div>
            </SiteButton>
          </div>
        );
      })}
    </div>
  );
};

export { RenderFellowMessageList };
