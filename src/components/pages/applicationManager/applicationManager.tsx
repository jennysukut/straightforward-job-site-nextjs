"use client";

import { useEffect, useState, useCallback } from "react";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useModal } from "@/contexts/ModalContext";
import { useApplications } from "@/contexts/ApplicationsContext";
import { useAppointments } from "@/contexts/AppointmentsContext";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/contexts/BusinessContext";
import { useJobListings } from "@/contexts/JobListingsContext";
import { debounce } from "lodash";

import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
import AddHandler from "@/components/handlers/addHandler";
import DeleteHandler from "@/components/handlers/deleteHandler";
import TieredButtonOptionsComponent from "@/components/buttonsAndLabels/tieredButtonOptionsComponent";
import BusinessApplication from "@/components/amsComponents/businessApplicationComponent";
import JobListing from "../jobListing/jobListing";

export default function ApplicationManager({ jobId }: any) {
  const router = useRouter();

  const { jobListings } = useJobListings();
  const { textColor } = useColorOptions();
  const { showModal, hideModal } = useModal();
  const { applications } = useApplications();
  const { appointments } = useAppointments();

  const [colorArray, setColorArray] = useState<[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [appStatus, setAppStatus] = useState<string[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [altViewChoice, setAltViewChoice] = useState("");
  const [filteredApps, setFilteredApps] = useState<string[]>([]);

  // define relevant details
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

  // filtering and rendering functions
  const filterApps = (applications: any) => {
    const filteredApps = applications.filter((app: any) => {
      const matchesStatus =
        appStatus.length > 0 ? appStatus.includes(app.appStatus) : true;

      return matchesStatus;
    });

    setFilteredApps(filteredApps);
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

  // useEffects for filters and setting colors

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
  }, []);

  // use filters
  useEffect(() => {
    console.log("using the filters useEffect in the ams");
    if (filters.length > 0) {
      filterApps(applications);
      setSelectedApps([]);
    }
  }, [appStatus, applications]);

  return (
    <div
      className={`ApplicationManagerPage w-[84%] self-center ${textColor} -mt-8 max-w-[1600px]`}
    >
      {
        <div className="AMSContainer flex">
          {" "}
          {altViewChoice === "details" && (
            <div className="Details flex w-full flex-col items-center gap-4">
              <div className="JobDetails">
                <JobListing
                  isOwn
                  hasId
                  id={jobId}
                  inAms
                  setAltViewChoice={setAltViewChoice}
                />
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
                    {currentApplications.length} Applications
                  </p>
                  <p className="activeClosedInfo mt-1 text-sm italic text-olive">
                    {activeApps.length} active &{" "}
                    {Number(currentApplications.length) -
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
                className={`Applications flex flex-col gap-4 overflow-x-hidden overflow-y-visible p-4`}
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
