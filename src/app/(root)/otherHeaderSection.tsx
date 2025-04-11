import { useModal } from "@/contexts/ModalContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePageContext } from "@/contexts/PageContext";
import { useState, useEffect } from "react";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import ButtonContainer from "@/components/buttonsAndLabels/buttonContainer";
import Image from "next/image";
import MotionContainer from "@/components/motionContainer";
import Link from "next/link";
import SignupOptionsModal from "@/components/modals/signupModals/signupOptionsModal";
import PostAJobModal from "@/components/modals/postAJobModals/postAJobModal";

function OtherHeaderSection() {
  const descriptorList = ["simple", "honest", "personal", "colorful", "human."];

  const { showModal } = useModal();
  const { accountType, isLoggedIn } = usePageContext();
  const [currentDescriptor, setCurrentDescriptor] = useState(descriptorList[0]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [clickedButton, setClickedButton] = useState("");
  const router = useRouter();

  const buttonOption = !isLoggedIn
    ? "Standard"
    : isLoggedIn && accountType === "Fellow"
      ? "Fellow"
      : "Business";

  const motionItem = {
    start: { opacity: 0, x: -100 },
    move: {
      x: [
        -100, 0, -20, 0, -20, 5, -20, 0, -30, 0, -20, 5, -20, 0, -30, 0, -20, 0,
        -20, 0,
      ],
      opacity: 1,
      transition: {
        opacity: {
          duration: 0.74,
          ease: "easeInOut",
          delay: 1,
        },
        x: {
          type: "tween",
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        },
      },
    },
  };

  useEffect(() => {
    if (currentDescriptor !== descriptorList[descriptorList.length - 1]) {
      const transitionInterval = setInterval(() => {
        setIsFlipping(true);

        const changeWordTimeout = setTimeout(() => {
          setCurrentDescriptor((prev) => {
            const currentIndex = descriptorList.indexOf(prev);
            const nextIndex = currentIndex + 1;
            return descriptorList[nextIndex];
          });
          setIsFlipping(false);
        }, 500); // Half a second for flip animation

        return () => clearTimeout(changeWordTimeout);
      }, 1500);

      return () => clearInterval(transitionInterval);
    } else {
      setCurrentDescriptor("human.");
    }
  }, [isFlipping]);

  const buttonClick = (keyword: string) => {
    if (keyword === "mail/features") {
      setClickedButton("mail/features");
      if (!isLoggedIn) {
        router.push(`/features`);
      } else {
        router.push(`/messages`);
      }
    } else if (keyword === "different/manage") {
      setClickedButton("different/manage");
      if (isLoggedIn) {
        router.push(`/ams`);
      } else if (!isLoggedIn) {
        router.push(`/difference`);
      }
    } else if (keyword === "signup/post/explore") {
      setClickedButton("signup/post/explore");
      if (!isLoggedIn) {
        showModal(<SignupOptionsModal />);
      } else if (accountType === "Fellow") {
        router.push(`/job-board`);
      } else if (accountType === "Business") {
        showModal(<PostAJobModal />);
      }
    }
  };

  return (
    <section className="HeaderSection z-10 mt-4 flex w-full flex-col gap-2 self-center align-middle">
      <div className="TitleSection flex justify-between gap-4 self-center">
        <h1 className="Title self-start text-[3.5rem] tracking-widest text-midnight">
          {/* where hiring is{" "} */}
          hiring, but more{" "}
        </h1>

        <div className="RotatingWordContainer -mb-4 mt-0 w-[17vw]">
          <h1
            className={`inline-block font-serif text-[4.5rem] font-semibold tracking-normal text-midnight transition-all duration-500 ${
              isFlipping
                ? "-rotate-x-90 -translate-y-2 opacity-0"
                : "rotate-x-0 translate-y-0 opacity-100"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {currentDescriptor}
          </h1>
        </div>
      </div>
      <div className="Buttons mb-20 ml-4 mt-4 flex gap-6 self-center">
        <motion.div
          initial="start"
          variants={motionItem}
          viewport={{ once: false }}
          whileInView="move"
          className="mt-8 align-middle"
        >
          <Image
            width={50}
            height={30}
            alt="arrow"
            src="/PointArrow.svg"
            className="mt-4 align-middle"
          ></Image>
        </motion.div>
        <MotionContainer addClasses=" flex gap-6">
          <SiteButton
            variant="filled"
            aria={!isLoggedIn ? "what makes us different?" : "ams"}
            colorScheme="b4"
            size="medium"
            onClick={() => buttonClick("different/manage")}
            isSelected={clickedButton === "different/manage"}
          >
            {buttonOption === "Standard" && "what makes us different?"}
            {buttonOption === "Business" && "manage your listings"}
            {buttonOption === "Fellow" && "manage your applications"}
          </SiteButton>
          <SiteButton
            variant="filled"
            aria={!isLoggedIn ? "features" : "mail"}
            size="medium"
            colorScheme="c4"
            onClick={() => buttonClick("mail/features")}
            isSelected={clickedButton === "mail/features"}
          >
            {buttonOption === "Standard" && "check out our features"}
            {(buttonOption === "Business" || buttonOption === "Fellow") &&
              "check your mail"}
          </SiteButton>
          <SiteButton
            variant="filled"
            aria={!isLoggedIn ? "signup" : "jobs"}
            size="medium"
            colorScheme="b6"
            onClick={() => buttonClick("signup/post/explore")}
            isSelected={clickedButton === "signup/post/explore"}
          >
            {buttonOption === "Standard" && "sign up!"}
            {buttonOption === "Business" && "post a job"}
            {buttonOption === "Fellow" && "explore jobs"}
          </SiteButton>
        </MotionContainer>
      </div>
    </section>
  );
}

export default OtherHeaderSection;
