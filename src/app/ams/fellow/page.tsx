"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useFellow } from "@/contexts/FellowContext";
import { useModal } from "@/contexts/ModalContext";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useApplications } from "@/contexts/ApplicationsContext";
import { capitalizeFirstLetter } from "@/utils/textUtils";

import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
import InfoBox from "@/components/informationDisplayComponents/infoBox";
import AddHandler from "@/components/handlers/addHandler";
import DeleteHandler from "@/components/handlers/deleteHandler";
import TieredButtonOptionsComponent from "@/components/buttonsAndLabels/tieredButtonOptionsComponent";
import SiteButton from "@/components/buttonsAndLabels/siteButton";
import Application from "@/components/amsComponents/applicationComponent";
import { Job } from "@/contexts/JobContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import Image from "next/image";
import ButtonOptionsComponent from "@/components/buttonsAndLabels/buttonOptionsComponent";

export default function FellowAMS() {
  const { accountType } = usePageContext();
  const { jobListings } = useJobListings();
  const { fellow, setFellow } = useFellow();
  const { textColor, inputColors } = useColorOptions();
  const { hideModal } = useModal();
  const { applications } = useApplications();

  const [colorArray, setColorArray] = useState<[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [appStatus, setAppStatus] = useState<string[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [currentJob, setCurrentJob] = useState<Job | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState("");
  const [altViewChoice, setAltViewChoice] = useState("");

  const retract = () => {
    if (selectedApps.length > 0) {
      console.log("need to retract these applications:", selectedApps);
      // remove the selectedApps from the applications list and retract the applications
      // we can only do this after a confirmation modal has been successful
    } else {
      return;
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

  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  return (
    <div
      className={`FellowAMSPage flex ${!currentJob ? "flex-col items-center" : ""} w-[84%] gap-8 self-center ${textColor} max-w-[1600px]`}
    >
      <div className="AMSContainer flex w-full">
        <div className="AMSTabOptions max-w-[10%] gap-6">
          {/* set these as button choices to be set with add and delete handlers */}
          <ButtonOptionsComponent
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            type="altViewChoice"
            selectedArray={altViewChoice}
            classesForButtons="-rotate-90"
            buttons={["calendar", "messages"]}
            buttonContainerClasses="flex-col gap-20 -mx-8 mt-24"
          />
        </div>
        {altViewChoice === "calendar" && (
          <div className="Calendar">Calendar Here</div>
        )}
        {altViewChoice === "messages" && (
          <div className="Messages">Messages Here</div>
        )}

        {(altViewChoice === "" || altViewChoice.length == 0) && (
          <div className="ApplicationList flex w-full flex-col gap-4">
            <div className="ButtonsAndTitle flex w-full flex-col justify-between">
              <h1 className="AMSTitle -mb-8 mr-8 text-right">
                Application Manager
              </h1>

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
                  secondaryButtonClasses="mt-1 justify-start flex-wrap -mb-4"
                />
              </div>
            </div>
            <div className="JobApplications flex w-full flex-col justify-between gap-6">
              <div className="Applications flex h-80 w-full flex-col gap-4 overflow-x-auto overflow-y-scroll p-4">
                {applications?.map((app: any, index: number) => {
                  return (
                    <Application
                      key={app.id}
                      id={app.id}
                      colorArray={colorArray}
                      index={index}
                      jobId={app.jobId}
                      dateOfApp={app.dateOfApp}
                      appStatus={app.appStatus}
                      selectedApps={selectedApps}
                      setCurrentJob={setCurrentJob}
                      handleAdd={handleAdd}
                      handleDelete={handleDelete}
                      setSelectedColor={setSelectedColor}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {currentJob && (
        <div className="ApplicationInfo">
          <InfoBox
            aria="amsAppInfo"
            variant={currentJob ? "filled" : "hollow"}
            width="small"
            colorScheme={selectedColor as ButtonColorOption | "a1"}
          >
            <div className="JobDetails flex flex-col gap-1 text-center">
              <h2 className="JobTitle mb-1">{currentJob?.jobTitle}</h2>
              <p className="BusinessName font-medium italic">
                with {currentJob?.businessName}
              </p>

              <p className="ExperienceLevel text-sm font-normal">
                {capitalizeFirstLetter(
                  currentJob?.experienceLevel?.[0] || "junior",
                )}{" "}
                Level
              </p>

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
                <p className="LocationOption">On-Site: {currentJob?.country}</p>
              )}
              {currentJob?.locationOption === "hybrid" && (
                <p className="LocationOption">Hybrid</p>
              )}
              <p className="PositionType font-normal italic">
                {capitalizeFirstLetter(currentJob?.positionType || "")} Position
              </p>
              <p className="PayDetails">
                $
                {new Intl.NumberFormat().format(
                  currentJob?.payDetails?.payscaleMin ?? 0,
                )}{" "}
                - $
                {new Intl.NumberFormat().format(
                  currentJob?.payDetails?.payscaleMax ?? 0,
                )}{" "}
                {capitalizeFirstLetter(currentJob?.payDetails?.payOption || "")}
              </p>
            </div>
          </InfoBox>
          <div className="ButtonOptions -mx-2 mt-6 flex flex-wrap justify-evenly gap-2">
            <SiteButton
              variant="hollow"
              colorScheme="b3"
              aria="jobDetailsButton"
            >
              view calendar
            </SiteButton>
            <SiteButton
              variant="hollow"
              colorScheme="f5"
              aria="jobDetailsButton"
            >
              messages
            </SiteButton>
            <SiteButton
              variant="hollow"
              colorScheme="d3"
              aria="jobDetailsButton"
            >
              retract
            </SiteButton>
          </div>
        </div>
      )}
    </div>
  );
}
