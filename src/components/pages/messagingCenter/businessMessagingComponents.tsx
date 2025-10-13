import SiteButton from "@/components/buttonsAndLabels/siteButton";
import SiteLabel from "@/components/buttonsAndLabels/siteLabel";
import InfoBox from "@/components/informationDisplayComponents/infoBox";
import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";

import { useModal } from "@/contexts/ModalContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useApplications } from "@/contexts/ApplicationsContext";
import { useEffect, useState } from "react";
import { useBusiness } from "@/contexts/BusinessContext";
import { useJobListings } from "@/contexts/JobListingsContext";

import { Applications } from "@/contexts/ApplicationsContext";
type CurrentSchemeType = ButtonColorOption;

const RenderBusinessMessageList = ({
  colorArray,
  activeApp,
  showMessages,
  setCurrentMessages,
  currentListings,
  setActiveApp,
  setLoadingData,
}: any) => {
  const { showModal, hideModal } = useModal();
  const { applications, setApplications } = useApplications();
  const { business } = useBusiness();
  const [selectedListing, setSelectedListing] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [secondaryColorArray, setSecondaryColorArray] = useState<
    CurrentSchemeType[]
  >([]);

  //REDEFINE -- these are undefined
  // const activeListing = currentListings?.find((listing: any) => {
  //   return listing?.job?.applications?.includes(activeApp);
  // });

  const listingsWithConversations = currentListings.filter((listing: any) =>
    listing.applications?.some(
      (app: any) =>
        app.conversation.messages.length >= 1 && app.appStatus !== "closed",
    ),
  );

  const activeAppsWithConversations = listingsWithConversations.map(
    (listing: any) =>
      listing.applications.filter(
        (app: any) =>
          app.appStatus !== "closed" && app.conversation.messages.length >= 1,
      ),
  );

  // I'll need to filter once I get the dates and timestamps for each of the messages
  const timeSortedAppsWithConvos = activeAppsWithConversations.sort(
    (a: any, b: any) => {
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
    },
  );

  const expandListingMessages = (id: any) => {
    console.log("expandListingMessages for:", id);
    if (selectedListing === id) {
      setSelectedListing("");
    } else {
      setSelectedListing(id);
    }
  };

  const renderRelevantMessages = () => {
    // Here, we need to find all the activeAppsWithConversations whose jobListing attached to it matches the "selectedListing", then render throught the list

    const currentListing = listingsWithConversations?.filter(
      (listing: any) => listing?.id === selectedListing,
    );

    const currentApps = currentListing.flatMap((listing: any) =>
      listing.applications.filter(
        (app: any) =>
          app.appStatus !== "closed" && app.conversation.messages.length >= 1,
      ),
    );

    const sortedMessages = currentApps?.sort((a: any, b: any) => {
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

    // set the activeApp if there isn't one
    if (selectedListing !== "" && !activeApp) {
      setActiveApp(sortedMessages[0].id);
    }

    return sortedMessages.map((msgs: any, index: number) => {
      // FIGURE OUT: How to indicate if a message is read or unread?

      // return sortedMessages?.map((app: any, index: number) => {
      //   const recentMessages = app.mail?.filter(
      //     (message: any) => message.sentByBusiness === false,
      //   );

      //   const messageStatus = recentMessages
      //     ? recentMessages[recentMessages.length - 1].read === true
      //       ? "read"
      //       : "new"
      //     : "no messages";

      const messageStatus = "status";

      // TODO: sort messages by most recent message

      return (
        <div
          key={msgs.id}
          className="ListingMessageGroup flex items-end gap-3 self-end"
        >
          <SiteButton
            variant="hollow"
            aria="mail item"
            addClasses="w-[27vw] flex justify-between"
            colorScheme={
              secondaryColorArray[
                index % secondaryColorArray.length
              ] as ButtonColorOption
            }
            onClick={() => showMessages(msgs.id)}
            isSelected={activeApp === msgs.id}
          >
            <p className="ApplicantName w-[50%] overflow-hidden truncate text-left text-[0.8rem]">
              {msgs.fellow.name}
            </p>

            <p className="Details">
              | {messageStatus}
              {/* {app.conversation.messages.length || 0} total | 1 new */}
            </p>
          </SiteButton>
        </div>
      );
    });
  };

  useEffect(() => {
    setCurrentMessages(timeSortedAppsWithConvos);
  }, []);

  useEffect(() => {
    ShuffleIdealButtonPattern(setSecondaryColorArray);
  }, []);

  useEffect(() => {
    if (listingsWithConversations.length > 0) {
      setSelectedListing(listingsWithConversations[0].id);
    }
  }, [listingsWithConversations]);

  return (
    <div className="MessageListGroup flex max-h-[90vh] flex-col gap-4 overflow-y-auto overflow-x-visible p-3">
      <h2 className="ActiveConversations text-center">Active Conversations</h2>
      {listingsWithConversations.map((job: any, index: any) => {
        return (
          <div key={index} className="ListingGroup flex flex-col gap-3">
            <SiteButton
              variant="hollow"
              aria="current job listings with mail"
              addClasses="w-[30vw] flex justify-between py-3"
              colorScheme={
                colorArray[index % colorArray.length] as ButtonColorOption
              }
              onClick={() => expandListingMessages(job.id)}
              isSelected={selectedListing === job.id}
            >
              <p className="Title w-[50%] overflow-hidden truncate text-left text-[.9rem]">
                {job.jobTitle}
              </p>

              <p className="Details">
                | {job.applications.length} active messages
              </p>
            </SiteButton>

            {selectedListing === job.id && (
              <div className="RelevantMessages flex max-h-[90vh] flex-col gap-3 overflow-y-auto overflow-x-visible px-3 pb-2 pt-1">
                {renderRelevantMessages()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export { RenderBusinessMessageList };
