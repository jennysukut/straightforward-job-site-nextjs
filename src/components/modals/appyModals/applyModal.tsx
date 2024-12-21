import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";
import { useFellow } from "@/contexts/FellowContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useApplication } from "@/contexts/ApplicationContext";

import SiteButton from "@/components/siteButton";
import AddAMessageModal from "./addAMessageModal";
import SuccessfulApplicationModal from "./successfulAppModal";

export default function ApplyModal({ jobTitle, business, jobId }: any) {
  const { showModal, replaceModalStack, goBack, hideModal } = useModal();
  const { fellow, setFellow } = useFellow();
  const { textColor, secondaryTextColor, titleColor } = useColorOptions();
  const { setApplication } = useApplication();

  const apply = () => {
    // send details to the database for the application - if it's successful, show the successfulApplicationModal
    // we should make some kind of specific error modal or something here
    // there might be a chance of a job reaching it's limit of applications at the same time an application is trying ot be submitted,
    // so we should make some checks for the backend and make sure we can display correct errors/messages in that case

    // if the application is successful, do these things:
    setApplication({
      id: "testapp",
      applicant: fellow?.id,
      jobId: jobId,
      business: business,
      dateOfApp: "12.20.2024",
      appStatus: "submitted",
    });
    setFellow({
      ...fellow,
      dailyApplications: String(Number(fellow?.dailyApplications) + 1),
    });
    showModal(<SuccessfulApplicationModal />);
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
      >{`daily application: ${fellow?.dailyApplications}/5`}</h4>
      <p
        className={`Details ${titleColor} text-center`}
      >{`We’ll send ${business} your information.`}</p>

      <p
        className={`Details ${titleColor} text-center`}
      >{`If you’d like to add a message or include additional information, just use the button below!`}</p>
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
        >
          apply now
        </SiteButton>
      </div>
    </div>
  );
}
