"use client";
import * as Dialog from "@radix-ui/react-dialog";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useModal } from "@/contexts/ModalContext";

import SiteButton from "../../buttonsAndLabels/siteButton";
import SiteLabel from "../../buttonsAndLabels/siteLabel";
import ButtonOptionsComponent from "../../buttonsAndLabels/buttonOptionsComponent";
import ShuffleIdealButtonPattern from "../../buttonsAndLabels/shuffleIdealButtonPattern";
import AppointmentNoteModal from "./appointmentNote";

interface AppointmentDetailsModalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  app: any;
}

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  app,
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

  const currentJob = jobListings?.find(
    (job: any) => job.jobId === app.jobId,
  )?.job;

  const viewListing = () => {
    router.push(`/ams/listing/${currentJob}`);
    hideModal();
  };

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
          <span className="Business italic text-emerald">
            {app.businessName}
          </span>
        </p>
        <p className="Info">
          to discuss the
          <span className="Title text-emerald">
            {" "}
            {currentJob?.jobTitle}
          </span>{" "}
          position.
        </p>
        {currentJob?.interviewer && (
          <p className="InterviewerDetails italic">
            {`You'll be meeting with ${currentJob.interviewer.name}.`}
          </p>
        )}
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
        <div className="ButtonOptions flex justify-center gap-4 pt-4">
          <SiteButton
            aria="viewlisting"
            variant="hollow"
            colorScheme="f1"
            onClick={viewListing}
          >
            view listing
          </SiteButton>
          <SiteButton aria="messages" variant="hollow" colorScheme="b4">
            go to messages
          </SiteButton>
          <SiteButton
            aria="meetingNote"
            variant="hollow"
            colorScheme="d3"
            onClick={() =>
              showModal(<AppointmentNoteModal appointment={app} />)
            }
          >
            {app.note ? "read / add to note" : "add a note"}
            {/* add a note */}
          </SiteButton>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;
