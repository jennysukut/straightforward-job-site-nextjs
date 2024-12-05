"use client";

import React from "react";
import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";

import Avatar from "@/components/avatarComponent";
import InfoBox from "@/components/infoBox";
import SiteLabel from "@/components/siteLabel";
import ShuffleIdealButtonPattern from "@/components/shuffleIdealButtonPattern";
import FellowProfile from "@/components/fellowProfile";

export default function Home() {
  const { setCurrentPage, setPageType } = usePageContext();
  const { fellow, setFellow } = useFellow();

  const [primaryColorArray, setPrimaryColorArray] = useState(Array<any>);
  const [secondaryColorArray, setSecondaryColorArray] = useState(Array<any>);

  useEffect(() => {
    setCurrentPage("Profile");
    setPageType("Individual");
    ShuffleIdealButtonPattern(setPrimaryColorArray);
    ShuffleIdealButtonPattern(setSecondaryColorArray);
  }, [setCurrentPage, setPageType]);

  return (
    <div className="Profile flex flex-grow flex-col items-center gap-8 pt-14 md:pb-12 md:pt-6">
      <FellowProfile />
    </div>
  );
}
