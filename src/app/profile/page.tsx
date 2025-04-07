"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { useColors } from "@/contexts/ColorContext";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { removeCookie } from "@/components/buttonsAndLabels/logoutButton";

import ConfirmLogoutModal from "@/components/modals/confirmLogoutModal";
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
  const { showModal, hideModal } = useModal();
  const router = useRouter();
  const [loadingData, setLoadingData] = useState(true);

  const logout = () => {
    setIsLoggingOut(true);
    console.log("trying to log out from the profile page");
    showModal(
      <ConfirmLogoutModal
        continueLogout={continueLogout}
        setIsLoggingOut={setIsLoggingOut}
      />,
    );
    router.push(`/`);
  };

  const continueLogout = () => {
    removeCookie("accessToken");
    setIsLoggedIn(false);
    setAccountType("");
    hideModal();
  };

  useEffect(() => {
    if (accountType === "Fellow" && pageType !== "Fellow") {
      setPageType("Fellow");
      setCurrentPage("fellowProfile");
    } else if (accountType === "Business" && pageType !== "Business") {
      setPageType("Business");
      setCurrentPage("businessProfile");
    }
    // if (!isLoggedIn) {
    //   router.push(`/`);
    // }
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
        <div className="ProfilePage mr-14 flex justify-center">
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
