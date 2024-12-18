"use client";

import { useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { useColors } from "@/contexts/ColorContext";

import Image from "next/image";
import SiteButton from "./siteButton";
import Link from "next/link";
import LoginModal from "./modals/loginModal";
import SignupOptionsModal from "./modals/signupModals/signupOptionsModal";
import NavButton from "./navButton";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import PostAJobModal from "./modals/postAJobModals/postAJobModal";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

export default function NavBar() {
  const { showModal } = useModal();
  const { pageType, accountType, isLoggedIn } = usePageContext();
  const { fellow } = useFellow();
  const [clickedButton, setClickedButton] = useState("");
  const { business } = useBusiness();
  const { colorOption } = useColors();
  const { textColor } = useColorOptions();

  function handleNavButtonClick(e: any) {
    setClickedButton(clickedButton === e.target.value ? "" : e.target.value);
  }

  return (
    <div
      className={`NavBar mx-auto flex h-fit w-[95vw] justify-between px-8 py-12 sm:w-[98vw] sm:px-16 ${textColor}`}
    >
      <Link href={"/"}>
        {colorOption === "standard" && (
          <Image
            className="Logo max-w-44 cursor-pointer transition-transform duration-300 hover:scale-105"
            src="/sfjs-updated-logo.svg"
            width={229}
            height={75}
            alt="Straightforward Job Site logo"
          />
        )}
        {colorOption === "highContrast" && (
          <Image
            className="Logo max-w-44 cursor-pointer transition-transform duration-300 hover:scale-105"
            src="/hollow-sfjs-logo.svg"
            width={229}
            height={75}
            alt="Straightforward Job Site logo"
          />
        )}
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
        } else if (pageType === "Job Creation") {
          // JOB CREATION NAV BAR
          return (
            <div className="TellUsAboutYou">
              <p className="TellAboutYouTitle">
                tell us more about your open position!
              </p>
            </div>
          );
        } else if (pageType === "Business Signup") {
          // INDIVIDUAL SIGNUP NAV BAR
          return (
            <div className="TellUsAboutYou">
              <p className="TellAboutYouTitle">
                tell us more about your business!
              </p>
            </div>
          );
        } else if (accountType === "Fellow" && isLoggedIn === true) {
          // INDIVIDUAL NAV BAR
          return (
            <div className="NavButtonContainer hidden items-end gap-4 lg:flex lg:flex-row lg:items-center lg:max-lg:-mr-8">
              <NavButton
                onClick={handleNavButtonClick}
                colorScheme="b4"
                title="mailbox"
                clickedButton={clickedButton}
              />
              <Link href={"/job-board"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme="e5"
                  title="jobs"
                  clickedButton={clickedButton}
                />
              </Link>
              <Link href={"/saved-jobs"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme="d4"
                  title="saved"
                  clickedButton={clickedButton}
                />
              </Link>
              <NavButton
                onClick={handleNavButtonClick}
                colorScheme="f3"
                title="applications"
                clickedButton={clickedButton}
              />
              <Link href={"/settings"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme="b6"
                  title="settings"
                  clickedButton={clickedButton}
                />
              </Link>
              <Link href={"/profile"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme={fellow?.colorScheme as ButtonColorOption}
                  title="account"
                  clickedButton={clickedButton}
                  variant="avatar"
                  size="mediumCircle"
                  addImage={
                    colorOption === "highContrast"
                      ? fellow?.buttonImg.highContrast
                      : fellow?.buttonImg.standard
                  }
                />
              </Link>
            </div>
          );
        } else if (accountType === "Business" && isLoggedIn === true) {
          // BUSINESS NAV BAR
          return (
            <div className="NavButtonContainer hidden items-end gap-4 lg:flex lg:flex-row lg:items-center lg:max-lg:-mr-8">
              <NavButton
                onClick={handleNavButtonClick}
                colorScheme="b4"
                title="mailbox"
                clickedButton={clickedButton}
              />
              <NavButton
                onClick={() => showModal(<PostAJobModal />)}
                colorScheme="e5"
                title="post a job"
                clickedButton={clickedButton}
              />
              <NavButton
                onClick={handleNavButtonClick}
                colorScheme="f3"
                title="ams"
                clickedButton={clickedButton}
              />
              <Link href={"/settings"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme="b6"
                  title="settings"
                  clickedButton={clickedButton}
                />
              </Link>
              <Link href={"/profile"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme={business?.colorScheme as ButtonColorOption}
                  title="account"
                  clickedButton={clickedButton}
                  variant="avatar"
                  size="mediumCircle"
                  addImage={business?.buttonImg}
                />
              </Link>
            </div>
          );
        } else {
          return (
            // STANDARD / MAIN NAV BAR
            <div className="NavButtonContainer hidden items-end gap-4 lg:flex lg:flex-row lg:items-center lg:max-lg:-mr-8">
              <NavButton
                onClick={handleNavButtonClick}
                colorScheme="b4"
                title="about"
                clickedButton={clickedButton}
              />
              <NavButton
                onClick={() => showModal(<LoginModal />)}
                colorScheme="e5"
                title="login"
                clickedButton={clickedButton}
              />
              <Link href={"/pricing"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme="d4"
                  title="pricing"
                  clickedButton={clickedButton}
                />
              </Link>
              <NavButton
                onClick={() => showModal(<SignupOptionsModal />)}
                colorScheme="f3"
                title="signup"
                clickedButton={clickedButton}
              />
            </div>
          );
        }
      })()}
    </div>
  );
}
