import SiteButton from "@/components/buttonsAndLabels/siteButton";
import SiteLabel from "@/components/buttonsAndLabels/siteLabel";
import InfoBox from "@/components/informationDisplayComponents/infoBox";
import ApplicationNoteModal from "@/components/modals/applicationModals/applicationNoteModal";
import SetAppStatusModal from "@/components/modals/applicationModals/setAppStatusModal";
import RejectAppModal from "@/components/modals/applicationModals/rejectAppModal";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useApplications } from "@/contexts/ApplicationsContext";

const AppFellowTopButtons = ({ app, applicant, showRejectOptions }: any) => {
  const [clickedButton, setClickedButton] = useState("");
  const { showModal, hideModal } = useModal();
  const { applications, setApplications } = useApplications();
  const router = useRouter();

  const goToMessages = () => {
    setClickedButton("goToMessages");
    router.push(`/messages/${app.id}`);
  };

  const updateStatus = (status: any) => {
    const updatedApplications = applications?.map((application) => {
      if (application.id === app.id) {
        return {
          ...application,
          appStatus: status,
        };
      }
      return application;
    });
    setApplications(updatedApplications || []);
    hideModal();
  };

  const backToAms = () => {
    setClickedButton("backToAms");
    //reroute back to ams for this jobId number
  };

  return (
    <div className="BusinessAppButtonsContainer -mt-28 flex flex-col items-end gap-4 self-end">
      {/* {app.appStatus === "closed" && (
        <SiteButton
          variant="hollow"
          colorScheme="c4"
          aria="back to ams"
          addClasses="px-8"
          onClick={backToAms}
          isSelected={clickedButton === "backToAms"}
        >
          {clickedButton === "backToAms" ? "loading..." : "back to manager"}
        </SiteButton>
      )} */}
      {/* <SiteButton
        variant="filled"
        colorScheme={app.appStatus === "closed" ? "b3" : "b5"}
        // colorScheme="b5"
        aria="Contact"
        addClasses="px-8"
        // disabled={app.appStatus === "closed"}
        onClick={goToMessages}
        isSelected={clickedButton === "goToMessages"}
      >
        {clickedButton === "goToMessages"
          ? "loading..."
          : app.appStatus === "closed"
            ? "mail history"
            : "message"}
      </SiteButton>
      <SiteButton
        variant="filled"
        colorScheme={app.appStatus === "closed" ? "c1" : "e5"}
        aria="edit"
        addClasses="px-8"
        onClick={() => showModal(<ApplicationNoteModal app={app} />)}
      >
        {app.BusinessNote && app.businessNote.length > 0
          ? "add another note"
          : app.appStatus === "closed"
            ? "add post-close note"
            : "add a note"}
      </SiteButton>
      <SiteButton
        variant="filled"
        colorScheme="f3"
        aria="edit"
        addClasses="px-8"
        disabled={app.appStatus === "closed"}
        onClick={() =>
          showModal(
            <SetAppStatusModal
              appStatus={app.appStatus}
              applicant={applicant}
              updateStatus={updateStatus}
              showRejectOptions={showRejectOptions}
              application={app}
            />,
          )
        }
      >
        status: {app.appStatus}
      </SiteButton> */}
    </div>
  );
};

const AppFellowBottomButtons = ({ app, applicant }: any) => {
  const { showModal, hideModal } = useModal();
  const { applications, setApplications } = useApplications();

  const updateStatus = (status: any) => {
    const updatedApplications = applications?.map((application) => {
      if (application.id === app.id) {
        return {
          ...application,
          appStatus: status,
        };
      }
      return application;
    });
    setApplications(updatedApplications || []);
    hideModal();
  };

  return (
    <div className="AppBottomButtonContainer flex flex-col items-end gap-4 self-end">
      {/* <SiteButton
        variant="filled"
        colorScheme="c4"
        aria="Contact"
        addClasses="px-8"
        disabled={app.appStatus === "closed"}
        onClick={() =>
          showModal(
            <SetAppStatusModal
              appStatus={app.appStatus}
              applicant={applicant}
              updateStatus={updateStatus}
            />,
          )
        }
      >
        {" "}
        {app.appStatus === "closed" ? "app closed" : "move to next stage"}
      </SiteButton>

      <SiteButton
        variant="filled"
        colorScheme={app.appStatus === "closed" ? "f5" : "b6"}
        // colorScheme="b6"
        aria="edit"
        addClasses="px-8"
        // disabled={app.appStatus === "closed"}
        onClick={() => showModal(<ApplicationNoteModal app={app} />)}
      >
        {app.BusinessNote && app.businessNote.length > 0
          ? "add another note"
          : "add a note"}
      </SiteButton>
      <SiteButton
        variant="filled"
        colorScheme="f3"
        aria="edit"
        addClasses="px-8"
        disabled={app.appStatus === "closed"}
        onClick={() => showModal(<RejectAppModal applicant={applicant} />)}
      >
        {app.appStatus === "closed" ? "rejected" : "reject"}
      </SiteButton> */}
    </div>
  );
};

const AppFellowNotes = ({ currentApp }: any) => {
  const { showModal } = useModal();
  return (
    <div className="BusinessNotes flex flex-col gap-4">
      {/* <h2 className="YourNotes -mb-2 -mt-8 ml-4">Your Notes:</h2>
      {currentApp.businessNote.map((note: string, index: number) => {
        return (
          <InfoBox
            key={index}
            variant="hollow"
            aria="businessNote"
            size="note"
            canEdit
            addClasses="text-midnight"
            editClick={() =>
              showModal(<ApplicationNoteModal app={currentApp} note={note} />)
            }
          >
            {note}
          </InfoBox>
        );
      })}
      <div className="Divider mt-6 h-[3px] w-[90%] self-center rounded-full bg-jade opacity-80"></div> */}
    </div>
  );
};

const AppMessage = ({ avatarDetails, currentFellow, currentApp }: any) => {
  if (currentApp.message) {
    return (
      <div className=""></div>
      // <InfoBox
      //   variant="filled"
      //   aria="appMessage"
      //   size="profile"
      //   width="medium"
      //   colorScheme={avatarDetails?.colorScheme as ButtonColorOption}
      // >
      //   <div className="AppMessage flex flex-col gap-2">
      //     <p className={`MessageTitle mb-2 ml-2`}>
      //       Message To You From {currentFellow?.name}:
      //     </p>
      //     <p className={`Message ml-2 indent-10`}>{currentApp?.message}</p>
      //   </div>
      // </InfoBox>
    );
  }
};

export {
  AppFellowTopButtons,
  AppFellowBottomButtons,
  AppFellowNotes,
  AppMessage,
};
