import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";
import { useFellow } from "@/contexts/FellowContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

import SiteButton from "@/components/siteButton";

export default function ApplyModal({ jobTitle, businessName }: any) {
  const { showModal, replaceModalStack, goBack, hideModal } = useModal();
  const { fellow } = useFellow();
  const { textColor, secondaryTextColor, titleColor } = useColorOptions();

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
      >{`We’ll send ${businessName} your information.`}</p>

      <p
        className={`Details ${titleColor} text-center`}
      >{`If you’d like to add a message or include additional information, just use the button below!`}</p>
      <div className="SignupButtons mt-4 flex flex-col items-start gap-y-4">
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="b3"
          aria="go back"
          addClasses=""
          // onClick={}
        >
          add a message
        </SiteButton>
      </div>
    </div>
  );
}
