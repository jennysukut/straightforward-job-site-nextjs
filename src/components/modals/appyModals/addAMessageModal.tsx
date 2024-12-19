import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";
import { useFellow } from "@/contexts/FellowContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

import SiteButton from "@/components/siteButton";
import InputComponent from "@/components/inputComponent";

export default function AddAMessageModal({ business }: any) {
  const { showModal, replaceModalStack, goBack, hideModal } = useModal();
  const { textColor, secondaryTextColor, titleColor } = useColorOptions();

  return (
    <div
      className={`AddAMessageModal flex w-[40vw] flex-col items-center gap-4 ${textColor}`}
    >
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {`Your Message To ${business}`}
      </Dialog.Title>
      <InputComponent
        type="text"
        placeholderText="Your Message Here..."
        size="tall"
        width="medium"
        addClasses="mt-6"
      ></InputComponent>
      <div className="SignupButtons -mb-3 mt-4 self-end">
        <SiteButton
          variant="hollow"
          colorScheme="b3"
          aria="go back"
          // onClick={}
        >
          add + send
        </SiteButton>
      </div>
    </div>
  );
}
