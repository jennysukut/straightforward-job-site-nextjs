"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { avatarOptions } from "@/lib/stylingData/avatarOptions";
import { useColors } from "@/contexts/ColorContext";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "@/graphql/queries";

import React from "react";
import BusinessProfile from "@/components/pages/businessProfile/businessProfile";
import FellowProfile from "@/components/pages/fellowProfile/fellowProfile";

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
  const router = useRouter();
  const [fetchProfile, setFetchProfile] = useState(false);

  // Set the page type to fellow or business here and render different profiles based on this
  // Once we have signup and login working, we'll be able to grab data on
  // who's logged in and use that to set these details
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/"); // Redirect to main page
    } else {
      if (accountType === "Fellow") {
        setPageType("Fellow");
        setCurrentPage("fellowProfile");
        // Do we put the GET_PROFILE query here to populate the details?
      } else if (accountType === "Business") {
        setPageType("Business");
        setCurrentPage("businessProfile");
      }
    }
  }, [setCurrentPage, setPageType, accountType]);

  return (
    <div className="Profile flex flex-grow flex-col items-center gap-8 md:pb-12 md:pt-3">
      {/* here, we'll have to look to make sure the id of the current person is used to set their profile info */}
      {isLoggedIn && accountType === "Fellow" && (
        <FellowProfile self={fellow} isOwn />
      )}
      {isLoggedIn && accountType === "Business" && (
        <BusinessProfile self={business} isOwn />
      )}
    </div>
  );
}
