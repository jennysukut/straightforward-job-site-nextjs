"use client";

import { useState } from "react";

import Image from "next/image";
import SiteButton from "@/components/siteButton";
import InfoBox from "@/components/infoBox";

import { pricingDetails } from "@/lib/siteCopy/pricingDetails";

type Category = "individual" | "business";

export default function PricingPage() {
  const [category, setCategory] = useState("");
  const [showListingQuestion, setShowListingQuestion] = useState(false);
  const [showInactiveDetails, setShowInactiveDetails] = useState(false);
  const [showDumbQuestion, setShowDumbQuestion] = useState(false);
  const [dumb, setDumb] = useState(false);

  function handleClick(buttonType: Category) {
    if (buttonType === category) {
      setCategory("");
    } else {
      setCategory(buttonType);
      setShowInactiveDetails(false);
      setShowDumbQuestion(false);
      setDumb(false);
      if (buttonType === "business") {
        setTimeout(() => {
          setShowListingQuestion(true);
        }, 1500);
      }
    }
  }

  function inactiveListingClick() {
    if (showInactiveDetails) {
      setShowInactiveDetails(false);
      setShowDumbQuestion(false);
      setDumb(false);
    } else {
      setShowInactiveDetails(true);
      setTimeout(() => {
        setShowDumbQuestion(true);
      }, 1500);
    }
  }

  function handleDumbClick() {
    setDumb(!dumb);
  }

  return (
    <div className="PricingPage flex w-[95vw] max-w-[1600px] flex-col self-center p-10 pb-4 sm:w-[75vw] sm:p-14">
      <div className="PricingTitleContainer flex flex-col self-start text-left">
        <h1 className="PricingTitle">our straightforward pricing:</h1>
        <p className="PricingSubtitle mt-8 w-[70%] self-end text-right text-sm italic sm:w-full sm:text-left sm:text-lg md:mt-4">
          {`because that's how all pricing should be`}
        </p>
      </div>
      <div className="PricingOptions flex flex-col items-center gap-8 self-center pt-12 sm:gap-12 md:flex-row">
        <SiteButton
          aria="features for businesses"
          size="extraLarge"
          variant="filled"
          colorScheme="b3"
          addClasses="sm:w-[20rem]"
          onClick={() => handleClick("business")}
        >
          for businesses
        </SiteButton>

        {/* business pricing details - MOBILE*/}
        {category === "business" && (
          <div className="BusinessInfo flex flex-col items-center md:hidden">
            <InfoBox
              aria="business pricing"
              variant="filled"
              colorScheme="b3"
              textSize="medium"
              size="large"
              addClasses="self-center text-center leading-6 mb-8"
              className="BusinessPricing"
            >
              <p className="PricingDetail">
                We have a no-nonsense flat-rate pricing:
              </p>
              <p className="PricingDetail py-2">
                $400/month for each active job listing
              </p>
              <p className="PricingDetail font-medium italic">
                This includes our qualified applicant filtering and integrated
                Application Management System.
              </p>
            </InfoBox>
            <div
              className={`transition-opacity duration-500 ease-in-out ${showListingQuestion ? "opacity-100" : "opacity-0"} self-start`}
            >
              <SiteButton
                aria="inactive job question"
                variant="filled"
                colorScheme="f3"
                onClick={() => inactiveListingClick()}
                addClasses="px-8"
              >
                what if a job listing is inactive?
              </SiteButton>
            </div>

            <div className="PricingDetailsContainer flex max-w-[40rem] flex-col items-center justify-between lg:flex-row-reverse">
              <div className="InactiveDetailsContainer flex flex-col self-end">
                {showInactiveDetails && (
                  <InfoBox
                    aria="inactive job details"
                    variant="filled"
                    colorScheme="f3"
                    textSize="medium"
                    size="large"
                    addClasses="mt-8 text-center max-w-[26rem] self-end py-12 px-14"
                  >
                    {pricingDetails.inactiveJobDetails.map((detail, index) => (
                      <p key={index} className="mb-2">
                        {detail}
                      </p>
                    ))}
                  </InfoBox>
                )}
                <div
                  className={`self-end pt-8 transition-opacity duration-500 ease-in-out ${showInactiveDetails && showDumbQuestion ? "opacity-100" : "opacity-0"}`}
                >
                  <SiteButton
                    aria="inactive job question"
                    variant="filled"
                    colorScheme="a5"
                    onClick={handleDumbClick}
                    addClasses="px-8"
                  >
                    {dumb
                      ? "nevermind, I was just being silly."
                      : "...but what if I want to have a job post without actually hiring?"}
                  </SiteButton>
                </div>
              </div>
              <Image
                width={200}
                height={100}
                alt="dumb"
                src="/wait-what.gif"
                className={`mr-12 self-end rounded-3xl drop-shadow-lilac ${dumb ? "flex" : "hidden"} mb-12 mt-8 md:mt-0`}
              ></Image>
            </div>
          </div>
        )}
        <SiteButton
          aria="features for job seekers"
          size="extraLarge"
          variant="filled"
          colorScheme="c4"
          addClasses={`sm:w-[20rem] ${category === "" ? "mb-20 sm:mb-0" : ""}`}
          onClick={() => handleClick("individual")}
        >
          for job-seekers
        </SiteButton>

        {/* individual pricing details - MOBILE*/}
        {category === "individual" && (
          <div className="IndividualPricing md:hidden">
            <InfoBox
              aria="individual pricing"
              variant="filled"
              colorScheme="c4"
              textSize="medium"
              size="large"
              className="BusinessPricing self-end"
              addClasses="self-start text-center leading-6 mb-8"
            >
              <p className="PricingDetails py-2">
                {`Our pricing model is pay-what-you-want!`}
              </p>
              <p className="PricingDetails py-2 font-medium italic">
                {`We know our site and the common-sense tools it offers are
              valuable, but we are all too familiar with the fact that often
              those who most need the tools are unable to afford them.`}
              </p>
              <p className="PricingDetails py-2">
                {`That's why we're making the amount up to you!`}
              </p>
              <p className="PricingDetails py-2">
                {`Every single job-seeker who uses our site has access to all our
              features, despite what their budget might look like.`}
              </p>
            </InfoBox>
          </div>
        )}
      </div>

      <div className="PricingDetails hidden gap-12 self-center pt-12 md:flex">
        {/* individual pricing details */}
        {category === "individual" && (
          <InfoBox
            aria="individual pricing"
            variant="filled"
            colorScheme="c4"
            textSize="medium"
            className="BusinessPricing self-end"
            addClasses="self-start text-center py-12 leading-6 mb-8"
          >
            <p className="PricingDetails py-2">
              {`Our pricing model is pay-what-you-want!`}
            </p>
            <p className="PricingDetails py-2 font-medium italic">
              {`We know our site and the common-sense tools it offers are
              valuable, but we are all too familiar with the fact that often
              those who most need the tools are unable to afford them.`}
            </p>
            <p className="PricingDetails py-2">
              {`That's why we're making the amount up to you!`}
            </p>
            <p className="PricingDetails py-2">
              {`Every single job-seeker who uses our site has access to all our
              features, despite what their budget might look like.`}
            </p>
          </InfoBox>
        )}

        {/* business pricing details */}
        {category === "business" && (
          <div className="BusinessInfo hidden flex-col items-center md:flex">
            <InfoBox
              aria="business pricing"
              variant="filled"
              colorScheme="b3"
              textSize="medium"
              addClasses="self-center text-center py-12 leading-6 mb-8"
              className="BusinessPricing"
            >
              <p className="PricingDetail">
                We have a no-nonsense flat-rate pricing:
              </p>
              <p className="PricingDetail py-2">
                $400/month for each active job listing
              </p>
              <p className="PricingDetail font-medium italic">
                This includes our qualified applicant filtering and integrated
                Application Management System.
              </p>
            </InfoBox>
            <div
              className={`transition-opacity duration-500 ease-in-out ${showListingQuestion ? "opacity-100" : "opacity-0"} self-start`}
            >
              <SiteButton
                aria="inactive job question"
                variant="filled"
                colorScheme="f3"
                onClick={() => inactiveListingClick()}
                addClasses="px-8"
              >
                what if a job listing is inactive?
              </SiteButton>
            </div>

            <div className="PricingDetailsContainer flex max-w-[40rem] flex-col items-center justify-between lg:flex-row-reverse">
              <div className="InactiveDetailsContainer flex flex-col self-end">
                {showInactiveDetails && (
                  <InfoBox
                    aria="inactive job details"
                    variant="filled"
                    colorScheme="f3"
                    textSize="medium"
                    addClasses="mt-8 text-center max-w-[26rem] self-end py-12 px-14"
                  >
                    {pricingDetails.inactiveJobDetails.map((detail, index) => (
                      <p key={index} className="mb-2">
                        {detail}
                      </p>
                    ))}
                  </InfoBox>
                )}
                <div
                  className={`self-end pt-8 transition-opacity duration-500 ease-in-out ${showInactiveDetails && showDumbQuestion ? "opacity-100" : "opacity-0"}`}
                >
                  <SiteButton
                    aria="inactive job question"
                    variant="filled"
                    colorScheme="a5"
                    onClick={handleDumbClick}
                    addClasses="px-8"
                  >
                    {dumb
                      ? "nevermind, I was just being silly."
                      : "...but what if I want to have a job post without actually hiring?"}
                  </SiteButton>
                </div>
              </div>
              <Image
                width={200}
                height={100}
                alt="dumb"
                src="/wait-what.gif"
                className={`mr-12 self-end rounded-3xl drop-shadow-lilac ${dumb ? "opacity-100" : "opacity-0"} mb-12 mt-8 lg:mt-0`}
              ></Image>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
