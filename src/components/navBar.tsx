"use client";

import { useState, useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { useColors } from "@/contexts/ColorContext";

import Image from "next/image";
import Link from "next/link";
import LoginModal from "./modals/loginModal";
import SignupOptionsModal from "./modals/signupModals/signupOptionsModal";
import NavButton from "./buttonsAndLabels/navButton";
import PostAJobModal from "./modals/postAJobModals/postAJobModal";
import SiteLabel from "./buttonsAndLabels/siteLabel";

import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { avatarOptions } from "@/lib/stylingData/avatarOptions";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";

export default function NavBar() {
  const { showModal } = useModal();
  const { currentPage, pageType, accountType, isLoggedIn } = usePageContext();
  const { fellow } = useFellow();
  const [clickedButton, setClickedButton] = useState("");
  const { business } = useBusiness();
  const { colorOption } = useColors();
  const { textColor } = useColorOptions();
  const { dailyLimit } = useFellow();

  function handleNavButtonClick(e: any) {
    setClickedButton(clickedButton === e.target.value ? "" : e.target.value);
  }

  let avatarDetails;
  if (accountType === "Fellow") {
    avatarDetails = avatarOptions.find(
      (option) => option.title === fellow?.avatar,
    );
  } else if (accountType === "Business") {
    avatarDetails = avatarOptions.find(
      (option) => option.title === business?.avatar,
    );
  }

  useEffect(() => {
    // if (currentPage === "profile" && )
    setClickedButton(currentPage);
  }, [currentPage]);

  return (
    <div
      className={`NavBar mx-auto flex h-fit w-[100%] items-start justify-between px-14 py-10 ${textColor}`}
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
            src="/hc-sfjs-logo.svg"
            width={229}
            height={75}
            alt="Straightforward Job Site logo"
          />
          // <Image
          //   className="Logo max-w-44 cursor-pointer transition-transform duration-300 hover:scale-105"
          //   src="/hollow-sfjs-logo.svg"
          //   width={229}
          //   height={75}
          //   alt="Straightforward Job Site logo"
          // />
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
          // BUSINESS SIGNUP NAV BAR
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
              {/* I'm not sure if the daily apps should be the amount that have been submitted or if it should show the ones remaining for the day */}
              <SiteLabel aria="dailyApps" variant="hollow" size="small">
                daily apps: 2/5
                {/* {dailyLimit?.count} */}
              </SiteLabel>
              {/* <NavButton
                onClick={handleNavButtonClick}
                colorScheme="b4"
                title="mailbox"
                clickedButton={clickedButton}
              /> */}

              <Link href={"/job-board"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme="b4"
                  title="jobs"
                  clickedButton={clickedButton || currentPage}
                />
              </Link>
              <Link href={"/saved-jobs"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme="d4"
                  title="saved"
                  clickedButton={clickedButton || currentPage}
                />
              </Link>

              <Link href={"/ams"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme="f3"
                  title="applications"
                  clickedButton={clickedButton || currentPage}
                />
              </Link>
              <Link href={"/messages"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme="d1"
                  title="mail"
                  clickedButton={clickedButton || currentPage}
                />
              </Link>
              <Link href={"/calendar"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme="b3"
                  title="calendar"
                  clickedButton={clickedButton || currentPage}
                />
              </Link>
              <Link href={"/settings"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme="c4"
                  title="settings"
                  clickedButton={clickedButton || currentPage}
                />
              </Link>
              <Link href={"/profile"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme={avatarDetails?.colorScheme as ButtonColorOption}
                  title="fellowProfile"
                  clickedButton={clickedButton || currentPage}
                  variant="avatar"
                  size="mediumCircle"
                  addImage={`${colorOption === "standard" ? avatarDetails?.img.standard : avatarDetails?.img.highContrast}`}
                />
              </Link>
            </div>
          );
        } else if (accountType === "Business" && isLoggedIn === true) {
          // BUSINESS NAV BAR
          return (
            <div className="NavButtonContainer hidden items-end gap-4 lg:flex lg:flex-row lg:items-center lg:max-lg:-mr-8">
              <Link href="/calendar">
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme="b4"
                  title="calendar"
                  clickedButton={clickedButton || currentPage}
                />
              </Link>
              <Link href={"/messages"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme="d4"
                  title="mailbox"
                  clickedButton={clickedButton || currentPage}
                />
              </Link>
              <NavButton
                onClick={() => showModal(<PostAJobModal />)}
                colorScheme="e5"
                title="post a job"
                clickedButton={clickedButton || currentPage}
              />
              <Link href={"/ams"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme="f3"
                  title="application manager"
                  clickedButton={clickedButton || currentPage}
                />
              </Link>
              <Link href={"/settings"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme="b6"
                  title="settings"
                  clickedButton={clickedButton || currentPage}
                />
              </Link>
              <Link href={"/profile"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme={avatarDetails?.colorScheme as ButtonColorOption}
                  title="businessProfile"
                  clickedButton={clickedButton || currentPage}
                  variant="avatar"
                  size="mediumCircle"
                  addImage={`${colorOption === "standard" ? avatarDetails?.img.standard : avatarDetails?.img.highContrast}`}
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
                clickedButton={clickedButton || currentPage}
              />
              <NavButton
                onClick={() => showModal(<LoginModal />)}
                colorScheme="e5"
                title="login"
                clickedButton={clickedButton || currentPage}
              />
              <Link href={"/pricing"}>
                <NavButton
                  onClick={handleNavButtonClick}
                  colorScheme="d4"
                  title="pricing"
                  clickedButton={clickedButton || currentPage}
                />
              </Link>
              <NavButton
                onClick={() => showModal(<SignupOptionsModal />)}
                colorScheme="f3"
                title="signup"
                clickedButton={clickedButton || currentPage}
              />
            </div>
          );
        }
      })()}
    </div>
  );
}
