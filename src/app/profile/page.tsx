"use client";

import React from "react";
import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";
import InfoBox from "@/components/infoBox";
import { useFellow } from "@/contexts/FellowContext";
import Avatar from "@/components/avatarComponent";

export default function Home() {
  const { setCurrentPage, setPageType } = usePageContext();
  const { fellow, setFellow } = useFellow();

  useEffect(() => {
    setCurrentPage("Profile");
    setPageType("Individual");
  }, [setCurrentPage, setPageType]);

  return (
    <div className="Profile flex flex-grow flex-col items-center gap-8 pt-14 md:pb-12 md:pt-6">
      <div className="ProfileContainer flex w-[84%] max-w-[1600px] flex-col gap-8 md:w-[75%]">
        {/* NAME AND SMALL BIO */}
        <div className="FellowName self-end">
          <InfoBox
            aria="fellow"
            variant="hollow"
            addClasses="flex gap-8 justify-between"
            size="profile"
          >
            <Avatar addClasses="self-center" />
            <div className="NameBioContainer">
              <h1 className="Name">{fellow?.name}</h1>
              <p className="SmallBio pt-4 leading-6">
                {`Someone's small bio would go here. We just have to set it with
                the context and display here!`}
              </p>
            </div>
          </InfoBox>
        </div>
        {/* PROFILE DETAILS */}
        <div className="ProfileDetails flex">
          <div className="ProfileLeftColumn flex flex-col gap-8">
            <InfoBox
              variant="hollow"
              aria="skills"
              size="profile"
              width="small"
            >
              Skills List Goes Here
            </InfoBox>
            <InfoBox
              variant="hollow"
              aria="education"
              size="profile"
              width="small"
            >
              Education Info Goes Here
            </InfoBox>
            <InfoBox
              variant="hollow"
              aria="experience"
              size="profile"
              width="small"
            >
              Experience Info Goes Here
            </InfoBox>
            <InfoBox
              variant="hollow"
              aria="awards"
              size="profile"
              width="small"
            >
              Awards + Honors Info Goes Here
            </InfoBox>
            <InfoBox
              variant="hollow"
              aria="expLevels"
              size="profile"
              width="small"
            >
              Experience Levels Info Goes Here
            </InfoBox>
            <InfoBox
              variant="hollow"
              aria="bookOrQuote"
              size="profile"
              width="small"
            >
              BookOrQuote Info Goes Here
            </InfoBox>
          </div>
          <div className="ProfileRightColumn flex flex-col gap-8">
            <InfoBox
              variant="hollow"
              aria="location"
              size="profile"
              width="medium"
            >
              Location Info Goes Here
            </InfoBox>
          </div>
        </div>
      </div>
    </div>
  );
}
