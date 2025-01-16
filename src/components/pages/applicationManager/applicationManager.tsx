"use client";

import { useEffect, useState } from "react";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useModal } from "@/contexts/ModalContext";
import { useApplications } from "@/contexts/ApplicationsContext";
import { useAppointments } from "@/contexts/AppointmentsContext";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/contexts/BusinessContext";
import { useJobListings } from "@/contexts/JobListingsContext";

import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
import AddHandler from "@/components/handlers/addHandler";
import DeleteHandler from "@/components/handlers/deleteHandler";
import TieredButtonOptionsComponent from "@/components/buttonsAndLabels/tieredButtonOptionsComponent";
import Application from "@/components/amsComponents/applicationComponent";
import ButtonOptionsComponent from "@/components/buttonsAndLabels/buttonOptionsComponent";
import CalendarComp from "@/components/calendar";
import BusinessApplication from "@/components/amsComponents/businessApplicationComponent";
import JobListing from "../jobListing/jobListing";
import RejectionMessageOptionsComponent from "@/components/amsComponents/rejectionMessageOptions";

export default function ApplicationManager({ jobId }: any) {
  const router = useRouter();

  const { jobListings } = useJobListings();
  const { textColor } = useColorOptions();
  const { showModal, hideModal } = useModal();
  const { applications } = useApplications();
  const { appointments } = useAppointments();
  const { business } = useBusiness();

  const [colorArray, setColorArray] = useState<[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [appStatus, setAppStatus] = useState<string[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [altViewChoice, setAltViewChoice] = useState("");
  const [filteredApps, setFilteredApps] = useState<string[]>([]);
  const [appIsBeingDeleted, setAppIsBeingDeleted] = useState(true);

  const currentJob = jobListings?.find((job: any) => job.jobId === jobId)?.job;
  const currentApp = applications?.find((app: any) => {
    return app.id === selectedApps;
  });

  let currentApplications: any = [];
  const relevantApps = applications?.filter(
    (application: any) => application.jobId === jobId,
  );
  if (relevantApps) {
    currentApplications.push(...relevantApps);
  }

  const activeApps: any = currentApplications.filter((app: any) => {
    return app.appStatus !== "closed";
  });

  const currentAppointment = appointments?.find((app: any) => {
    return app.jobId === currentApp?.jobId;
  });

  const retract = () => {
    if (selectedApps.length > 0) {
      console.log("need to retract these applications:", selectedApps);
      // remove the selectedApps from the applications list and retract the applications
      // we can only do this after a confirmation modal has been successful
    } else {
      return;
    }
  };

  const filterApps = (applications: any) => {
    const filteredApps = applications.filter((app: any) => {
      const matchesStatus =
        appStatus.length > 0 ? appStatus.includes(app.appStatus) : true;

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
    // setCurrentJob(undefined);
    setSelectedApps([]);
  };

  const viewCompanyDetails = () => {
    router.push(`/profile/${currentApp?.businessId}`);
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
          <BusinessApplication
            key={app.id}
            id={app.id}
            colorArray={colorArray}
            index={index}
            app={app}
            jobId={app.jobId}
            dateOfApp={app.dateOfApp}
            appStatus={app.appStatus}
          />
        ));
    } else {
      return activeApps
        ?.slice()
        .reverse()
        .map((app: any, index: number) => (
          <BusinessApplication
            key={app.id}
            id={app.id}
            colorArray={colorArray}
            index={index}
            app={app}
            jobId={app.jobId}
            dateOfApp={app.dateOfApp}
            appStatus={app.appStatus}
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
      setSelectedApps([]);
      // setCurrentJob(undefined);
    }
  }, [filters, appStatus, applications]);

  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  return (
    <div
      className={`ApplicationManagerPage w-[84%] self-center ${textColor} -mt-8 max-w-[1600px]`}
    >
      {
        <div className="AMSContainer flex">
          <div className="AMSTabOptions -mt-2 max-w-[10%] gap-4">
            <ButtonOptionsComponent
              handleAdd={handleAdd}
              handleDelete={handleDelete}
              type="altViewChoice"
              selectedArray={altViewChoice}
              classesForButtons="-rotate-90"
              buttons={
                altViewChoice === "details"
                  ? ["calendar", "messages", "details", "ams"]
                  : ["calendar", "messages", "details"]
              }
              buttonContainerClasses="flex-col gap-28 -mx-14 mt-24"
              buttonSize="horizontal"
            />
          </div>
          {altViewChoice === "calendar" && <CalendarComp addClasses="ml-10" />}
          {altViewChoice === "messages" && (
            <div className="Messages">Messages Here</div>
          )}
          {altViewChoice === "details" && (
            <div className="Details flex w-full flex-col items-center gap-4">
              <div className="JobDetails">
                <JobListing isOwn hasId id={jobId} inAms />
              </div>
            </div>
          )}

          {(altViewChoice === "" ||
            altViewChoice.length == 0 ||
            altViewChoice === "ams") && (
            <div className="ApplicationList flex w-full flex-col items-center gap-4">
              <div className="ButtonsAndTitle flex w-full flex-col justify-between">
                <div className="TitleSubtitle -mb-8 mr-8 text-right">
                  <button onClick={() => setAltViewChoice("details")}>
                    <h1 className="Title">{currentJob?.jobTitle}</h1>
                  </button>
                  <p className="Subtitle text-medium italic text-emerald">
                    Round {currentJob?.roundNumber || 1}:{" "}
                    {currentJob?.applications?.length} Applications
                  </p>
                  <p className="activeClosedInfo mt-1 text-sm italic text-olive">
                    {activeApps.length} active &{" "}
                    {Number(currentJob?.applications?.length) -
                      Number(activeApps.length)}{" "}
                    closed
                  </p>
                </div>

                {/* application status filter */}
                <div className="FilterButtons max-w[100%] -mb-8 ml-6 flex flex-wrap items-center">
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
              <div
                className={`Applications ml-8 flex h-[26rem] flex-col gap-4 overflow-x-hidden overflow-y-visible p-4`}
              >
                {renderApplications()}
              </div>
            </div>
          )}
        </div>
      }
    </div>
  );
}
