"use client";
import * as Dialog from "@radix-ui/react-dialog";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useModal } from "@/contexts/ModalContext";
import { getMonthName } from "@/utils/textUtils";

import SiteButton from "../../buttonsAndLabels/siteButton";
import SiteLabel from "../../buttonsAndLabels/siteLabel";
import ButtonOptionsComponent from "../../buttonsAndLabels/buttonOptionsComponent";
import ShuffleIdealButtonPattern from "../../buttonsAndLabels/shuffleIdealButtonPattern";
import AppointmentNoteModal from "./appointmentNote";

interface AppointmentDetailsModalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  apps: any;
  date: any;
  currentMonth: any;
}

const AppointmentListModal: React.FC<AppointmentDetailsModalProps> = ({
  apps,
  date,
  currentMonth,
}) => {
  const router = useRouter();

  const { jobListings } = useJobListings();
  const { textColor, secondaryTextColor } = useColorOptions();
  const { showModal, hideModal } = useModal();

  const [betterColorArray, setBetterColorArray] = useState(Array<any>);

  const getMonthName = (month: any) => {
    const d = new Date();
    d.setMonth(month);
    const monthName = d.toLocaleString("default", { month: "long" });
    return monthName;
  };

  // const currentJob = jobListings?.find(
  //   (job: any) => job.jobId === app.jobId,
  // )?.job;

  // const viewListing = () => {
  //   router.push(`/ams/listing/${currentJob}`);
  //   hideModal();
  // };

  useEffect(() => {
    ShuffleIdealButtonPattern(setBetterColorArray);
  }, []);

  console.log(apps);

  return (
    <div
      className={`AppointmentModal flex w-full flex-col gap-3 ${textColor} max-w-[40vw]`}
    >
      <Dialog.Title
        className={`Title mb-3 max-w-[450px] self-center text-center text-xl font-bold ${textColor}`}
      >
        appointments for
      </Dialog.Title>
      <h2 className="Date -mt-6 mb-3 text-center italic">
        {getMonthName(currentMonth)} {date}
      </h2>
      {/* find a way to sort the appointment list according to the time and display them in order */}
      <div className="AppointmentList flex flex-col items-center gap-4">
        {apps.map((app: any, index: number) => {
          return (
            <SiteButton
              key={app.id}
              variant="filled"
              addClasses="px-8 py-3 w-[300px]"
              colorScheme={betterColorArray[index % betterColorArray.length]}
              aria="appointment"
              onClick={() => console.log(app)}
            >
              {app.time}: {app.businessName}
            </SiteButton>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentListModal;
