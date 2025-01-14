import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";
import { rejectionOptions } from "@/lib/rejectionOptions";

import SiteButton from "@/components/buttonsAndLabels/siteButton";

type RejectionOptionKey = keyof typeof rejectionOptions;

interface RejectionMessageModalProps {
  title: RejectionOptionKey;
}

export default function RejectionMessageModal({
  title,
}: RejectionMessageModalProps) {
  const { showModal, goBack, hideModal } = useModal();
  const message = rejectionOptions[title];

  console.log(message);
  return (
    <div className="DeleteConfirmationModal flex max-h-[90%] w-[70vw] max-w-[1200px] flex-col items-center justify-center gap-4 self-center">
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {message.title}
      </Dialog.Title>
      <div className="Message mt-4 flex flex-col gap-4 overflow-y-visible font-medium">
        {message.message.map((line: any, index: number) => {
          return (
            <p className="MessageLine" key={index}>
              {line}
            </p>
          );
        })}
      </div>
      <div className="SignupButtons -mb-4 -mt-4 self-end">
        <SiteButton
          variant="hollow"
          colorScheme="b3"
          aria="go back"
          addClasses="w-[200px]"
          // onClick={goBack}
        >
          select
        </SiteButton>
      </div>
    </div>
  );
}
