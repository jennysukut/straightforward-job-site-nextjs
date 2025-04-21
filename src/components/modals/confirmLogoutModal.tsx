import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SiteButton from "../buttonsAndLabels/siteButton";

export default function ConfirmLogoutModal({
  continueLogout,
  setIsLoggingOut,
}: any) {
  const { showModal, replaceModalStack, goBack, hideModal } = useModal();
  const [clickedButton, setClickedButton] = useState("");
  const router = useRouter();

  const logout = () => {
    setClickedButton("logout");
    router.push(`/`);
    continueLogout();
  };

  const cancelLogout = () => {
    setClickedButton("cancel");
    setIsLoggingOut(false);
    hideModal();
  };

  return (
    <div className="LogoutConfirmationModal flex w-[250px] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {`You want to logout?`}
      </Dialog.Title>
      <div className="SignupButtons mt-4 flex flex-col items-start gap-y-4">
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="c1"
          aria="logout"
          addClasses="w-[200px]"
          onClick={logout}
          isSelected={clickedButton === "logout"}
        >
          yes please!
        </SiteButton>
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="b3"
          aria="stay"
          addClasses="w-[200px]"
          onClick={cancelLogout}
          isSelected={clickedButton === "cancel"}
        >
          no thanks
        </SiteButton>
      </div>
    </div>
  );
}
