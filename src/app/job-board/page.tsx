"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useFellow } from "@/contexts/FellowContext";
import { useModal } from "@/contexts/ModalContext";
import { countries } from "@/lib/countriesList";
import { JobListing } from "@/contexts/JobListingsContext";

import ShuffleIdealButtonPattern from "@/components/shuffleIdealButtonPattern";
import JobPost from "@/components/jobPostComponent";
import InfoBox from "@/components/infoBox";
import AddHandler from "@/components/addHandler";
import DeleteHandler from "@/components/deleteHandler";
import TieredButtonOptionsComponent from "@/components/tieredButtonOptionsComponent";
import InputComponentWithLabelOptions from "@/components/inputComponentWithLabelOptions";
import SiteButton from "@/components/siteButton";
import { filter } from "framer-motion/client";

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
  const [country, setCountry] = useState<string[]>([]);
  const [viewPendingJobs, setViewPendingJobs] = useState<boolean>(false);

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
      const matchesCountry =
        country.length > 0 ? country.includes(job.job?.country || "") : true;

      return (
        matchesExperience &&
        matchesLocationType &&
        matchesPositionType &&
        matchesCountry
      );
    });

    setFilteredJobs(filteredJobs);
  };

  useEffect(() => {
    if (inputValue.length >= 3) {
      // filter and make matches out of any card where the jobTitle matches the inputValue
      // or any of the preferredSkills listed contain any the inputValue
      const matches =
        jobListings?.filter(
          (job) =>
            job.job?.jobTitle
              ?.toLowerCase()
              .includes(inputValue.toLowerCase()) ||
            job.job?.preferredSkills?.some((skill: string) =>
              skill.toLowerCase().includes(inputValue.toLowerCase()),
            ),
        ) || [];

      if (filters.length > 0 || country.length > 0) {
        filterSearch(matches);
      } else {
        setFilteredJobs(matches);
      }
    } else if (filters.length > 0) {
      filterSearch(jobListings);
    } else if (country.length > 0) {
      filterSearch(jobListings);
    } else {
      setFilteredJobs([]);
    }
  }, [
    inputValue,
    filters,
    positionType,
    level,
    pay,
    location,
    locationType,
    country,
  ]);

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
        country: setCountry,
      },
      oneChoice: {
        filters: false,
        level: true,
        pay: true,
        locationType: true,
        positionType: true,
        country: true,
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
        country: setCountry,
      },
    });
  };

  const renderJobListings = () => {
    const activeJobListings = jobListings?.filter((job: any) => {
      return job.job?.numberOfApps !== job.job?.applicationLimit;
    });

    const pendingJobListings = jobListings?.filter((job: any) => {
      return job.job?.numberOfApps === job.job?.applicationLimit;
    });

    const filteredActiveJobListings = filteredJobs?.filter((job: any) => {
      return job.job?.numberOfApps !== job.job?.applicationLimit;
    });

    const filteredPendingJobListings = filteredJobs?.filter((job: any) => {
      return job.job?.numberOfApps === job.job?.applicationLimit;
    });

    if (inputValue.length < 3 && filters.length === 0 && !viewPendingJobs) {
      return activeJobListings?.map((job: any, index: number) => (
        <JobPost
          job={job}
          index={index}
          colorArray={colorArray}
          key={job.jobId}
          saveClick={() => saveClick(job.jobId)}
        />
      ));
    } else if (
      inputValue.length < 3 &&
      filters.length === 0 &&
      viewPendingJobs
    ) {
      return pendingJobListings?.map((job: any, index: number) => (
        <JobPost
          job={job}
          index={index}
          colorArray={colorArray}
          key={job.jobId}
          saveClick={() => saveClick(job.jobId)}
        />
      ));
    } else if (filters.length > 0 && !viewPendingJobs) {
      console.log("trying to show filtered jobs", filteredActiveJobListings);
      return filteredActiveJobListings?.map((job: any, index: number) => (
        <JobPost
          job={job}
          index={index}
          colorArray={colorArray}
          key={job.jobId}
          saveClick={() => saveClick(job.jobId)}
        />
      ));
    } else if (filters.length > 0 && viewPendingJobs) {
      return filteredPendingJobListings?.map((job: any, index: number) => (
        <JobPost
          job={job}
          index={index}
          colorArray={colorArray}
          key={job.jobId}
          saveClick={() => saveClick(job.jobId)}
        />
      ));
    } else if (viewPendingJobs) {
      return filteredPendingJobListings?.map((job: any, index: number) => (
        <JobPost
          job={job}
          index={index}
          colorArray={colorArray}
          key={job.jobId}
          saveClick={() => saveClick(job.jobId)}
        />
      ));
    } else {
      return filteredActiveJobListings?.map((job: any, index: number) => (
        <JobPost
          job={job}
          index={index}
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

  return (
    <div
      className={`JobBoardPage flex flex-grow flex-col items-center gap-8 self-center md:pb-12 ${textColor} w-[84%] max-w-[1600px]`}
    >
      {/* searchbar */}
      <div className="SearchBarAndFilterButtons mb-8 flex flex-col items-center gap-4 self-center">
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

        {/* filter options  */}
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
            setArray={setFilters}
          />

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
            {/* add pay filters here */}
            {/* add location filters here */}
          </div>
        </div>
      </div>
      <div className="ActivePendingButtons -mt-8 mr-14 self-end">
        <SiteButton
          colorScheme="b1"
          variant="hollow"
          aria="viewPendingJobs"
          onClick={() => setViewPendingJobs(!viewPendingJobs)}
          isSelected={viewPendingJobs}
        >
          {viewPendingJobs === true ? "view open jobs" : "view pending jobs"}
        </SiteButton>
      </div>
      <div className="JobListings flex flex-wrap justify-center gap-8">
        {renderJobListings()}
      </div>
    </div>
  );
}
