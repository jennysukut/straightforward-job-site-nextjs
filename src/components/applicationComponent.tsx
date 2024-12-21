"use client";

import Image from "next/image";
import InfoBox from "./infoBox";
import SiteButton from "./siteButton";
import DeleteConfirmationModal from "./modals/deleteConfirmationModal";
import { useRouter } from "next/navigation";

import { smallShadowColors } from "@/lib/stylingData/smallShadowColors";
import { useColors } from "@/contexts/ColorContext";
import { capitalizeFirstLetter } from "@/utils/textUtils";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useFellow } from "@/contexts/FellowContext";
import { useModal } from "@/contexts/ModalContext";
import { useJobListings } from "@/contexts/JobListingsContext";

interface ApplicationProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  colorArray: Array<string>;
  index: any;
  business?: string;
  jobId?: string;
  dateOfApp?: any;
  appStatus?: string;
}

const Application: React.FC<ApplicationProps> = ({
  id,
  colorArray,
  index,
  business,
  jobId,
  dateOfApp,
  appStatus,
}) => {
  const router = useRouter();
  const { colorOption } = useColors();
  const { fellow } = useFellow();
  const { showModal, hideModal } = useModal();
  const { jobListings } = useJobListings();

  // here, we need to be able to access the listing via Id I believe?
  // const viewDetails = () => {
  //   router.push(`/listing/${job.jobId}`);
  // };

  // search through the jobListings to find the job with the matching jobId
  const selectedJob = jobListings?.find((job: any) => job.jobId === jobId)?.job;

  return (
    <div className="Application flex w-full gap-3" key={id}>
      <div className="MultiSelectionButton self-center">
        <SiteButton
          size="smallCircle"
          colorScheme="f1"
          aria="selectButton"
          variant="hollow"
        ></SiteButton>
      </div>
      <SiteButton
        aria="JobApplication"
        variant="hollow"
        colorScheme="b1"
        size="wide"
      >
        <div className="AppInfo flex justify-between">
          <p className="TitleAndBusiness">
            {`${selectedJob?.jobTitle} | ${business}`}
          </p>
          <p className="Details">{`${dateOfApp} | ${appStatus}`}</p>
        </div>
      </SiteButton>
    </div>
  );
};

export default Application;
