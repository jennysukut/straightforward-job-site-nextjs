import { useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { usePageContext } from "@/contexts/PageContext";
import { useColors } from "@/contexts/ColorContext";
import Link from "next/link";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import ButtonContainer from "@/components/buttonsAndLabels/buttonContainer";
import SignupOptionsModal from "@/components/modals/signupModals/signupOptionsModal";
import PostAJobModal from "@/components/modals/postAJobModals/postAJobModal";

function HeaderSection() {
  const { showModal } = useModal();
  const { titleColor } = useColorOptions();
  const { colorOption } = useColors();
  const { setPageType, accountType, isLoggedIn } = usePageContext();

  useEffect(() => {
    setPageType("main");
  }, []);
  return (
    <section className="HeaderSection items-left flex w-full flex-grow flex-col gap-4">
      <h1
        className={`LandingPageText max-w-[800px] pl-4 text-[1.5rem] font-bold leading-10 ${titleColor} sm:text-[1.7rem]`}
      >
        our mission: to make hiring human with simplicity, honesty, and
        transparency.
      </h1>
      {/* LoggedIn Fellow Buttons */}
      {accountType === "Fellow" && isLoggedIn === true && (
        <ButtonContainer addClasses="justify-center flex items-end pr-6 sm:pr-0 flex-col sm:flex-row sm:justify-start">
          <Link href={"/profile"}>
            <SiteButton aria="sign up" size="large" colorScheme="b1">
              manage your applications
            </SiteButton>
          </Link>
          <SiteButton aria="support us" size="large" colorScheme="e5">
            check your mail
          </SiteButton>
          <Link href={"/job-board"}>
            <SiteButton aria="support us" size="large" colorScheme="f1">
              explore jobs
            </SiteButton>
          </Link>
        </ButtonContainer>
      )}

      {/* LoggedIn Business Buttons */}
      {accountType === "Business" && isLoggedIn === true && (
        <ButtonContainer addClasses="justify-center flex items-end pr-6 sm:pr-0 flex-col sm:flex-row sm:justify-start">
          <Link href={"/profile"}>
            <SiteButton aria="sign up" size="large" colorScheme="b1">
              manage your listings
            </SiteButton>
          </Link>
          <SiteButton aria="support us" size="large" colorScheme="e5">
            check your mail
          </SiteButton>
          <SiteButton
            aria="support us"
            size="large"
            colorScheme="f1"
            onClick={() => showModal(<PostAJobModal />)}
          >
            post a job
          </SiteButton>
        </ButtonContainer>
      )}

      {/* Main Buttons */}
      {isLoggedIn === false && (
        <ButtonContainer addClasses="justify-center flex items-end pr-6 sm:pr-0 flex-col sm:flex-row sm:justify-start">
          <SiteButton
            aria="sign up"
            size="large"
            colorScheme="b1"
            onClick={() => showModal(<SignupOptionsModal />)}
          >
            sign up
          </SiteButton>
          <SiteButton aria="support us" size="large" colorScheme="e5">
            learn more
          </SiteButton>
          <Link href={"/job-board"}>
            <SiteButton aria="support us" size="large" colorScheme="f1">
              explore jobs
            </SiteButton>
          </Link>
        </ButtonContainer>
      )}
    </section>
  );
}

export default HeaderSection;
