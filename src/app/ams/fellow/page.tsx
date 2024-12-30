"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useFellow } from "@/contexts/FellowContext";
import { useModal } from "@/contexts/ModalContext";
import { JobListing } from "@/contexts/JobListingsContext";
import { useApplications } from "@/contexts/ApplicationsContext";

import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
import InfoBox from "@/components/informationDisplayComponents/infoBox";
import AddHandler from "@/components/handlers/addHandler";
import DeleteHandler from "@/components/handlers/deleteHandler";
import TieredButtonOptionsComponent from "@/components/buttonsAndLabels/tieredButtonOptionsComponent";
import SiteButton from "@/components/buttonsAndLabels/siteButton";
import Application from "@/components/amsComponents/applicationComponent";

export default function FellowAMS() {
  const { accountType } = usePageContext();
  const { fellow, setFellow } = useFellow();
  const { textColor, inputColors } = useColorOptions();
  const { hideModal } = useModal();
  const { applications } = useApplications();

  const [colorArray, setColorArray] = useState<[]>([]);
  const [appOptions, setAppOptions] = useState<string[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [appStatus, setAppStatus] = useState<string[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

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
        <div className="FilterButtons -mb-8 flex items-center">
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
          />
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
