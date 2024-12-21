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
  const handleAdd = (type: "filters" | "appStatus", data: any) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        filters: setFilters,
        appStatus: setAppStatus,
      },
      oneChoice: {
        filters: false,
        appStatus: true,
      },
    });
  };

  const handleDelete = (type: "filters" | "appStatus", id: any) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        filters: setFilters,
        appStatus: setAppStatus,
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

  return (
    <div
      className={`JobBoardPage flex flex-grow flex-col items-center gap-8 self-center ${textColor} w-[84%] max-w-[1600px]`}
    >
      <div className="ButtonsAndTitle flex w-full justify-between">
        {/* application status */}
        <div className="FilterButtons flex items-center gap-4">
          <TieredButtonOptionsComponent
            type="filters"
            buttons={[
              {
                title: appStatus.length > 1 ? appStatus : "application status",
                type: "appStatus",
                array: appStatus,
                options: ["entry-level", "junior", "senior"],
              },
            ]}
            selectedArray={filters}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            classesForButtons="px-6"
            setArray={setFilters}
            horizontalSecondaryButtons
          />
          <div className="OtherButtons flex gap-4 self-start">
            {/* view closed jobs */}
            <SiteButton
              colorScheme="b1"
              variant="hollow"
              aria="viewClosedJobs"
              onClick={() => setViewClosedJobs(!viewClosedJobs)}
              isSelected={viewClosedJobs}
            >
              {viewClosedJobs === true ? "view open jobs" : "view closed jobs"}
            </SiteButton>

            {/* retract button */}
            <SiteButton
              colorScheme="d6"
              variant="hollow"
              aria="viewClosedJobs"
              // onClick={() => setViewClosedJobs(!viewClosedJobs)}
              // isSelected={viewClosedJobs}
            >
              retract
            </SiteButton>
          </div>
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
            />
          );
        })}
      </div>
    </div>
  );
}
