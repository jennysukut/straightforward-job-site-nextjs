"use client";

import { useEffect, useState, useCallback } from "react";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useModal } from "@/contexts/ModalContext";
import { useAppointments } from "@/contexts/AppointmentsContext";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/contexts/BusinessContext";
import { useJob } from "@/contexts/JobContext";
import { useQuery } from "@apollo/client";
import { GET_JOB_LISTING_BY_ID } from "@/graphql/queries";
import { Job } from "@/contexts/JobContext";

import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
import AddHandler from "@/components/handlers/addHandler";
import DeleteHandler from "@/components/handlers/deleteHandler";
import TieredButtonOptionsComponent from "@/components/buttonsAndLabels/tieredButtonOptionsComponent";
import BusinessApplication from "@/components/amsComponents/businessApplicationComponent";
import JobListing from "../jobListing/jobListing";

export default function ApplicationManager({ jobId }: any) {
  const router = useRouter();

  const { textColor } = useColorOptions();
  const { showModal, hideModal } = useModal();
  const { appointments } = useAppointments();
  const { job } = useJob();

  const [colorArray, setColorArray] = useState<[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [appStatus, setAppStatus] = useState<string[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [altViewChoice, setAltViewChoice] = useState("");
  const [filteredApps, setFilteredApps] = useState<string[]>([]);
  const [currentJob, setCurrentJob] = useState({} as Job);
  const [loadingData, setLoadingData] = useState(true);
  const [currentApplications, setCurrentApplications] = useState([]);

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(GET_JOB_LISTING_BY_ID, {
    variables: { id: jobId },
    // skip: !isLoggedIn,
    onCompleted: (data) => {
      setCurrentJob(data.jobListing);
      setLoadingData(false);
      setCurrentApplications(data.jobListing.applications);
    },
  });

  const currentApp = currentApplications?.find((app: any) => {
    return app.id === selectedApps;
  });

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
            currentApplicant={app.fellow}
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
            currentApplicant={app.fellow}
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
    if (filters.length > 0) {
      filterApps(currentApplications);
      setSelectedApps([]);
    }
  }, [filters, filterApps, appStatus, currentApplications]);

  return (
    <div
      className={`ApplicationManagerPage w-[85%] self-center ${textColor} -mt-8 max-w-[1600px]`}
    >
      {loadingData ? (
        <div className="LoadingScreen flex h-[80vh] justify-center align-middle">
          <div className="LoadingText text-center text-olive">Loading...</div>
        </div>
      ) : (
        <div className="AMSContainer flex">
          <div className="ApplicationList flex w-full flex-col items-center gap-4">
            <div className="ButtonsAndTitle flex w-full flex-col justify-between">
              <div className="TitleSubtitle -mb-8 mr-8 text-right">
                <button onClick={() => router.push(`/listing/${jobId}`)}>
                  <h1 className="Title pb-1">{currentJob?.jobTitle}</h1>
                </button>
                <p className="Subtitle text-medium italic text-emerald">
                  Round {currentJob?.roundNumber || 1}:{" "}
                  {currentApplications.length} Applications
                </p>
                {currentApplications.length > 0 && (
                  <p className="activeClosedInfo mt-1 text-sm italic text-olive">
                    {activeApps.length} active &{" "}
                    {Number(currentApplications.length) -
                      Number(activeApps.length)}{" "}
                    closed
                  </p>
                )}
                {/* <p className="activeClosedInfo mt-1 text-sm italic text-olive">
                  {activeApps.length} active &{" "}
                  {Number(currentApplications.length) -
                    Number(activeApps.length)}{" "}
                  closed
                </p> */}
              </div>

              {/* application status filter */}
              {currentApplications.length >= 1 && (
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
              )}
            </div>
            <div
              className={`Applications flex flex-col gap-4 overflow-x-hidden overflow-y-visible p-4`}
            >
              {currentApplications.length <= 0 ? (
                <p className="NoApplications mt-28 self-center align-middle italic text-olive">
                  There are no current applications for this job post.
                </p>
              ) : (
                renderApplications()
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
