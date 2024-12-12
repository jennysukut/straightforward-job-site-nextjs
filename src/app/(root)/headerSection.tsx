import { useModal } from "@/contexts/ModalContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { usePageContext } from "@/contexts/PageContext";
import Link from "next/link";

import SiteButton from "@/components/siteButton";
import ButtonContainer from "@/components/buttonContainer";
import SignupOptionsModal from "@/components/modals/signupModals/signupOptionsModal";

function HeaderSection() {
  const { showModal } = useModal();
  const { titleColor } = useColorOptions();
  const { accountType } = usePageContext();
  return (
    <section className="HeaderSection items-left flex w-full flex-grow flex-col gap-4">
      <h1
        className={`LandingPageText max-w-[800px] pl-4 text-[1.5rem] font-bold leading-10 ${titleColor} sm:text-[1.7rem]`}
      >
        our mission: to make hiring human with simplicity, honesty, and
        transparency.
      </h1>
      {/* LoggedIn Fellow Buttons */}
      {accountType === "Individual" && (
        <ButtonContainer addClasses="justify-center flex items-end pr-6 sm:pr-0 flex-col sm:flex-row sm:justify-start">
          <Link href={"/profile"}>
            <SiteButton
              aria="sign up"
              size="large"
              variant="filled"
              colorScheme="b1"
            >
              view your applications
            </SiteButton>
          </Link>
          <SiteButton
            aria="support us"
            size="large"
            variant="filled"
            colorScheme="f1"
          >
            explore jobs
          </SiteButton>
        </ButtonContainer>
      )}
      {/* Main Buttons */}

      {accountType !== "Individual" && accountType !== "Business" && (
        <ButtonContainer addClasses="justify-center flex items-end pr-6 sm:pr-0 flex-col sm:flex-row sm:justify-start">
          <SiteButton
            aria="sign up"
            size="large"
            variant="filled"
            colorScheme="b1"
            onClick={() => showModal(<SignupOptionsModal />)}
          >
            sign up
          </SiteButton>
          <SiteButton
            aria="support us"
            size="large"
            variant="filled"
            colorScheme="e5"
          >
            learn more
          </SiteButton>
          <SiteButton
            aria="support us"
            size="large"
            variant="filled"
            colorScheme="f1"
          >
            explore jobs
          </SiteButton>
        </ButtonContainer>
      )}
    </section>
  );
}

export default HeaderSection;
