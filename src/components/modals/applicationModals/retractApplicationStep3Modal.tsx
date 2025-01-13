import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";

import SiteButton from "@/components/buttonsAndLabels/siteButton";

export default function RetractionApplicationStep3Modal({
  continueRetract,
}: any) {
  const { showModal, goBack, hideModal } = useModal();

  const finalRetractStep = (buttonText: any) => {
    console.log(buttonText);
    continueRetract();
  };

  return (
    <div className="RetractConfirmationModal flex w-[350px] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {`what's up?`}
      </Dialog.Title>
      <div className="ButtonOptions mt-4 flex flex-col items-center gap-y-4">
        <SiteButton
          variant="hollow"
          colorScheme="b3"
          aria="go back"
          addClasses="w-[350px] py-3"
          onClick={() => finalRetractStep("job elsewhere")}
        >
          {`i got a job elsewhere!`}
        </SiteButton>
        <SiteButton
          variant="hollow"
          colorScheme="c1"
          aria="delete"
          addClasses="w-[350px] py-3"
          onClick={() => finalRetractStep("unsatisfactory communication")}
        >
          {`i was unhappy with our communication`}
        </SiteButton>
        <SiteButton
          variant="hollow"
          colorScheme="f4"
          aria="go back"
          addClasses="w-[350px] py-3"
          onClick={() => finalRetractStep("writing cat books")}
        >
          {`i've decided to pursue my lifelong dream of writing cat-themed novels`}
        </SiteButton>
      </div>
    </div>
  );
}
