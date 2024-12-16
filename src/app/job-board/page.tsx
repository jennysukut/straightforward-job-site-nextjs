"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useJobListings } from "@/contexts/JobListingsContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useFellow } from "@/contexts/FellowContext";
import { useModal } from "@/contexts/ModalContext";
import { countries } from "@/lib/countriesList";

import ShuffleIdealButtonPattern from "@/components/shuffleIdealButtonPattern";
import JobPost from "@/components/jobPostComponent";
import InfoBox from "@/components/infoBox";
import SiteButton from "@/components/siteButton";
import ButtonOptionsComponent from "@/components/buttonOptionsComponent";
import AddHandler from "@/components/addHandler";
import DeleteHandler from "@/components/deleteHandler";
import TieredButtonOptionsComponent from "@/components/tieredButtonOptionsComponent";
import InputComponentWithLabelOptions from "@/components/inputComponentWithLabelOptions";
import { JobListing } from "@/contexts/JobListingsContext";

export default function JobBoard() {
  const { accountType } = usePageContext();
  const { fellow, setFellow } = useFellow();
  const { textColor, inputColors } = useColorOptions();
  const { jobListings } = useJobListings();
  const { hideModal } = useModal();

  const [colorArray, setColorArray] = useState<[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([]);

  const [filters, setFilters] = useState<string[]>([]);
  const [level, setLevel] = useState<string[]>([]);
  const [pay, setPay] = useState<string[]>([]);
  const [locationType, setLocationType] = useState<string[]>([]);
  const [positionType, setPositionType] = useState<string[]>([]);
  const [location, setLocation] = useState<string[]>([]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const filterSearch = (jobs: any) => {
    const filteredJobs = jobs.filter((job: any) => {
      const matchesExperience =
        level.length > 0
          ? level.includes(job.job?.experienceLevel || "")
          : true;
      const matchesLocationType =
        locationType.length > 0
          ? locationType.includes(job.job?.locationOption || "")
          : true;
      const matchesPositionType =
        positionType.length > 0
          ? positionType.includes(job.job?.positionType || "")
          : true;

      return matchesExperience && matchesLocationType && matchesPositionType;
    });

    setFilteredJobs(filteredJobs);
  };

  useEffect(() => {
    if (inputValue.length >= 3) {
      const matches =
        jobListings
          ?.filter((job) =>
            job.job?.jobTitle?.toLowerCase().includes(inputValue.toLowerCase()),
          )
          ?.map((job) => ({
            jobId: String(job.jobId), // Convert jobId to string
            job: job.job,
          }))
          .map((job) => ({
            ...job,
            jobId: parseInt(job.jobId, 10), // Convert jobId back to number
          })) || [];
      console.log("search matches:", matches);

      if (filters.length > 0) {
        filterSearch(matches);
      } else {
        setFilteredJobs(matches);
      }
    } else if (filters.length > 0) {
      filterSearch(jobListings);
      console.log("filtering general jobs");
    } else {
      setFilteredJobs([]);
    }
  }, [inputValue, filters, positionType, level, pay, location, locationType]);

  console.log(filteredJobs);

  // handlers for adding, updating, and deleting details
  const handleAdd = (
    type:
      | "filters"
      | "level"
      | "pay"
      | "locationType"
      | "positionType"
      | "country",
    data: any,
  ) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        filters: setFilters,
        level: setLevel,
        pay: setPay,
        locationType: setLocationType,
        positionType: setPositionType,
        country: setLocation,
      },
      oneChoice: {
        filters: false,
        level: true,
        pay: true,
        locationType: true,
        positionType: true,
        location: true,
      },
    });
  };

  const handleDelete = (
    type:
      | "filters"
      | "level"
      | "pay"
      | "locationType"
      | "positionType"
      | "country",
    id: any,
  ) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        filters: setFilters,
        level: setLevel,
        pay: setPay,
        locationType: setLocationType,
        positionType: setPositionType,
        country: setLocation,
      },
    });
  };

  const renderJobListings = () => {
    if (inputValue.length < 3 && filters.length === 0) {
      return jobListings?.map((job: any) => (
        <JobPost
          job={job}
          index={job.jobId}
          colorArray={colorArray}
          key={job.jobId}
          saveClick={() => saveClick(job.jobId)}
        />
      ));
    } else if (filters.length > 0) {
      console.log("there's a filter at play!");
      return filteredJobs?.map((job: any) => (
        <JobPost
          job={job}
          index={job.jobId}
          colorArray={colorArray}
          key={job.jobId}
          saveClick={() => saveClick(job.jobId)}
        />
      ));
    } else {
      return filteredJobs?.map((job: any) => (
        <JobPost
          job={job}
          index={job.jobId}
          colorArray={colorArray}
          key={job.jobId}
          saveClick={() => saveClick(job.jobId)}
        />
      ));
    }
  };

  const saveClick = (jobId: any) => {
    if (fellow?.savedJobs?.includes(jobId)) {
      setFellow({
        ...fellow,
        savedJobs: fellow.savedJobs.filter((id) => id !== jobId),
      });
    } else {
      setFellow({
        ...fellow,
        savedJobs: [...(fellow?.savedJobs || []), jobId],
      });
    }
    hideModal();
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
  }, []);

  useEffect(() => {
    renderJobListings();
  }, [filters]);
  return (
    <div
      className={`JobBoardPage flex flex-grow flex-col items-center gap-8 md:pb-12 ${textColor}`}
    >
      <div className="SearchBarAndFilterButtons mb-8 flex flex-col items-center gap-4">
        <InfoBox
          variant="hollow"
          size="extraSmall"
          aria="searchBar"
          width="large"
          addClasses="flex"
          canSearch
        >
          <input
            type="text"
            placeholder="Search For Opportunities"
            className={`text-md w-full bg-transparent ${inputColors} focus:outline-none`}
            onChange={handleInput}
          />
        </InfoBox>
        {/* make a multiple-options / tiered button options component */}
        <div className="FilterButtons -mb-6 flex items-start gap-6 self-start">
          <TieredButtonOptionsComponent
            type="filters"
            title="filters:"
            buttons={[
              {
                title: level.length > 1 ? level : "level",
                type: "level",
                array: level,
                options: ["entry-level", "junior", "senior"],
              },
              {
                title: locationType.length > 1 ? locationType : "location type",
                type: "locationType",
                array: locationType,
                options: ["remote", "on-site", "hybrid"],
              },
              {
                title: positionType.length > 1 ? positionType : "position type",
                type: "positionType",
                array: positionType,
                options: ["full-time", "part-time", "contract"],
              },
            ]}
            selectedArray={filters}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            classesForButtons="px-6"
          />
          {/* add pay filters here */}
          {/* add location filters here */}
          {/* country input */}
          <div className="PayAndCountryFilters mt-2 flex gap-4">
            <InputComponentWithLabelOptions
              handleAdd={handleAdd}
              placeholder="Location Country"
              name="country"
              searchData={countries}
              colorArray={colorArray}
              options
              size="tiny"
              textSize="small"
              width="extraSmall"
              optionsContainerClasses="max-w-[20vw]"
            />
          </div>
        </div>
      </div>
      <div className="JobListings flex flex-wrap justify-center gap-8">
        {renderJobListings()}
      </div>
    </div>
  );
}
