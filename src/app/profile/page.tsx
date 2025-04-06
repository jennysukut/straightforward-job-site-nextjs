"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { useColors } from "@/contexts/ColorContext";
import { useRouter } from "next/navigation";

import { removeCookie } from "@/components/buttonsAndLabels/logoutButton";

import React from "react";
import BusinessProfile from "@/components/pages/businessProfile/businessProfile";
import FellowProfile from "@/components/pages/fellowProfile/fellowProfile";

export default function Profile() {
  const {
    setCurrentPage,
    pageType,
    setPageType,
    accountType,
    isLoggedIn,
    setIsLoggedIn,
    setIsLoggingOut,
    setAccountType,
  } = usePageContext();
  const { fellow } = useFellow();
  const { business } = useBusiness();
  const router = useRouter();
  const [loadingData, setLoadingData] = useState(true);

  const logout = () => {
    setIsLoggingOut(true);
    console.log("trying to log out from the profile page");
    removeCookie("accessToken");
    // THIS WORKS!!!!
    setIsLoggedIn(false);
    setAccountType("");
    router.push(`/`);
  };

  useEffect(() => {
    if (accountType === "Fellow" && pageType !== "Fellow") {
      setPageType("Fellow");
      setCurrentPage("fellowProfile");
    } else if (accountType === "Business" && pageType !== "Business") {
      setPageType("Business");
      setCurrentPage("businessProfile");
    }
  }, [isLoggedIn, accountType, pageType, setCurrentPage, setPageType, router]);

  useEffect(() => {
    setLoadingData(false);
  }, [fellow, business]);

  return (
    <div className="Profile flex flex-grow flex-col items-center gap-8 md:pb-12 md:pt-3">
      {loadingData ? (
        //make loading screen design here
        <div className="LoadingText text-olive">Loading...</div>
      ) : (
        <div className="ProfilePage">
          {isLoggedIn && accountType === "Fellow" && (
            <FellowProfile self={fellow} isOwn logout={logout} />
          )}
          {isLoggedIn && accountType === "Business" && (
            <BusinessProfile self={business} isOwn logout={logout} />
          )}
        </div>
      )}
    </div>
  );
}
