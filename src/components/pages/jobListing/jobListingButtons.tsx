import SiteButton from "@/components/buttonsAndLabels/siteButton";
import SiteLabel from "@/components/buttonsAndLabels/siteLabel";
import InfoBox from "@/components/informationDisplayComponents/infoBox";
import Link from "next/link";
import ApplicationLimitModal from "@/components/modals/postAJobModals/applicationLimitModal";
import PaymentModal from "@/components/modals/paymentModal";
import ApplyModal from "@/components/modals/applicationModals/applyModal";
import ApplicationNoteModal from "@/components/modals/applicationModals/applicationNoteModal";
import RetractionConfirmationModal from "@/components/modals/applicationModals/retractApplicationModal";
import { PUBLISH_JOB_LISTING } from "@/graphql/mutations";

import { useModal } from "@/contexts/ModalContext";
import { useRouter } from "next/navigation";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useApplications } from "@/contexts/ApplicationsContext";
import { usePageContext } from "@/contexts/PageContext";
import { useState, useEffect } from "react";
import { useFellow } from "@/contexts/FellowContext";
import { useMutation } from "@apollo/client";
import { useJob } from "@/contexts/JobContext";
import PaymentSuccessfulModal from "@/components/modals/paymentSuccessfulModal";
import SuccessfullyPublishedModal from "@/components/modals/postAJobModals/successfullyPublishedModal";

