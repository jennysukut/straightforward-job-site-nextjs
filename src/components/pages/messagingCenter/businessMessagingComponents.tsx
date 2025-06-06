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
}: any) => {
  const { showModal, hideModal } = useModal();
  const { applications, setApplications } = useApplications();
  const { business } = useBusiness();
  const [selectedListing, setSelectedListing] = useState("");
  const [secondaryColorArray, setSecondaryColorArray] = useState<
    CurrentSchemeType[]
  >([]);

  const activeListing = currentListings?.find((listing: any) => {
    return listing?.job?.applications?.includes(activeApp);
  });

  useEffect(() => {
    console.log("currentListings:", currentListings);
  }, [currentListings]);

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
  const currentApps = applications
    ?.filter(
      (app: any) =>
        app.businessId === business?.id &&
        app.mail &&
        app.mail.length > 0 &&
        app.appStatus !== "closed",
    )
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

  const findApplicantName: any = (id: any) => {
    // const applicant = fellows?.find((fellow) => fellow.id === id);
    const applicant = { name: "Person", smallBio: "smallBio Here" };
    return applicant ? applicant.name : "Unknown";
  };

  const expandListingMessages = (id: any) => {
    if (selectedListing === id) {
      setSelectedListing("");
    } else {
      setSelectedListing(id);
    }
  };

  const renderRelevantMessages = () => {
    // const selectedApps = currentApps?.filter(
    //   (app) => app?.jobListing?.id === selectedListing,
    // );
    // const activeAppsWithMail = selectedApps?.filter(
    //   (app) => app.mail && app.mail.length > 0 && app.status !== "closed",
    // );

    // const sortedMessages = activeAppsWithMail?.sort((a, b) => {
    //   const mostRecentA = a.mail?.reduce((latest, message) => {
    //     const messageDate = new Date(`${message.date} ${message.timestamp}`);
    //     return messageDate > latest ? messageDate : latest;
    //   }, new Date(0));

    //   const mostRecentB = b.mail?.reduce((latest, message) => {
    //     const messageDate = new Date(`${message.date} ${message.timestamp}`);
    //     return messageDate > latest ? messageDate : latest;
    //   }, new Date(0));

    //   return (mostRecentB?.getTime() ?? 0) - (mostRecentA?.getTime() ?? 0); // Sort in descending order
    // });

    return listingsWithConversations.map((job: any, index: number) => {
      // if the message was sent by someone else, we can mark it as read, but we should probably try to work that out in the backend

      // return sortedMessages?.map((app: any, index: number) => {
      //   const recentMessages = app.mail?.filter(
      //     (message: any) => message.sender === "fellow",
      //   );
      //   const messageStatus = recentMessages
      //     ? recentMessages[recentMessages.length - 1].read === true
      //       ? "read"
      //       : "new"
      //     : "no messages";

      // TODO: sort messages by most recent message

      return (
        <div
          key={index}
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
            onClick={() => showMessages(job.application.id)}
            isSelected={activeApp === job.application.id}
          >
            <p className="ApplicantName w-[50%] overflow-hidden truncate text-left text-[0.8rem]">
              {job.application.fellow.name} | {job.application.id}
              {/* {findApplicantName(app.applicant)} */}
            </p>
            {/* TODO: Find relevant mail numbers */}
            {/* Probably just set this to "read" or "unread"?? */}

            <p className="Details">
              | messageStatus
              {/* {messageStatus} */}
              {job.application.conversation.messages.length || 0} total | 1 new
            </p>
          </SiteButton>
        </div>
      );
    });
  };

  useEffect(() => {
    setCurrentMessages(currentApps);
  }, []);

  useEffect(() => {
    ShuffleIdealButtonPattern(setSecondaryColorArray);
  }, []);

  useEffect(() => {
    setSelectedListing(activeListing?.jobId || "");
  }, [activeListing]);

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

              <p className="Details">| ? active messages</p>
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
