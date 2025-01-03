"use client";
import * as Dialog from "@radix-ui/react-dialog";
import SiteButton from "../buttonsAndLabels/siteButton";
import SiteLabel from "../buttonsAndLabels/siteLabel";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useJobListings } from "@/contexts/JobListingsContext";
import ButtonOptionsComponent from "../buttonsAndLabels/buttonOptionsComponent";
import ShuffleIdealButtonPattern from "../buttonsAndLabels/shuffleIdealButtonPattern";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

interface ApplicationDetailsModalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  app: {
    month: number;
    day: number;
    time: string;
    businessName: string;
    jobId: string;
  };
}

const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({
  app,
}) => {
  const router = useRouter();
  const { jobListings } = useJobListings();
  const { textColor, secondaryTextColor } = useColorOptions();
  const [betterColorArray, setBetterColorArray] = useState(Array<any>);
  console.log(app);

  const getMonthName = (month: any) => {
    const d = new Date();
    d.setMonth(month);
    const monthName = d.toLocaleString("default", { month: "long" });
    return monthName;
  };

  const currentJob = jobListings?.find(
    (job: any) => job.jobId === app.jobId,
  )?.job;

  console.log(currentJob);

  useEffect(() => {
    ShuffleIdealButtonPattern(setBetterColorArray);
  }, []);

  return (
    <div
      className={`AppointmentModal flex w-full flex-col gap-3 ${textColor} max-w-[40vw]`}
    >
      <Dialog.Title
        className={`Title mb-3 max-w-[450px] self-center text-center text-xl font-bold ${textColor}`}
      >
        appointment details:
      </Dialog.Title>
      <div className="Details leading flex flex-col gap-2 text-center">
        <p className="Info">
          You have a meeting with{" "}
          <span className="Business italic">{app.businessName}</span>
        </p>
        <p className="Info">
          to discuss the
          <span className="Title text-emerald">
            {" "}
            {currentJob?.jobTitle}
          </span>{" "}
          position.
        </p>
        <p className="Info py-3">
          {`It's set for: `}
          <span className="DateTime italic text-olive">
            {" "}
            {getMonthName(app.month)} {app.day} at {app.time}
          </span>
        </p>
        <p className="Link text-sm italic text-emerald">
          {" "}
          link:{" "}
          <a
            href="http://www.straightforwardjobsite.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-medium italic`}
          >
            straightforwardjobsite.com/link-to-meeting
          </a>
        </p>
        <div className="ButtonOptions flex justify-center gap-3 pt-4">
          <SiteButton aria="viewlisting" variant="hollow" colorScheme="f1">
            view listing
          </SiteButton>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;
