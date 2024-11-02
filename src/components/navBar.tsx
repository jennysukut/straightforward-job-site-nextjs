"use client";

import Image from "next/image";
import SiteButton from "./siteButton";
import Link from "next/link";
import { useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import LoginModal from "./modals/loginModal";
import SignupOptionsModal from "./modals/signupModals/signupOptionsModal";
import { usePageContext } from "@/contexts/PageContext";

export default function NavBar() {
  const [aboutClicked, setAboutClicked] = useState(false);
  const [clickedButton, setClickedButton] = useState("");
  const { showModal } = useModal();
  const { pageType } = usePageContext();

  function handleNavButtonClick(e: any) {
    setClickedButton(clickedButton === e.target.value ? "" : e.target.value);
  }

  // 3. Conditional Rendering:
  // Use state or context: In your navbar component, use state or context to determine which navbar to render
  //based on the current route or user permissions.
  console.log(pageType);

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
      {pageType === "Individual Signup" ? (
        <div className="TellUsAboutYou">
          <p className="TellAboutYouTitle">tell us more about you!</p>
        </div>
      ) : (
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
              isSelected={clickedButton === "pricing"}
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
      )}
      {/* Main / Standard Nav Buttons */}
      {/* <div className="NavButtonContainer hidden items-end gap-4 lg:flex lg:flex-row lg:items-center lg:max-lg:-mr-8">
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
            isSelected={clickedButton === "pricing"}
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
      </div> */}
    </div>
  );
}
