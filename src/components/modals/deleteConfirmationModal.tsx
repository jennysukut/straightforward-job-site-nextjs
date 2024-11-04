import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";

import SiteButton from "../siteButton";

export default function DeleteConfirmationModal({ handleDelete, item }: any) {
  const { showModal, replaceModalStack, goBack } = useModal();

  return (
    <div className="DeleteConfirmationModal flex w-[250px] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {`delete ${item}?`}
      </Dialog.Title>
      <div className="SignupButtons mt-4 flex flex-col items-start gap-y-4">
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="c1"
          aria="delete"
          addClasses="w-[200px]"
          onClick={handleDelete}
        >
          yes, delete
        </SiteButton>
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="b3"
          aria="go back"
          addClasses="w-[200px]"
          onClick={goBack}
        >
          go back
        </SiteButton>
      </div>
    </div>
  );
}
