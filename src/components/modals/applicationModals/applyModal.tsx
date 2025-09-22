import * as Dialog from "@radix-ui/react-dialog";

import { useModal } from "@/contexts/ModalContext";
import { useFellow } from "@/contexts/FellowContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useApplications } from "@/contexts/ApplicationsContext";
import { today } from "@/utils/textUtils";
import { useMutation } from "@apollo/client";
import { APPLY_TO_JOB } from "@/graphql/mutations";
import { useState } from "react";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import AddAMessageModal from "./addAMessageModal";
import SuccessfulApplicationModal from "./successfulAppModal";

export default function ApplyModal({ jobTitle, business, jobId }: any) {
  const [disabledButton, setDisabledButton] = useState(false);

  const { showModal, replaceModalStack, goBack, hideModal } = useModal();
  const { fellow, setFellow } = useFellow();
  const { textColor, secondaryTextColor, titleColor } = useColorOptions();
  const { applications, setApplications } = useApplications();
  const [applyToJob, { loading, error }] = useMutation(APPLY_TO_JOB);

  const apply = async () => {
    setDisabledButton(true);
    try {
      const response = await applyToJob({
        variables: {
          jobId: jobId,
        },
      });
      // when successful
      console.log("application successful, details:", response.data.applyToJob);
      setFellow({
        ...fellow,
        newApplication: true,
        dailyApplications: [
          ...(fellow?.dailyApplications || []),
          { id: response.data.applyToJob, message: "", status: "submitted" },
        ],
      });
      showModal(<SuccessfulApplicationModal />);
    } catch (error) {
      console.error("application error:", error);
      setDisabledButton(false);
      // Optionally, you can set an error state here to display to the user
    }
  };

  return (
    <div
      className={`ApplyModal flex w-[40vw] flex-col items-center gap-4 ${textColor}`}
    >
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {`Apply for the ${jobTitle} Job`}
      </Dialog.Title>
      <h4
        className={`DailyLimit font-medium italic ${secondaryTextColor}`}
      >{`daily application: ${(fellow?.dailyApplications?.length || 0) + 1}/5`}</h4>
      <p
        className={`Details ${titleColor} text-center`}
      >{`We'll send ${business} your information.`}</p>

      <p
        className={`Details ${titleColor} text-center`}
      >{`If you'd like to add a message or include additional information, just use the button below!`}</p>
      <div className="Buttons mt-4 flex flex-row items-start gap-4">
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="b3"
          aria="go back"
          addClasses=""
          onClick={() =>
            showModal(<AddAMessageModal business={business} jobId={jobId} />)
          }
        >
          add a message
        </SiteButton>
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="f1"
          aria="go back"
          addClasses=""
          onClick={apply}
          isSelected={disabledButton}
        >
          {/* maybe we could check to see if there's an error and display the error here or something like that? */}
          {disabledButton ? "applying..." : "apply now"}
        </SiteButton>
      </div>
    </div>
  );
}
