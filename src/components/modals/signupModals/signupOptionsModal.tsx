import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";
import { usePageContext } from "@/contexts/PageContext";

import SiteButton from "../../siteButton";
import SignupModalIndividual1 from "./signupIndividual1";
import SignupModalBusiness1 from "./signupBusiness1";
import LoginModal from "../loginModal";

export default function SignupOptionsModal() {
  const { showModal, replaceModalStack } = useModal();
  const { setAccountType } = usePageContext();

  const selectCategory = (type: any) => {
    if (type === "Fellow") {
      setAccountType("Fellow");
      showModal(<SignupModalIndividual1 />);
    } else if (type === "Business") {
      setAccountType("Business");
      showModal(<SignupModalBusiness1 />);
    }
  };

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
          onClick={() => selectCategory("Fellow")}
        >
          job-seeker
        </SiteButton>
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="b3"
          aria="business"
          addClasses="w-[200px]"
          onClick={() => selectCategory("Business")}
        >
          business
        </SiteButton>
      </div>
      <div className="LoginButtonContainer -mb-6 -mr-6 mt-8 flex w-full justify-end">
        <button
          className="LoginButton text-xs opacity-80 hover:opacity-100"
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
