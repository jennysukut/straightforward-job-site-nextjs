"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useFellow } from "@/contexts/FellowContext";
import { useModal } from "@/contexts/ModalContext";
import { JobListing } from "@/contexts/JobListingsContext";
import { useApplications } from "@/contexts/ApplicationsContext";

import ShuffleIdealButtonPattern from "@/components/shuffleIdealButtonPattern";
import InfoBox from "@/components/infoBox";
import AddHandler from "@/components/addHandler";
import DeleteHandler from "@/components/deleteHandler";
import TieredButtonOptionsComponent from "@/components/tieredButtonOptionsComponent";
import SiteButton from "@/components/siteButton";
import Application from "@/components/applicationComponent";

export default function FellowAMS() {
  const { accountType } = usePageContext();
  const { fellow, setFellow } = useFellow();
  const { textColor, inputColors } = useColorOptions();
  const { hideModal } = useModal();
  const { applications } = useApplications();

  const [colorArray, setColorArray] = useState<[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([]);
  const [appOptions, setAppOptions] = useState<string[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [appStatus, setAppStatus] = useState<string[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [viewClosedJobs, setViewClosedJobs] = useState<boolean>(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const filterSearch = (jobs: any) => {
    const filteredJobs = jobs.filter((job: any) => {
      const matchesStatus =
        appStatus.length > 0
          ? appStatus.includes(job.job?.experienceLevel || "")
          : true;

      return matchesStatus;
    });

    setFilteredJobs(filteredJobs);
  };

  const retract = () => {
    if (selectedApps.length > 0) {
      console.log("need to retract these applications:", selectedApps);
      // remove the selectedApps from the applications list and retract the applications
      // we can only do this after a confirmation modal has been successful
    } else {
      return;
    }
  };

  useEffect(() => {
    // if (filters.length > 0 || country.length > 0) {
    //     filterSearch(matches);
    //   } else {
    //     setFilteredJobs(matches);
    //   }
    // } else if (filters.length > 0) {
    //   filterSearch(jobListings);
    // } else if (country.length > 0) {
    //   filterSearch(jobListings);
    // } else {
    //   setFilteredJobs([]);
    // }
  }, [filters, appStatus]);

  // handlers for adding, updating, and deleting details
  const handleAdd = (
    type: "filters" | "appStatus" | "selectedApps",
    data: any,
  ) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        filters: setFilters,
        appStatus: setAppStatus,
        selectedApps: setSelectedApps,
      },
      oneChoice: {
        filters: false,
        appStatus: true,
        selectedApps: false,
      },
    });
  };

  const handleDelete = (
    type: "filters" | "appStatus" | "selectedApps",
    id: any,
  ) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        filters: setFilters,
        appStatus: setAppStatus,
        selectedApps: setSelectedApps,
      },
    });
  };

  // const renderJobApplications = () => {
  //   const activeApps = jobListings?.filter((job: any) => {
  //     return job.job?.numberOfApps !== job.job?.applicationLimit;
  //   });

  //   const closedApps = jobListings?.filter((job: any) => {
  //     return job.job?.numberOfApps === job.job?.applicationLimit;
  //   });

  //   const filteredActiveJobListings = filteredJobs?.filter((job: any) => {
  //     return job.job?.numberOfApps !== job.job?.applicationLimit;
  //   });

  //   const filteredPendingJobListings = filteredJobs?.filter((job: any) => {
  //     return job.job?.numberOfApps === job.job?.applicationLimit;
  //   });

  //   if (inputValue.length < 3 && filters.length === 0 && !viewClosedJobs) {
  //     return activeJobListings?.map((job: any, index: number) => (
  //       <JobPost
  //         job={job}
  //         index={index}
  //         colorArray={colorArray}
  //         key={job.jobId}
  //         saveClick={() => saveClick(job.jobId)}
  //       />
  //     ));
  //   } else if (
  //     inputValue.length < 3 &&
  //     filters.length === 0 &&
  //     viewClosedJobs
  //   ) {
  //     return pendingJobListings?.map((job: any, index: number) => (
  //       <JobPost
  //         job={job}
  //         index={index}
  //         colorArray={colorArray}
  //         key={job.jobId}
  //         saveClick={() => saveClick(job.jobId)}
  //       />
  //     ));
  //   } else if (filters.length > 0 && !viewClosedJobs) {
  //     console.log("trying to show filtered jobs", filteredActiveJobListings);
  //     return filteredActiveJobListings?.map((job: any, index: number) => (
  //       <JobPost
  //         job={job}
  //         index={index}
  //         colorArray={colorArray}
  //         key={job.jobId}
  //         saveClick={() => saveClick(job.jobId)}
  //       />
  //     ));
  //   } else if (filters.length > 0 && viewClosedJobs) {
  //     return filteredPendingJobListings?.map((job: any, index: number) => (
  //       <JobPost
  //         job={job}
  //         index={index}
  //         colorArray={colorArray}
  //         key={job.jobId}
  //         saveClick={() => saveClick(job.jobId)}
  //       />
  //     ));
  //   } else if (viewClosedJobs) {
  //     return filteredPendingJobListings?.map((job: any, index: number) => (
  //       <JobPost
  //         job={job}
  //         index={index}
  //         colorArray={colorArray}
  //         key={job.jobId}
  //         saveClick={() => saveClick(job.jobId)}
  //       />
  //     ));
  //   } else {
  //     return filteredActiveJobListings?.map((job: any, index: number) => (
  //       <JobPost
  //         job={job}
  //         index={index}
  //         colorArray={colorArray}
  //         key={job.jobId}
  //         saveClick={() => saveClick(job.jobId)}
  //       />
  //     ));
  //   }
  // };

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  return (
    <div
      className={`JobBoardPage flex flex-grow flex-col items-center gap-8 self-center ${textColor} w-[84%] max-w-[1600px]`}
    >
      <div className="ButtonsAndTitle flex w-full justify-between">
        {/* application status */}
        <div className="FilterButtons -mb-8 ml-4 flex items-center">
          <TieredButtonOptionsComponent
            type="filters"
            selectedArray={filters}
            setArray={setFilters}
            buttons={[
              {
                title:
                  appStatus.length > 1
                    ? `status: ${appStatus}`
                    : "application status",
                type: "appStatus",
                array: appStatus,
                options: [
                  "unopened",
                  "viewed",
                  "stage 1",
                  "stage 2",
                  "stage 3",
                  "offer",
                ],
              },
            ]}
            horizontalSecondaryButtons
            handleAdd={handleAdd}
            handleDelete={handleDelete}
          />
          {/* <SiteButton
            colorScheme="d6"
            variant="hollow"
            aria="viewClosedJobs"
            isSelected={filters.includes("appStatus")}
            onClick={() => setFilters(["appStatus"])}
          >
            application status
          </SiteButton> */}
        </div>
        <h1 className="AMSTitle">Your Applications</h1>
      </div>

      <div className="JobApplications flex w-full flex-wrap gap-6">
        {applications?.map((app: any, index: number) => {
          return (
            <Application
              key={app.id}
              id={app.id}
              colorArray={colorArray}
              index={index}
              business={app.business}
              jobId={app.jobId}
              dateOfApp={app.dateOfApp}
              appStatus={app.appStatus}
              selectedApps={selectedApps}
              handleAdd={handleAdd}
              handleDelete={handleDelete}
              appOptions={appOptions}
            />
          );
        })}
      </div>
    </div>
  );
}
