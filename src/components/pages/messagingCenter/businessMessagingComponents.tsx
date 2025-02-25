import SiteButton from "@/components/buttonsAndLabels/siteButton";
import SiteLabel from "@/components/buttonsAndLabels/siteLabel";
import InfoBox from "@/components/informationDisplayComponents/infoBox";
import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";

import { useModal } from "@/contexts/ModalContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useApplications } from "@/contexts/ApplicationsContext";
import { useEffect, useState } from "react";
import { useBusiness } from "@/contexts/BusinessContext";
import { useFellows } from "@/contexts/FellowsContext";
import { useJobListings } from "@/contexts/JobListingsContext";

type CurrentSchemeType = ButtonColorOption;

const RenderBusinessMessageList = ({
  colorArray,
  activeApp,
  showMessages,
  setCurrentMessages,
}: any) => {
  const { showModal, hideModal } = useModal();
  const { applications, setApplications } = useApplications();
  const { business } = useBusiness();
  const { fellows } = useFellows();
  const { jobListings } = useJobListings();
  const [selectedListing, setSelectedListing] = useState("");
  const [secondaryColorArray, setSecondaryColorArray] = useState<
    CurrentSchemeType[]
  >([]);

  const currentListings = jobListings?.filter(
    (listing) => listing?.job?.businessId === business?.id,
  );

  const currentApps = applications
    ?.filter((app: any) => app.businessId === business?.id && app.mail)
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
    const applicant = fellows?.find((fellow) => fellow.id === id);
    return applicant ? applicant.name : "Unknown";
  };

  const expandListingMessages = (id: any) => {
    if (selectedListing === id) {
      setSelectedListing("");
    } else {
      setSelectedListing(id);
    }
  };

  // const findAppMailNumber = (id: any) => {
  //   const currentApp = currentApps?.find((app) => app.jobId === id);
  //   console.log(currentApp?.mail?.length);
  // };

  const renderRelevantMessages = () => {
    const selectedApps = currentApps?.filter(
      (app) => app.jobId === selectedListing,
    );
    const appsWithMail = selectedApps?.filter(
      (app) => app.mail && app.mail.length > 0,
    );

    return appsWithMail?.map((app: any, index: number) => {
      console.log(app);
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
            onClick={() => showMessages(app.id)}
            isSelected={activeApp === app.id}
          >
            <p className="ApplicantName w-[50%] overflow-hidden truncate text-left text-[0.8rem]">
              {findApplicantName(app.applicant)}
            </p>
            <p className="Details"> {app.mail.length || 0} total | 1 new</p>
          </SiteButton>
        </div>
      );
    });
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setSecondaryColorArray);
    setCurrentMessages(currentApps);
  }, [currentApps, setCurrentMessages]);

  return (
    <div className="MessageListGroup flex flex-col gap-4">
      {currentListings?.map((job: any, index: any) => {
        const currentApp = currentApps?.find((app) => app.jobId === job.jobId);
        return (
          <div key={index} className="ListingGroup flex flex-col gap-3">
            <SiteButton
              variant="hollow"
              // size="medium"
              aria="current job listings with mail"
              addClasses="w-[30vw] flex justify-between py-3"
              colorScheme={
                colorArray[index % colorArray.length] as ButtonColorOption
              }
              onClick={() => expandListingMessages(job.jobId)}
              isSelected={selectedListing === job.jobId}
            >
              <p className="Title w-[50%] overflow-hidden truncate text-left text-[.9rem]">
                {job.job.jobTitle}
              </p>

              <p className="Details">
                | {currentApp?.mail?.length || 0} active messages
              </p>
            </SiteButton>
            {selectedListing === job.jobId && renderRelevantMessages()}
          </div>
        );
      })}
    </div>
  );
};

export { RenderBusinessMessageList };
