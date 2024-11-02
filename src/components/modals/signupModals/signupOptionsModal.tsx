import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";

import SiteButton from "../../siteButton";
import SignupModalIndividual1 from "./signupIndividual1";
import SignupModalBusiness1 from "./signupBusiness1";
import LoginModal from "../loginModal";

export default function SignupOptionsModal() {
  const { showModal, replaceModalStack } = useModal();

  return (
    <div className="SignupOptionsModal flex w-[250px] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        signup
      </Dialog.Title>
      <p className="Subtitle w-full text-center">who are you?</p>
      <div className="SignupButtons mt-4 flex flex-col items-start gap-y-4">
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="c1"
          aria="job-seeker"
          addClasses="w-[200px]"
          onClick={() => showModal(<SignupModalIndividual1 />)}
        >
          job-seeker
        </SiteButton>
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="b3"
          aria="business"
          addClasses="w-[200px]"
          onClick={() => showModal(<SignupModalBusiness1 />)}
        >
          business
        </SiteButton>
      </div>
      <div className="LoginButtonContainer -mb-6 -mr-6 mt-8 flex w-full justify-end">
        <button
          className="LoginButton text-sm opacity-80 hover:opacity-100"
          aria-label="Login"
          onClick={() => replaceModalStack(<LoginModal />)}
          type="button"
        >
          or login
        </button>
      </div>
    </div>
  );
}
