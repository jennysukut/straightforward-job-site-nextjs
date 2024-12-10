"use client";

import React from "react";
import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";
import { useBusiness } from "@/contexts/BusinessContext";

import FellowProfile from "@/components/fellowProfile";
import BusinessProfile from "@/components/businessProfile";

export default function Home() {
  const { setCurrentPage, setPageType, accountType } = usePageContext();
  const { fellow } = useFellow();
  const { business } = useBusiness();

  // Set the page type to individual or business here and render different profiles based on this
  useEffect(() => {
    setCurrentPage("Profile");
    if (accountType === "Fellow") {
      setPageType("Individual");
    } else if (accountType === "Business") {
      setPageType("Business");
    }
  }, [setCurrentPage, setPageType, accountType]);

  return (
    <div className="Profile flex flex-grow flex-col items-center gap-8 pt-14 md:pb-12 md:pt-6">
      {accountType === "Fellow" && <FellowProfile fellow={fellow} isOwn />}
      {accountType === "Business" && (
        <BusinessProfile business={business} isOwn />
      )}
    </div>
  );
}
