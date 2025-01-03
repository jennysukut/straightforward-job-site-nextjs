import * as Dialog from "@radix-ui/react-dialog";

import { useModal } from "@/contexts/ModalContext";

import SiteButton from "../buttonsAndLabels/siteButton";
import SignupOptionsModal from "./signupModals/signupOptionsModal";
import LoginModal from "./loginModal";

export default function LoginPromptModal() {
  const { showModal } = useModal();

  return (
    <div className="LoginErrorModal flex max-w-[30rem] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full pb-4 text-center text-xl font-bold text-emerald">
        {`You gots to have an account to make a list o' saved-jobs, mate!`}
      </Dialog.Title>
      <div className="ButtonOptions flex flex-col gap-6">
        <SiteButton
          variant="hollow"
          size="large"
          addClasses="w-[25rem]"
          colorScheme="c6"
          aria="login"
          onClick={() => showModal(<LoginModal />)}
        >
          log in
        </SiteButton>
        <SiteButton
          variant="hollow"
          size="large"
          addClasses="w-[25rem]"
          colorScheme="d4"
          aria="signup"
          onClick={() => showModal(<SignupOptionsModal />)}
        >
          signup
        </SiteButton>
      </div>
    </div>
  );
}
