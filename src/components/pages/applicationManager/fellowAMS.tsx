"use client";

import { useEffect, useState } from "react";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useModal } from "@/contexts/ModalContext";
import { useApplications } from "@/contexts/ApplicationsContext";
import { capitalizeFirstLetter } from "@/utils/textUtils";
import { Job } from "@/contexts/JobContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useAppointments } from "@/contexts/AppointmentsContext";
import { useRouter } from "next/navigation";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useFellow } from "@/contexts/FellowContext";

import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
import InfoBox from "@/components/informationDisplayComponents/infoBox";
import AddHandler from "@/components/handlers/addHandler";
import DeleteHandler from "@/components/handlers/deleteHandler";
import TieredButtonOptionsComponent from "@/components/buttonsAndLabels/tieredButtonOptionsComponent";
import SiteButton from "@/components/buttonsAndLabels/siteButton";
import Application from "@/components/amsComponents/applicationComponent";
import Image from "next/image";
import ApplicationDetailsModal from "@/components/modals/appointmentModals/appointmentDetailsModal";
import RetractionConfirmationModal from "@/components/modals/applicationModals/retractApplicationModal";

export default function FellowAMS() {
  const router = useRouter();

  const { textColor } = useColorOptions();
  const { showModal, hideModal } = useModal();
  const { applications, setApplications } = useApplications();
  const { appointments } = useAppointments();
  const { jobListings, setJobListings } = useJobListings();
  const { fellow } = useFellow();

  const [colorArray, setColorArray] = useState<[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [appStatus, setAppStatus] = useState<string[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [filteredApps, setFilteredApps] = useState<string[]>([]);
  const [currentJob, setCurrentJob] = useState<Job | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState("");
  const [altViewChoice, setAltViewChoice] = useState("");
  const [clickedButton, setClickedButton] = useState("");

  const currentApp = applications?.find((app: any) => {
    return app.id === selectedApps;
  });

  const currentAppointment = appointments?.find((app: any) => {
    return app.jobId === currentApp?.jobListing?.id;
  });

  const selectedJob = jobListings?.find(
    (job: any) => job.jobId === currentApp?.jobListing?.id,
  )?.job;

  const activeApps = applications?.filter((app: any) => {
    return app.status !== "closed";
  });

  const retract = () => {
    setClickedButton("retract");
    showModal(
      <RetractionConfirmationModal
        continueRetract={continueRetract}
        // find job title here
        jobTitle={currentJob?.jobTitle}
        business={currentJob?.business?.name}
        setClickedButton={setClickedButton}
      />,
    );
  };

  const continueRetract = () => {
    // close the selected Application/Job Details
    setSelectedApps([]);
    setCurrentJob(undefined);
    // remove the job from the applications object
    // on the front-end only, we might need to remove it from the job applications list?
    // when we're working with the database, we probably won't need to, since we'll be editing the nested structure inside the jobId
    // and it'll change in both locations
    const updatedApplications = applications?.filter(
      (app) => app.id !== currentApp?.id,
    );
    // I won't worry about updating the jobListing's array of "applications", since that'll happen automatically when we're using the database.
    setApplications(updatedApplications || []);
    hideModal();
  };

  const filterApps = (applications: any) => {
    const filteredApps = applications.filter((app: any) => {
      const matchesStatus =
        appStatus.length > 0 ? appStatus.includes(app.status) : true;

      return matchesStatus;
    });

    setFilteredApps(filteredApps);
  };

  const getMonthName = (month: any) => {
    const d = new Date();
    d.setMonth(month);
    const monthName = d.toLocaleString("default", { month: "long" });
    return monthName;
  };

  const closeJobDetails = () => {
    setCurrentJob(undefined);
    setSelectedApps([]);
  };

  const viewCompanyDetails = () => {
    // router.push(`/profile/${currentApp?.businessId}`);
  };

  const goToMessages = () => {
    setClickedButton("goToMessages");
    router.push(`/messages/${currentApp?.id}`);
  };

  const goToCalendar = () => {
    router.push(`/calendar`);
  };

  const calendarClick = () => {
    if (altViewChoice === "calendar") {
      setAltViewChoice("");
    } else {
      setAltViewChoice("calendar");
    }
  };

  const renderApplications = () => {
    if (appStatus.length > 0) {
      return filteredApps
        ?.slice()
        .reverse()
        .map((app: any, index: number) => (
          <Application
            app={app}
            key={app.id}
            id={app.id}
            colorArray={colorArray}
            index={index}
            jobId={app.jobId}
            dateOfApp={app.dateOfApp}
            appStatus={app.appStatus}
            selectedApps={selectedApps}
            setCurrentJob={setCurrentJob}
            currentJob={currentJob}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            setSelectedColor={setSelectedColor}
            viewCompanyDetails={viewCompanyDetails}
          />
        ));
    } else {
      return activeApps
        ?.slice()
        .reverse()
        .map((app: any, index: number) => (
          <Application
            app={app}
            key={app.id}
            id={app.id}
            colorArray={colorArray}
            index={index}
            jobId={app.jobListing.id}
            dateOfApp={app.dateOfApp}
            appStatus={app.status}
            selectedApps={selectedApps}
            setCurrentJob={setCurrentJob}
            handleAdd={handleAdd}
            currentJob={currentJob}
            handleDelete={handleDelete}
            setSelectedColor={setSelectedColor}
            viewCompanyDetails={viewCompanyDetails}
          />
        ));
    }
  };

  // handlers for adding, updating, and deleting details
  const handleAdd = (
    type: "filters" | "appStatus" | "selectedApps" | "altViewChoice",
    data: any,
  ) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        filters: setFilters,
        appStatus: setAppStatus,
        selectedApps: setSelectedApps,
        altViewChoice: setAltViewChoice,
      },
      oneChoice: {
        filters: false,
        appStatus: true,
        selectedApps: true,
        altViewChoice: true,
      },
    });
  };

  const handleDelete = (
    type: "filters" | "appStatus" | "selectedApps" | "altViewChoice",
    id: any,
  ) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        filters: setFilters,
        appStatus: setAppStatus,
        selectedApps: setSelectedApps,
        altViewChoice: setAltViewChoice,
      },
    });
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
  }, []);

  // use filters
  useEffect(() => {
    if (filters.length > 0) {
      filterApps(applications);
      // these were deselecting the selected apps and removing the currentJob with any active filter
      // setSelectedApps([]);
      // setCurrentJob(undefined);
    }
  }, [applications, filters, appStatus, filterApps]);

  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  return (
    <div
      className={`FellowAMSPage flex ${!currentJob ? "flex-col" : ""} -mt-6 w-[84%] items-center gap-8 self-center ${textColor} max-w-[1600px]`}
    >
      {applications?.length === 0 ? (
        <p className="ApplyPrompt mt-[20vh] max-w-[50vw] text-center align-middle italic text-olive">
          {`It looks like you don't have any active applications. Take a look
          through our Job Board and see if there's a position you'd like to
          apply for!`}
        </p>
      ) : (
        <div className="AMSContainer flex w-full">
          <div className="ApplicationList flex w-full flex-col gap-4">
            <div className="ButtonsAndTitle flex w-full flex-col justify-between pt-6">
              <h1 className="AMSTitle mr-8 text-right">Your Applications</h1>
              <p className="Subtitle -mb-8 mr-8 text-right italic text-olive">
                {activeApps?.length} active | {applications?.length} total
              </p>

              {/* application status filter */}
              <div className="FilterButtons max-w[100%] -mb-8 flex flex-wrap items-center">
                <TieredButtonOptionsComponent
                  type="filters"
                  selectedArray={filters}
                  setArray={setFilters}
                  addClasses="flex-wrap mb-2"
                  buttons={[
                    {
                      title:
                        appStatus.length > 1
                          ? `status: ${appStatus}`
                          : "application status",
                      initialTitle: "application status",
                      type: "appStatus",
                      array: appStatus,
                      options: [
                        "submitted",
                        "viewed",
                        "stage 1",
                        "stage 2",
                        "stage 3",
                        "offer",
                        "closed",
                      ],
                    },
                  ]}
                  horizontalSecondaryButtons
                  handleAdd={handleAdd}
                  handleDelete={handleDelete}
                  secondaryButtonClasses="mt-1 justify-start flex-wrap -mb-4"
                />
              </div>
            </div>
            <div className="JobApplications flex w-full flex-col justify-between gap-6 pt-3">
              <div
                className={`Applications ${currentJob ? "-mt-2 h-[25.5rem]" : "-mt-4 h-[26rem]"} flex w-full flex-col gap-4 overflow-x-auto overflow-y-visible p-4`}
              >
                {renderApplications()}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentJob && (
        <div className="ApplicationInfo flex flex-col justify-center">
          <InfoBox
            aria="amsAppInfo"
            variant={currentJob ? "filled" : "hollow"}
            width="small"
            addClasses="flex flex-col"
            colorScheme={selectedColor as ButtonColorOption | "a1"}
          >
            <div className="CloseButton -mr-8 -mt-8 self-end">
              <Image
                src="/cream-close-button.svg"
                alt="closeDetails"
                width={20}
                height={20}
                className="m-0 opacity-80 hover:cursor-pointer"
                onClick={closeJobDetails}
              ></Image>
            </div>
            <div className="JobDetails flex flex-col gap-1 pt-6 text-center">
              <h2 className="JobTitle mb-1">{currentJob?.jobTitle}</h2>
              <p className="BusinessName font-medium italic">
                with {currentJob?.business?.name}
              </p>
              {currentJob.experienceLevel !== null &&
                currentJob.experienceLevel !== undefined && (
                  <p className="ExperienceLevel text-sm font-normal">
                    {capitalizeFirstLetter(
                      currentJob.experienceLevel[0] || "junior",
                    )}{" "}
                    Level
                  </p>
                )}

              <Image
                src="/listing-divider.svg"
                alt="listingDivider"
                width={240}
                height={0}
                className="my-4 opacity-80"
              ></Image>
              {currentJob?.locationOption === "remote" && (
                <p className="LocationOption">100% Remote</p>
              )}
              {currentJob?.locationOption === "on-site" && (
                <p className="LocationOption">
                  On-Site: {currentJob?.city}, {currentJob?.state}
                </p>
              )}
              {currentJob?.locationOption === "hybrid" && (
                <p className="LocationOption">Hybrid</p>
              )}
              <p className="PositionType font-normal italic">
                {capitalizeFirstLetter(currentJob?.positionType || "")} Position
              </p>
              <p className="PayDetails">
                ${new Intl.NumberFormat().format(currentJob?.payscaleMin ?? 0)}{" "}
                - $
                {new Intl.NumberFormat().format(currentJob?.payscaleMax ?? 0)}{" "}
                {capitalizeFirstLetter(currentJob?.payOption || "")}
              </p>
            </div>
          </InfoBox>
          {currentApp && currentApp.appointments && (
            <div className="AppointmentDetails -mb-3 mt-4 flex justify-center">
              <SiteButton
                variant="hollow"
                aria="currentJobAppointmentDetails"
                size="wide"
                colorScheme={selectedColor as ButtonColorOption | "a1"}
                onClick={() =>
                  showModal(
                    <ApplicationDetailsModal app={currentAppointment} />,
                  )
                }
              >
                appointment:{" "}
                {getMonthName(
                  currentApp?.appointments?.[0]?.interviewDate?.month,
                )}{" "}
                {currentApp?.appointments?.[0]?.interviewDate?.day} -{" "}
                {currentApp?.appointments?.[0]?.interviewTime}
              </SiteButton>
            </div>
          )}
          <div className="ButtonOptions ml-4 mt-6 flex flex-wrap items-end justify-end gap-4">
            {/* <SiteButton
              variant="hollow"
              colorScheme="b3"
              aria="calendar"
              onClick={goToCalendar}
              isSelected={altViewChoice === "calendar"}
            >
              go to calendar
            </SiteButton> */}
            <SiteButton
              variant="hollow"
              colorScheme="f5"
              aria="message"
              onClick={goToMessages}
              isSelected={clickedButton === "goToMessages"}
            >
              {clickedButton === "goToMessages"
                ? "going to messages..."
                : "messages"}
            </SiteButton>
            <SiteButton
              variant="hollow"
              colorScheme="d3"
              aria="retract"
              onClick={retract}
              isSelected={clickedButton === "retract"}
            >
              {clickedButton === "retract" ? "retracting..." : "retract"}
            </SiteButton>
          </div>
        </div>
      )}
    </div>
  );
}
