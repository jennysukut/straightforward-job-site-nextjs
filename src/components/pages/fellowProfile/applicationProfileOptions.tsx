import SiteButton from "@/components/buttonsAndLabels/siteButton";
import SiteLabel from "@/components/buttonsAndLabels/siteLabel";
import InfoBox from "@/components/informationDisplayComponents/infoBox";
import ApplicationNoteModal from "@/components/modals/applicationModals/applicationNoteModal";
import SetAppStatusModal from "@/components/modals/applicationModals/setAppStatusModal";
import RejectAppModal from "@/components/modals/applicationModals/rejectAppModal";

import { useModal } from "@/contexts/ModalContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useApplications } from "@/contexts/ApplicationsContext";

const AppFellowTopButtons = ({ app, applicant }: any) => {
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
    <div className="BusinessAppButtonsContainer -mt-28 flex flex-col items-end gap-4 self-end">
      <SiteButton
        variant="filled"
        colorScheme="b5"
        aria="Contact"
        addClasses="px-8"
        //Open messenger, sending app Details to bring up the current conversation
        // or a new conversation pertaining to this app
        // onClick={() => setCanEdit(!canEdit)}
      >
        message
      </SiteButton>
      <SiteButton
        variant="filled"
        colorScheme="e5"
        aria="edit"
        addClasses="px-8"
        onClick={() => showModal(<ApplicationNoteModal app={app} />)}
      >
        {app.businessNote.length > 0 ? "add another note" : "add a note"}
      </SiteButton>
      <SiteButton
        variant="filled"
        colorScheme="f3"
        aria="edit"
        addClasses="px-8"
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
        status: {app.appStatus}
      </SiteButton>
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
      <SiteButton
        variant="filled"
        colorScheme="c4"
        aria="Contact"
        addClasses="px-8"
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
        move to next stage
      </SiteButton>

      <SiteButton
        variant="filled"
        colorScheme="b6"
        aria="edit"
        addClasses="px-8"
        onClick={() => showModal(<ApplicationNoteModal app={app} />)}
      >
        {app.businessNote.length > 0 ? "add another note" : "add a note"}
      </SiteButton>
      <SiteButton
        variant="filled"
        colorScheme="f3"
        aria="edit"
        addClasses="px-8"
        onClick={() => showModal(<RejectAppModal applicant={applicant} />)}
      >
        reject
      </SiteButton>
    </div>
  );
};

const AppFellowNotes = ({ currentApp }: any) => {
  const { showModal } = useModal();
  return (
    <div className="BusinessNotes flex flex-col gap-4">
      <h2 className="YourNotes -mb-2 -mt-8 ml-4">Your Notes:</h2>
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
      <div className="Divider mt-6 h-[3px] w-[90%] self-center rounded-full bg-jade opacity-80"></div>
    </div>
  );
};

const AppMessage = ({ avatarDetails, currentFellow, currentApp }: any) => {
  if (currentApp.message) {
    return (
      <InfoBox
        variant="filled"
        aria="appMessage"
        size="profile"
        width="medium"
        colorScheme={avatarDetails?.colorScheme as ButtonColorOption}
      >
        <div className="AppMessage flex flex-col gap-2">
          <p className={`MessageTitle mb-2 ml-2`}>
            Message To You From {currentFellow?.name}:
          </p>
          <p className={`Message ml-2 indent-10`}>{currentApp?.message}</p>
        </div>
      </InfoBox>
    );
  }
};

export {
  AppFellowTopButtons,
  AppFellowBottomButtons,
  AppFellowNotes,
  AppMessage,
};
