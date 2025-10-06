"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useFellow } from "@/contexts/FellowContext";
import { useModal } from "@/contexts/ModalContext";
import { JobListing } from "@/contexts/JobListingsContext";
import { useQuery } from "@apollo/client";
import { GET_JOB_LISTINGS } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import { SAVE_JOB } from "@/graphql/mutations";

import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
import JobPost from "@/components/jobBoardComponents/jobPostComponent";
import InfoBox from "@/components/informationDisplayComponents/infoBox";
import AddHandler from "@/components/handlers/addHandler";
import DeleteHandler from "@/components/handlers/deleteHandler";
import TieredButtonOptionsComponent from "@/components/buttonsAndLabels/tieredButtonOptionsComponent";

export default function JobBoard() {
  const { fellow, setFellow } = useFellow();
  const { textColor, inputColors } = useColorOptions();
  const { currentPage, setCurrentPage, isLoggedIn } = usePageContext();
  const { hideModal, showModal } = useModal();

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
  const [loadingData, setLoadingData] = useState(true);
  const [saveJob, { loading, error }] = useMutation(SAVE_JOB);
  const [locationInputValue, setLocationInputValue] = useState("");

  const {
    loading: queryLoading,
    error: queryError,
    data: { jobListings: jobListingsArray = [] } = {},
  } = useQuery(GET_JOB_LISTINGS, {
    variables: {
      experienceLevel:
        level.length <= 0
          ? undefined
          : level.includes("entry-level")
            ? "entry"
            : level,
      locationOption: locationType.length > 0 ? locationType : undefined,
      positionType: positionType.length > 0 ? positionType : undefined,
      country: country.length > 0 ? country : undefined,
      isPublished: true,
      searchbar:
        inputValue !== "" && inputValue.length > 3 ? inputValue : undefined,
    },
    onCompleted: (data) => {
      setLoadingData(false);
    },
  });

  // search bar input
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  // location input
  const handleLocationInput: any = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setLocationInputValue(value);
  };

  const searchLocation = () => {
    console.log("searching location:", locationInputValue);
    setLocationInputValue("");
  };

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
    if (jobListingsArray.length < 1 && loadingData === false) {
      return (
        <div className="NoListingsDetail flex h-[30vh] w-[100%] flex-col justify-center">
          <p className="NoListingsHere italic text-olive">
            No listings match those parameters.
          </p>
        </div>
      );
    }
    return jobListingsArray?.map((job: any, index: number) => (
      <JobPost job={job} index={index} colorArray={colorArray} key={job.id} />
    ));
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
    setCurrentPage("jobs");
  }, []);

  useEffect(() => {
    if (filters.length > 1) {
      setLoadingData(true);
    }
  }, [filters]);

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
          shadowSize="small"
        >
          <input
            type="text"
            placeholder="Search For Opportunities"
            className={`text-md w-full bg-transparent ${inputColors} focus:outline-none`}
            onChange={handleInput}
          />
        </InfoBox>

        {/* filter options  */}
        <div className="Filters flex w-full justify-between justify-items-start align-top">
          <div className="FilterButtons -mb-6 flex items-start gap-6 self-start">
            <TieredButtonOptionsComponent
              type="filters"
              title="filters:"
              buttons={[
                {
                  title: level.length > 1 ? level : "level",
                  initialTitle: "level",
                  type: "level",
                  array: level,
                  options: ["entry-level", "junior", "senior"],
                },
                {
                  title:
                    locationType.length > 1 ? locationType : "location type",
                  initialTitle: "location type",
                  type: "locationType",
                  array: locationType,
                  options: ["remote", "on-site", "hybrid"],
                },
                {
                  title:
                    positionType.length > 1 ? positionType : "position type",
                  initialTitle: "position type",
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
              addClasses="mt-2"
            />
          </div>
          {/* location input */}
          {/*  */}
          {/* <div className="PayAndCountryFilters mt-2 flex gap-4 self-start pr-2">
            <InfoBox
              variant="hollow"
              size="tiny"
              aria="locationSearch"
              addClasses="flex drop-shadow-smJade"
              canSearch
              searchClick={searchLocation}
            >
              <input
                type="text"
                placeholder="Location"
                className={`w-full bg-transparent text-sm ${inputColors} focus:outline-none`}
                onChange={handleLocationInput}
              />
            </InfoBox>
          </div> */}
        </div>
      </div>

      {/* <div className="ActivePendingButtons -mt-8 mr-14 self-end">
        <SiteButton
          colorScheme="b1"
          variant="hollow"
          aria="viewPendingJobs"
          onClick={() => setViewPendingJobs(!viewPendingJobs)}
          isSelected={viewPendingJobs}
        >
          {viewPendingJobs === true ? "view open jobs" : "view pending jobs"}
        </SiteButton>
      </div> */}

      {/* job listings */}
      {loadingData ? (
        //make loading screen design here
        <div className="LoadingText text-olive">Searching...</div>
      ) : (
        <div className="JobListings flex flex-wrap justify-center gap-8">
          {renderJobListings()}
        </div>
      )}
    </div>
  );
}
