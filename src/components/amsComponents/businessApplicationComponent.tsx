"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useFellow } from "@/contexts/FellowContext";
import { Notification } from "../buttonsAndLabels/notificationButton";
import { useModal } from "@/contexts/ModalContext";
import { useFellows } from "@/contexts/FellowsContext";
import { useApplications } from "@/contexts/ApplicationsContext";
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
}

const BusinessApplication: React.FC<BusinessApplicationProps> = ({
  id,
  colorArray,
  index,
  jobId,
  dateOfApp,
  appStatus,
  app,
}) => {
  const router = useRouter();
  const { fellows } = useFellows();
  const { jobListings } = useJobListings();
  const { fellow } = useFellow();
  const { showModal } = useModal();
  const { applications, setApplications } = useApplications();

  const [betterColorArray, setBetterColorArray] = useState(Array<any>);
  const [appClicked, setAppClicked] = useState(false);
  const [showNote, setShowNote] = useState(false);

  const currentApplicant = fellows?.find((fellow: any) => {
    return fellow.id === app?.applicant;
  });

  //here is the place where we set our parameters for notifications - we'll need to have one for new messages, appointment requests, and simply new applications
  const notification = app.appStatus === "submitted" ? true : false;

  // search through the jobListings to find the job with the matching jobId
  const selectedJob = jobListings?.find((job: any) => job.jobId === jobId)?.job;

  const viewApplication = () => {
    const relevantApp = applications?.find(
      (application: any) => application.id === app.id,
    );

    if (relevantApp && applications) {
      if (relevantApp.appStatus === "submitted") {
        relevantApp.appStatus = "viewed";
      }
      setApplications([...applications]);
    }
    router.push(`/application/${id}`);
  };

  // figure out what to do with highlighting?
  const highlight = () => {
    console.log("highlighting app");
  };

  //  for showing notes, it might be best to have a modal or page that compiles them.
  const noteClick = () => {
    if (app.businessNote && app.businessNote.length > 0) {
      console.log(app.businessNote);
      showModal(
        <ViewApplicationNoteModal notes={app.businessNote} app={app} />,
      );
    } else {
      showModal(<ApplicationNoteModal app={app} />);
    }
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setBetterColorArray);
  }, []);

  return (
    <div className="Application flex w-full flex-col gap-3" key={id}>
      <div className="MainAppButtons flex items-center justify-start gap-4">
        {/* {notification && <Notification message="new interview request" />} */}
        <div className="Button justify-end">
          <SiteButton
            aria="JobApplication"
            variant="hollow"
            colorScheme={
              colorArray[index % colorArray.length] as ButtonColorOption
            }
            size="wide"
            addClasses="max-w-[77vw]"
            onClick={() => setAppClicked(!appClicked)}
            isSelected={appClicked}
          >
            <div className="AppInfo flex justify-between">
              <p className="TitleAndBusiness flex max-w-[70%] gap-2 text-[1rem]">
                {currentApplicant?.name} |
                <p className="SmallBio max-w-[75%] overflow-hidden truncate">
                  {currentApplicant?.smallBio}
                </p>
              </p>
              <p className="Details flex gap-2 self-center text-sm">
                {app.dateOfApp} | {appStatus}
              </p>
            </div>
          </SiteButton>
        </div>
        {notification && <Notification message="new interview request" />}
      </div>

      {appClicked && (
        <div className="DetailsAndOptions ml-1 mr-10 flex flex-col gap-4">
          <div className="SecondaryButtons mb-1 mt-1 flex justify-end gap-4 align-top">
            <SiteButton
              aria="viewDetails"
              variant="hollow"
              colorScheme={betterColorArray[0]}
              onClick={viewApplication}
            >
              view this application
            </SiteButton>
            <SiteButton
              aria="viewDetails"
              variant="hollow"
              colorScheme={betterColorArray[1]}
              onClick={noteClick}
            >
              {app.businessNote ? "view your notes" : "add a note"}
            </SiteButton>
            <SiteButton
              aria="viewDetails"
              variant="hollow"
              colorScheme={betterColorArray[2]}
              onClick={viewApplication}
            >
              messages
            </SiteButton>
            <SiteButton
              aria="viewDetails"
              variant="hollow"
              colorScheme={betterColorArray[3]}
              onClick={highlight}
            >
              highlight
            </SiteButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessApplication;