const OwnListingTopButtons = ({
  currentJob,
  canEdit,
  setCanEdit,
  completed,
  deleteClick,
  isPublished,
  setIsPublished,
}: any) => {
  const { showModal } = useModal();
  const { setJob, job } = useJob();
  const [clickedButton, setClickedButton] = useState("");
  const [publishJobListing, { loading, error }] =
    useMutation(PUBLISH_JOB_LISTING);
  const router = useRouter();

  const publishPost = async () => {
    setClickedButton("publish");
    // showModal(<PaymentModal subscriptionAmount="400" isJobPost />)
    try {
      const response = await publishJobListing({
        variables: {
          id: currentJob.id,
          completed: "published",
        },
      });

      setIsPublished(true);
      console.log(
        "Job Listing successfully published, Details:",
        response.data.publishJobListing,
      );

      showModal(
        <SuccessfullyPublishedModal isJobPost jobId={currentJob?.id} />,
      );

      // showModal(<PaymentSuccessfulModal isJobPost jobId={currentJob?.id} />);

      setJob({});
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  let redirectUrl: any;

  if (completed === "create") {
    redirectUrl = "/post-a-job/step1";
  } else if (completed === "step1") {
    redirectUrl = "/post-a-job/step2";
  } else if (completed === "step2") {
    redirectUrl = "/post-a-job/step3";
  } else if (completed === "step3") {
    redirectUrl = "/post-a-job/step4";
  } else if (completed === "step4") {
    redirectUrl = "/post-a-job/step5";
  } else if (completed === "step5") {
    redirectUrl = "listing";
  }

  const redirect = () => {
    setClickedButton("redirect");
    console.log("need to redirect to the relevant url - ", redirectUrl);
    if (redirectUrl !== "listing") {
      router.push(redirectUrl);
    } else if (redirectUrl === "listing") {
      showModal(<ApplicationLimitModal />);
    }
  };

  const manageListing = (key: string) => {
    console.log("trying to manage listing by going to ams");
    setClickedButton(key);
    router.push(`/ams/${currentJob.id}`);
  };

  return (
    <div className="BusinessTopButtons -mb-2 -mt-20 flex flex-col items-end gap-4 self-end">
      {!isPublished && completed !== "appLimit" ? (
        <SiteButton
          variant="filled"
          colorScheme="b4"
          aria="complete listing"
          addClasses="px-8"
          onClick={redirect}
          isSelected={clickedButton === "redirect"}
        >
          complete listing
        </SiteButton>
      ) : isPublished ? (
        <SiteButton
          variant="filled"
          colorScheme="b4"
          aria="edit"
          addClasses="px-8"
          onClick={() => manageListing("ams")}
          isSelected={clickedButton === "ams"}
        >
          view applications
        </SiteButton>
      ) : (
        <SiteButton
          variant="filled"
          colorScheme="b4"
          aria="edit"
          addClasses="px-8"
          onClick={() => setCanEdit(!canEdit)}
          isSelected={canEdit}
        >
          {canEdit ? "finish editing" : "edit"}
        </SiteButton>
      )}

      {!isPublished && (
        <SiteButton
          aria="publish"
          variant="filled"
          colorScheme="f1"
          addClasses="px-8"
          onClick={publishPost}
          isSelected={clickedButton === "publish"}
        >
          {clickedButton === "publish" ? "Publishing..." : "publish"}
        </SiteButton>
      )}

      {isPublished && (
        <SiteButton
          aria="publish"
          variant="filled"
          colorScheme="f1"
          addClasses="px-8"
          onClick={() => manageListing("appCount")}
          isSelected={clickedButton === "appCount"}
        >
          current apps: {currentJob?.applications.length || 0}
        </SiteButton>
      )}
      {!isPublished && (
        <SiteButton
          variant="filled"
          aria="apps"
          colorScheme="b1"
          addClasses="px-8"
          onClick={() =>
            showModal(
              <ApplicationLimitModal
                currentLimit={currentJob.applicationLimit}
              />,
            )
          }
        >
          application limit: {currentJob?.applicationLimit || 25}
        </SiteButton>
      )}
      {isPublished && (
        <SiteLabel
          variant="display"
          aria="appLimit"
          colorScheme="b1"
          addClasses="px-8"
        >
          application limit: {currentJob?.applicationLimit || 25}
        </SiteLabel>
      )}

      {!isPublished && (
        <SiteButton
          variant="filled"
          colorScheme="c5"
          aria="delete"
          addClasses="px-8"
          onClick={deleteClick}
        >
          delete post
        </SiteButton>
      )}
    </div>
  );
};

const OwnJobBottomButtons = ({
  canEdit,
  setCanEdit,
  completed,
  currentJob,
  isPublished,
  setIsPublished,
}: any) => {
  const { showModal } = useModal();
  const router = useRouter();
  const [clickedButton, setClickedButton] = useState("");
  const { setJob } = useJob();
  const [publishJobListing, { loading, error }] =
    useMutation(PUBLISH_JOB_LISTING);

  let redirectUrl: any;

  useEffect(() => {
    if (completed === "create") {
      redirectUrl = "/post-a-job/step1";
    } else if (completed === "step1") {
      redirectUrl = "/post-a-job/step2";
    } else if (completed === "step2") {
      redirectUrl = "/post-a-job/step3";
    } else if (completed === "step3") {
      redirectUrl = "/post-a-job/step4";
    } else if (completed === "step4") {
      redirectUrl = "/post-a-job/step5";
    } else if (completed === "step5") {
      redirectUrl = "listing";
    }
  }, []);

  const redirect = () => {
    setClickedButton("redirect");
    console.log("need to redirect to the relevant url - ", redirectUrl);
    if (redirectUrl !== "listing") {
      router.push(redirectUrl);
    } else if (redirectUrl === "listing") {
      showModal(<ApplicationLimitModal />);
    }
  };

  useEffect(() => {
    console.log(isPublished);
  }, [isPublished]);

  const publishPost = async () => {
    // showModal(<PaymentModal subscriptionAmount="400" isJobPost />)
    setClickedButton("publish");
    try {
      const response = await publishJobListing({
        variables: {
          id: currentJob.id,
          completed: "published",
        },
      });

      console.log(
        "Job Listing successfully published, Details:",
        response.data.publishJobListing,
      );

      setIsPublished(true);
      showModal(
        <SuccessfullyPublishedModal isJobPost jobId={currentJob?.id} />,
      );
      // showModal(<PaymentSuccessfulModal isJobPost jobId={currentJob?.id} />);

      setJob({});
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  const manageListing = () => {
    console.log("trying to manage listing by going to ams");
    setClickedButton("ams");
    router.push(`/ams/${currentJob.id}`);
  };

  return (
    <div className="EditButtonContainer flex flex-col items-end gap-4 self-end">
      {!isPublished && completed !== "appLimit" ? (
        <SiteButton
          variant="filled"
          colorScheme="b4"
          aria="complete listing"
          addClasses="px-8"
          onClick={redirect}
          isSelected={clickedButton === "redirect"}
        >
          complete listing
        </SiteButton>
      ) : isPublished ? (
        <SiteButton
          variant="filled"
          colorScheme="b4"
          aria="edit"
          addClasses="px-8"
          onClick={manageListing}
          isSelected={clickedButton === "ams"}
        >
          manage post
        </SiteButton>
      ) : (
        <SiteButton
          variant="filled"
          colorScheme="b4"
          aria="edit"
          addClasses="px-8"
          onClick={() => setCanEdit(!canEdit)}
          isSelected={canEdit}
        >
          {canEdit ? "finish editing" : "edit"}
        </SiteButton>
      )}
      {!isPublished && (
        <SiteButton
          aria="publish"
          variant="filled"
          colorScheme="f1"
          addClasses="px-8"
          onClick={publishPost}
          isSelected={clickedButton === "publish"}
        >
          {clickedButton === "publish" ? "Publishing..." : "publish"}
        </SiteButton>
      )}
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
  canApply,
  app,
  hasMatchingNonNegParams,
}: any) => {
  const { fellow } = useFellow();
  const { showModal } = useModal();
  const { isLoggedIn } = usePageContext();
  const [showLimitDetails, setShowLimitDetails] = useState(false);
  const [clickedButton, setClickedButton] = useState("");
  const router = useRouter();

  const atDailyLimit = fellow?.dailyApplications?.length === 5;

  const goToAms = () => {
    setClickedButton("goToAms");
    router.push("/ams");
  };

  return (
    <div className="FellowTopButtons -mb-2 -mt-20 flex flex-col items-end gap-1 self-end">
      <div className="OptionalTopButtons flex flex-col items-end gap-2">
        {isLoggedIn && (
          <SiteButton
            aria="saveJob"
            colorScheme="d3"
            onClick={() => saveClick(id)}
            isSelected={jobSavedStatus || matchingIds}
          >
            {jobSavedStatus === true && !matchingIds
              ? "saved"
              : matchingIds
                ? "applied"
                : "save job"}
          </SiteButton>
        )}

        {isLoggedIn && matchingIds && (
          <SiteButton
            aria="goToAms"
            colorScheme="b4"
            onClick={() => goToAms()}
            isSelected={clickedButton === "goToAms"}
            addClasses="mt-2"
          >
            {clickedButton === "goToAms" ? "going to manager..." : "manage app"}
          </SiteButton>
        )}
      </div>
      <SiteLabel
        variant="display"
        aria="appLimit"
        addClasses="mt-3"
        colorScheme="f3"
      >
        applications:{" "}
        {currentJob.applications !== null ? currentJob.applications.length : 0}/
        {currentJob?.applicationLimit || 25}
      </SiteLabel>

      <SiteLabel variant="display" aria="roundNumber" colorScheme="b3">
        round: {currentJob?.roundNumber || "1"}
      </SiteLabel>

      <div className="ApplyButtons -mt-1 flex items-start gap-2">
        {isLoggedIn && !canApply && !matchingIds && !showLimitDetails && (
          <SiteButton
            size="smallCircle"
            colorScheme="d1"
            variant="filled"
            aria="details"
            addClasses="text-sm text-center"
            onClick={() => setShowLimitDetails(!showLimitDetails)}
          >
            ?
          </SiteButton>
        )}
        {isLoggedIn && !canApply && !matchingIds && showLimitDetails && (
          <SiteLabel
            colorScheme="d1"
            variant="display"
            size="extraSmall"
            aria="limit details"
            addClasses={`text-sm text-center mt-2 max-w-[17rem] `}
            onClick={() => setShowLimitDetails(!showLimitDetails)}
          >
            {!hasMatchingNonNegParams
              ? "your skills list doesn't match this job's non-negotiable parameters"
              : atDailyLimit
                ? "you've reached your daily app limit"
                : "details here"}
          </SiteLabel>
        )}
        {!matchingIds && isLoggedIn && !showLimitDetails && (
          <SiteButton
            aria="publish"
            variant="filled"
            colorScheme="b4"
            addClasses="px-8 mt-2"
            onClick={() =>
              showModal(
                <ApplyModal
                  jobTitle={currentJob?.jobTitle}
                  business={currentJob?.business.name}
                  jobId={id}
                />,
              )
            }
            disabled={canApply === false || matchingIds}
          >
            {matchingIds ? "applied" : !canApply ? "cannot apply" : "apply now"}
          </SiteButton>
        )}
      </div>
      {/* {!matchingIds && isLoggedIn && (
        <SiteButton
          aria="publish"
          variant="filled"
          colorScheme="b4"
          addClasses="px-8 mt-2"
          onClick={() =>
            showModal(
              <ApplyModal
                jobTitle={currentJob?.jobTitle}
                business={currentJob?.business.name}
                jobId={id}
              />,
            )
          }
          disabled={canApply === false || matchingIds}
        >
          {matchingIds ? "applied" : !canApply ? "cannot apply" : "apply now"}
        </SiteButton>
      )} */}
      {/* {matchingIds && isLoggedIn && (
        <SiteButton
          variant="filled"
          colorScheme="b6"
          aria="addANote"
          addClasses="mt-1"
          onClick={() => showModal(<ApplicationNoteModal app={app} />)}
        >
          create a note
        </SiteButton>
      )} */}
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
  const { isLoggedIn, accountType } = usePageContext();
  const [clickedButton, setClickedButton] = useState("");

  const continueRetract = () => {
    console.log("trying to retract this application");
    const updatedApplications = applications?.filter(
      (app) => app.id !== currentApp?.id,
    );
    setApplications(updatedApplications || []);
    hideModal();
  };

  const goToBusinessProfile = () => {
    setClickedButton("GoToBusiness");
    router.push(`/business/${currentJob.business.id}`);
  };
  const sendMessage = () => {
    setClickedButton("message");
    router.push(`/messages/${currentApp}`);
  };

  return (
    <div className="FellowButtonsContainer flex flex-col items-end gap-4 self-end">
      <SiteButton
        variant="filled"
        colorScheme="c4"
        aria="edit"
        addClasses="px-8"
        onClick={goToBusinessProfile}
        isSelected={clickedButton === "GoToBusiness"}
      >
        view company details
      </SiteButton>
      {!matchingIds && isLoggedIn && accountType === "Fellow" && (
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
      {matchingIds && isLoggedIn && (
        <div className="ApplicationButtons flex flex-col items-end gap-4 self-end">
          <SiteButton
            aria="publish"
            variant="filled"
            colorScheme="b3"
            addClasses="px-8"
            onClick={sendMessage}
            isSelected={clickedButton === "message"}
          >
            send a message
          </SiteButton>
          {/* <SiteButton
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
          </SiteButton> */}
        </div>
      )}
    </div>
  );
};

const OtherBusinessTopButtons = ({ currentJob }: any) => {
  return (
    <div className="FellowTopButtons -mb-2 -mt-20 flex flex-col items-end gap-1 self-end">
      <SiteLabel
        variant="display"
        aria="appLimit"
        addClasses="mt-3"
        colorScheme="f3"
      >
        applications:{" "}
        {currentJob.applications !== null ? currentJob.applications.length : 0}/
        {currentJob?.applicationLimit || 25}
      </SiteLabel>

      <SiteLabel variant="display" aria="roundNumber" colorScheme="b3">
        round: {currentJob?.roundNumber || "1"}
      </SiteLabel>
    </div>
  );
};

const OtherBusinessBottomButtons = ({
  matchingIds,
  canApply,
  currentJob,
  id,
  currentApp,
}: any) => {
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const { applications, setApplications } = useApplications();
  const { isLoggedIn } = usePageContext();
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
        onClick={() => router.push(`/business/${currentJob.business.id}`)}
      >
        view company details
      </SiteButton>
      {!matchingIds && isLoggedIn && (
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
      {matchingIds && isLoggedIn && (
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
        Applications: {currentJob?.applications?.length || 0}/
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
  OtherBusinessTopButtons,
  OtherBusinessBottomButtons,
  AppFellowNotes,
  AmsTopButtons,
};
