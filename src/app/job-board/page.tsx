"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useJobListings } from "@/contexts/JobListingsContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useFellow } from "@/contexts/FellowContext";
import { useModal } from "@/contexts/ModalContext";

import ShuffleIdealButtonPattern from "@/components/shuffleIdealButtonPattern";
import JobPost from "@/components/jobPostComponent";
import InfoBox from "@/components/infoBox";
import SiteButton from "@/components/siteButton";
import ButtonOptionsComponent from "@/components/buttonOptionsComponent";
import AddHandler from "@/components/addHandler";
import DeleteHandler from "@/components/deleteHandler";
import TieredButtonOptionsComponent from "@/components/tieredButtonOptionsComponent";

export default function JobBoard() {
  const { accountType } = usePageContext();
  const { fellow, setFellow } = useFellow();
  const { textColor, inputColors } = useColorOptions();
  const { jobListings } = useJobListings();
  const { hideModal } = useModal();

  const [colorArray, setColorArray] = useState<[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  // const [filterOptions, setFilterOptions] = useState<{
  //   level?: string;
  //   pay?: string;
  //   locationType?: string;
  //   positionType?: string;
  //   location?: string;
  // }>({
  //   level: "",
  //   pay: "",
  //   locationType: "",
  //   positionType: "",
  //   location: "",
  // });
  const [level, setLevel] = useState<string[]>([]);
  const [pay, setPay] = useState<string[]>([]);
  const [locationType, setLocationType] = useState<string[]>([]);
  const [positionType, setPositionType] = useState<string[]>([]);
  const [location, setLocation] = useState<string[]>([]);
  const [test, setTest] = useState<string[]>([]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  // handlers for adding, updating, and deleting details
  const handleAdd = (
    type:
      | "filters"
      | "level"
      | "pay"
      | "locationType"
      | "positionType"
      | "location"
      | "test",
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
        location: setLocation,
        test: setTest,
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
      | "location",
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
        location: setLocation,
      },
    });
  };

  const search = () => {
    console.log("searching", inputValue);
  };

  const renderJobListings = () => {
    return jobListings?.map((job) => (
      <JobPost
        job={job}
        index={job.jobId}
        colorArray={colorArray}
        key={job.jobId}
        saveClick={() => saveClick(job.jobId)}
      />
    ));
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

  console.log(test);

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
          searchClick={search}
        >
          <input
            type="text"
            placeholder="Search For Opportunities"
            className={`text-md w-full bg-transparent ${inputColors} focus:outline-none`}
            onChange={handleInput}
          />
        </InfoBox>
        {/* make a multiple-options / tiered button options component */}
        <div className="FilterButtons -mb-6 flex">
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
                title: pay.length > 1 ? pay : "pay",
                type: "pay",
                array: pay,
                options: ["hourly", "annually"],
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
              {
                title: location.length > 1 ? location : "location",
                type: "location",
                array: location,
                options: ["United States", "State"],
              },
            ]}
            selectedArray={filters}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            classesForButtons="px-6"
            test={test}
          />{" "}
        </div>
        {/* filter options here */}
        {/* {filters.includes("level") && (
          <ButtonOptionsComponent
            type="level"
            buttons={["entry-level", "junior", "senior"]}
            selectedArray={level}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            classesForButtons="px-6"
            addClasses="self-start ml-14"
          ></ButtonOptionsComponent>
        )}
        {filters.includes("pay") && (
          <ButtonOptionsComponent
            type="pay"
            buttons={["entry-level", "junior", "senior"]}
            selectedArray={pay}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            classesForButtons="px-6"
            addClasses="self-start ml-14"
          ></ButtonOptionsComponent>
        )} */}
      </div>
      <div className="JobListings flex flex-wrap justify-center gap-8">
        {renderJobListings()}
      </div>
    </div>
  );
}
