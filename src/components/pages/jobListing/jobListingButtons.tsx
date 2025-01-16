import SiteButton from "@/components/buttonsAndLabels/siteButton";
import SiteLabel from "@/components/buttonsAndLabels/siteLabel";
import InfoBox from "@/components/informationDisplayComponents/infoBox";
import Link from "next/link";
import ApplicationLimitModal from "@/components/modals/postAJobModals/applicationLimitModal";
import PaymentModal from "@/components/modals/paymentModal";
import ApplyModal from "@/components/modals/applicationModals/applyModal";
import ApplicationNoteModal from "@/components/modals/applicationModals/applicationNoteModal";
import RetractionConfirmationModal from "@/components/modals/applicationModals/retractApplicationModal";

import { useModal } from "@/contexts/ModalContext";
import { useRouter } from "next/navigation";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useApplications } from "@/contexts/ApplicationsContext";

const OwnListingTopButtons = ({ currentJob }: any) => {
  const { showModal } = useModal();
  return (
    <div className="BusinessTopButtons -mb-2 -mt-10 flex flex-col items-end gap-2 self-end">
      <Link href={"/job-board"}>
        <SiteButton aria="job board" colorScheme="d5">
          go to job board
        </SiteButton>
      </Link>
      <SiteButton
        variant="filled"
        aria="apps"
        colorScheme="b1"
        onClick={() => showModal(<ApplicationLimitModal />)}
      >
        application limit: {currentJob?.applicationLimit}
      </SiteButton>
    </div>
  );
};

const OwnJobBottomButtons = ({ canEdit, setCanEdit }: any) => {
  const { showModal } = useModal();
  return (
    <div className="EditButtonContainer flex flex-col items-end gap-4 self-end">
      <SiteButton
        variant="filled"
        colorScheme="b6"
        aria="edit"
        addClasses="px-8"
        onClick={() => setCanEdit(!canEdit)}
        isSelected={canEdit}
      >
        {canEdit ? "finish editing" : "edit"}
      </SiteButton>
      <SiteButton
        aria="publish"
        variant="filled"
        colorScheme="f1"
        addClasses="px-8"
        onClick={() =>
          showModal(<PaymentModal subscriptionAmount="400" isJobPost />)
        }
      >
        publish
      </SiteButton>
    </div>
  );
};

const ListingTopButtons = ({
  id,
  saveClick,
  jobSavedStatus,
  matchingIds,
  appNumber,
  currentJob,
  app,
}: any) => {
  const { showModal } = useModal();
  console.log(app);
  return (
    <div className="FellowTopButtons -mb-2 -mt-20 flex flex-col items-end gap-1 self-end">
      <SiteButton
        aria="saveJob"
        colorScheme="d3"
        onClick={() => saveClick(id)}
        isSelected={jobSavedStatus || matchingIds}
        disabled={matchingIds}
      >
        {jobSavedStatus === true
          ? "job saved"
          : matchingIds
            ? "applied"
            : "save job"}
      </SiteButton>
      <SiteLabel
        variant="display"
        aria="appLimit"
        addClasses="mt-3"
        colorScheme="f3"
      >
        applications: {appNumber}/{currentJob?.applicationLimit}
      </SiteLabel>

      <SiteLabel variant="display" aria="roundNumber">
        round: {currentJob?.roundNumber || "1"}
      </SiteLabel>
      {matchingIds && (
        <SiteButton
          variant="filled"
          colorScheme="b6"
          aria="addANote"
          addClasses="mt-1"
          onClick={() => showModal(<ApplicationNoteModal app={app} />)}
        >
          create a note
        </SiteButton>
      )}
    </div>
  );
};

const ListingBottomButtons = ({
  matchingIds,
  canApply,
  currentJob,
  id,
  currentApp,
}: any) => {
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const { applications, setApplications } = useApplications();
  const continueRetract = () => {
    console.log("trying to retract this application");
    const updatedApplications = applications?.filter(
      (app) => app.id !== currentApp?.id,
    );
    setApplications(updatedApplications || []);
    hideModal();
  };

  return (
    <div className="FellowButtonsContainer flex flex-col items-end gap-4 self-end">
      <SiteButton
        variant="filled"
        colorScheme="c4"
        aria="edit"
        addClasses="px-8"
        onClick={() => router.push(`/profile/1b23i`)}
      >
        view company details
      </SiteButton>
      {!matchingIds && (
        <SiteButton
          aria="publish"
          variant="filled"
          colorScheme="f1"
          addClasses="px-8"
          onClick={() =>
            showModal(
              <ApplyModal
                jobTitle={currentJob?.jobTitle}
                business={currentJob?.businessName}
                jobId={id}
              />,
            )
          }
          disabled={canApply === false || matchingIds}
        >
          apply for this job
        </SiteButton>
      )}
      {matchingIds && (
        <div className="ApplicationButtons flex flex-col items-end gap-4 self-end">
          <SiteButton
            aria="publish"
            variant="filled"
            colorScheme="b3"
            addClasses="px-8"
            // onClick={}
          >
            send a message
          </SiteButton>
          <SiteButton
            aria="publish"
            variant="filled"
            colorScheme="f1"
            addClasses="px-8"
            // onClick={}
          >
            view your application
          </SiteButton>
          <SiteButton
            variant="filled"
            colorScheme="f5"
            aria="edit"
            addClasses="px-8"
            onClick={() =>
              showModal(
                <RetractionConfirmationModal
                  jobTitle={currentJob?.jobTitle}
                  continueRetract={continueRetract}
                />,
              )
            }
          >
            retract
          </SiteButton>
        </div>
      )}
    </div>
  );
};

const AmsTopButtons = ({ currentJob }: any) => {
  return (
    <div className="DetailsButtons -mb-2 -mt-20 flex flex-col items-end gap-1 self-end">
      <SiteLabel colorScheme="c1" aria="postDate" variant="display">
        Posted Date: January 5
      </SiteLabel>
      <SiteLabel colorScheme="f1" aria="nextPayment" variant="display">
        Next Payment: $200 on February 5
      </SiteLabel>
      <SiteLabel colorScheme="b3" aria="applicationNumber" variant="display">
        Applications: {currentJob?.applications?.length}/
        {currentJob?.applicationLimit}
      </SiteLabel>
      <SiteLabel colorScheme="c4" aria="Interviews" variant="display">
        Interviews For The Position: 2
      </SiteLabel>
    </div>
  );
};

const AmsBottomButtons = ({ avatarDetails, currentApp }: any) => {
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
          <p className={`MessageTitle mb-2 ml-2`}>Message From You:</p>
          <p className={`Message ml-2 indent-10`}>{currentApp?.message}</p>
        </div>
      </InfoBox>
    );
  }
};

const AppFellowNotes = ({ currentApp }: any) => {
  const { showModal } = useModal();
  if (currentApp?.fellowNote && currentApp.fellowNote.length > 0) {
    return (
      <div className="FellowNotes flex flex-col gap-4">
        <h2 className="YourNotes -mb-2 -mt-8 ml-4">Your Notes:</h2>
        {currentApp.fellowNote.map((note: string, index: number) => {
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
  }
};

export {
  OwnListingTopButtons,
  OwnJobBottomButtons,
  ListingTopButtons,
  ListingBottomButtons,
  AppFellowNotes,
  AmsTopButtons,
};
