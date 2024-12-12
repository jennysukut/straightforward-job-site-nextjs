"use client";

import React from "react";
import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";
import { useBusiness } from "@/contexts/BusinessContext";

import FellowProfile from "@/components/fellowProfile";
import BusinessProfile from "@/components/businessProfile";

export default function Profile() {
  const {
    setCurrentPage,
    setPageType,
    accountType,
    isLoggedIn,
    setIsLoggedIn,
  } = usePageContext();
  const { fellow } = useFellow();
  const { business } = useBusiness();

  // Set the page type to individual or business here and render different profiles based on this
  // Once we have signup and login working, we'll be able to grab data on
  // who's logged in and use that to set these details
  useEffect(() => {
    setCurrentPage("Profile");
    if (accountType === "Fellow") {
      setPageType("Individual");
      setIsLoggedIn(true);
    } else if (accountType === "Business") {
      setPageType("Business");
      setIsLoggedIn(true);
    }
  }, [setCurrentPage, setPageType, accountType]);

  console.log(accountType, isLoggedIn);
  return (
    <div className="Profile flex flex-grow flex-col items-center gap-8 pt-14 md:pb-12 md:pt-6">
      {accountType === "Individual" && <FellowProfile fellow={fellow} isOwn />}
      {accountType === "Business" && (
        <BusinessProfile business={business} isOwn />
      )}
    </div>
  );
}
