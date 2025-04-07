"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { Notification } from "../buttonsAndLabels/notificationButton";
import { useModal } from "@/contexts/ModalContext";

import Image from "next/image";
import SiteButton from "../buttonsAndLabels/siteButton";
import ShuffleIdealButtonPattern from "../buttonsAndLabels/shuffleIdealButtonPattern";
import ApplicationNoteModal from "../modals/applicationModals/applicationNoteModal";
import ViewApplicationNoteModal from "../modals/applicationModals/viewAppNotesModal";

interface BusinessApplicationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  colorArray: Array<string>;
  index: any;
  jobId?: string;
  dateOfApp?: any;
  appStatus?: string;
  app?: any;
  highlighted?: boolean;
}

// TODO: Make Notification Messages for each of these apps

const BusinessApplication: React.FC<BusinessApplicationProps> = ({
  id,
  colorArray,
  index,
  appStatus,
  app,
}) => {
  const router = useRouter();
  const { showModal } = useModal();

  const [betterColorArray, setBetterColorArray] = useState(Array<any>);
  const [appClicked, setAppClicked] = useState(false);
  const [buttonClicked, setButtonClicked] = useState("");

  const currentApplicant = {
    name: "A Person",
    smallBio: "smallBio Here",
  };

  //TODO: Here is the place where we set our parameters for notifications - we'll need to have one for new messages, appointment requests, and simply new applications
  const notification = app.appStatus === "submitted" ? true : false;

  // functions
  const viewApplication = () => {
    setButtonClicked("viewApplication");
    router.push(`/application/${id}`);
  };

  //TODO: figure out what to do with highlighting?
  const highlight = () => {
    setButtonClicked("highlight");
    // add and remove highlights directly with the server
    if (app.highlighted === true) {
      app.highlighted === false;
    } else {
      app.highlighted === true;
    }
  };

  const noteClick = () => {
    if (app.businessNote && app.businessNote.length > 0) {
      showModal(
        <ViewApplicationNoteModal notes={app.businessNote} app={app} />,
      );
    } else {
      showModal(<ApplicationNoteModal app={app} />);
    }
  };

  const goToMessages = () => {
    setButtonClicked("goToMessages");
    router.push(`/messages/${app.id}`);
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setBetterColorArray);
  }, []);

  return (
    <div className="Application flex w-full flex-col gap-3" key={id}>
      <div className="MainAppButtons flex items-center justify-start gap-4">
        <div className="NotificationSpace w-4">
          {/* TODO: Set Types of Notifications and plug them in here */}
          {notification && <Notification message="new interview request" />}
        </div>
        <div className="Application justify-end">
          <SiteButton
            aria="JobApplication"
            variant="hollow"
            colorScheme={
              colorArray[index % colorArray.length] as ButtonColorOption
            }
            size="wide"
            addClasses="w-[77vw]"
            onClick={() => setAppClicked(!appClicked)}
            isSelected={appClicked}
          >
            <div className="AppInfo flex justify-between">
              <p className="TitleAndBusiness flex max-w-[70%] gap-2 text-[1rem]">
                {currentApplicant?.name} |
                <span className="SmallBio max-w-[65%] overflow-hidden truncate">
                  {currentApplicant?.smallBio}
                </span>
              </p>
              <p className="Details flex gap-2 self-center text-sm">
                {app.dateOfApp} | {appStatus}
              </p>
            </div>
          </SiteButton>
        </div>
        {app.highlighted === true && (
          <Image
            src="/highlight-star-peach.svg"
            alt="highlight"
            width={15}
            height={15}
            className="-ml-3 -mt-8"
          />
        )}
      </div>

      {appClicked && (
        <div className="DetailsAndOptions ml-1 mr-10 flex flex-col gap-4">
          <div className="SecondaryButtons mb-1 mt-1 flex justify-end gap-4 align-top">
            <SiteButton
              aria="view application"
              variant="hollow"
              colorScheme={betterColorArray[0]}
              onClick={viewApplication}
              isSelected={buttonClicked === "viewApplication"}
            >
              view this application
            </SiteButton>
            <SiteButton
              aria="view notes"
              variant="hollow"
              colorScheme={betterColorArray[1]}
              onClick={noteClick}
            >
              {app.businessNote && app.businessNote.length === 1
                ? "view your note"
                : app.businessNote && app.businessNote.length > 1
                  ? "view your notes"
                  : "add a note"}
            </SiteButton>
            <SiteButton
              aria="go to messages"
              variant="hollow"
              colorScheme={betterColorArray[2]}
              onClick={goToMessages}
              isSelected={buttonClicked === "goToMessages"}
            >
              messages
            </SiteButton>
            <SiteButton
              aria="highlight"
              variant="hollow"
              colorScheme={betterColorArray[3]}
              onClick={highlight}
              // isSelected={buttonClicked === "highlight"}
            >
              {app.highlighted === true ? "remove highlight" : "highlight"}
            </SiteButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessApplication;
