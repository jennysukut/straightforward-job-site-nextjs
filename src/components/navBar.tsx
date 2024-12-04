"use client";

import { useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";

import Image from "next/image";
import SiteButton from "./siteButton";
import Link from "next/link";
import LoginModal from "./modals/loginModal";
import SignupOptionsModal from "./modals/signupModals/signupOptionsModal";
import NavButton from "./navButton";

export default function NavBar() {
  const [clickedButton, setClickedButton] = useState("");
  const { showModal } = useModal();
  const { pageType } = usePageContext();

  function handleNavButtonClick(e: any) {
    setClickedButton(clickedButton === e.target.value ? "" : e.target.value);
  }
  const { fellow } = useFellow();

  return (
    <div className="NavBar mx-auto flex h-fit w-[95vw] justify-between px-8 py-12 sm:w-[98vw] sm:px-16">
      <Link href={"/"}>
        <Image
          className="Logo max-w-44 cursor-pointer transition-transform duration-300 hover:scale-105"
          src="/sfjs-logo.svg"
          width={229}
          height={75}
          alt="Straightforward Job Site logo"
        />
      </Link>
      {/* NavBar Button Options */}
      {(() => {
        if (pageType === "Individual Signup") {
          // INDIVIDUAL SIGNUP NAV BAR
          return (
            <div className="TellUsAboutYou">
              <p className="TellAboutYouTitle">tell us more about you!</p>
            </div>
          );
        } else if (pageType === "Individual") {
          // INDIVIDUAL NAV BAR
          return (
            <div className="NavButtonContainer hidden items-end gap-4 lg:flex lg:flex-row lg:items-center lg:max-lg:-mr-8">
              <NavButton
                onClick={handleNavButtonClick}
                colorScheme="b4"
                title="mailbox"
                clickedButton={clickedButton}
              />
              <NavButton
                onClick={handleNavButtonClick}
                colorScheme="e5"
                title="jobs"
                clickedButton={clickedButton}
              />
              <NavButton
                onClick={handleNavButtonClick}
                colorScheme="d4"
                title="saved"
                clickedButton={clickedButton}
              />
              <NavButton
                onClick={handleNavButtonClick}
                colorScheme="f3"
                title="applications"
                clickedButton={clickedButton}
              />
              <NavButton
                onClick={handleNavButtonClick}
                colorScheme="b6"
                title="account"
                clickedButton={clickedButton}
                variant="avatar"
                size="mediumCircle"
                addImage="bg-[url('/avatars/peach.svg')]"
              />
            </div>
          );
        } else {
          return (
            // STANDARD / MAIN NAV BAR
            <div className="NavButtonContainer hidden items-end gap-4 lg:flex lg:flex-row lg:items-center lg:max-lg:-mr-8">
              <SiteButton variant="filled" colorScheme="b4" aria="About us">
                about
              </SiteButton>
              <SiteButton
                variant="filled"
                colorScheme="e5"
                aria="Login to your account"
                onClick={() => showModal(<LoginModal />)}
              >
                login
              </SiteButton>
              <Link href={"/pricing"}>
                <SiteButton
                  variant="filled"
                  colorScheme="d4"
                  aria="pricing"
                  value="pricing"
                  onClick={handleNavButtonClick}
                >
                  pricing
                </SiteButton>
              </Link>
              <SiteButton
                variant="filled"
                colorScheme="f3"
                aria="Create a new account"
                onClick={() => showModal(<SignupOptionsModal />)}
              >
                signup
              </SiteButton>
            </div>
          );
        }
      })()}
    </div>
  );
}
