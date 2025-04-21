"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { useColors } from "@/contexts/ColorContext";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { LOGOUT } from "@/components/buttonsAndLabels/logoutButton";

import ConfirmLogoutModal from "@/components/modals/confirmLogoutModal";
import React from "react";
import BusinessProfile from "@/components/pages/businessProfile/businessProfile";
import FellowProfile from "@/components/pages/fellowProfile/fellowProfile";

export default function Profile() {
  const router = useRouter();

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
  const { fellow, setFellow } = useFellow();
  const { business, setBusiness } = useBusiness();
  const { showModal, hideModal } = useModal();

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

  const continueLogout = async () => {
    console.log("Logging out..."); // Log to confirm the function is called
    await LOGOUT(); // Ensure this is awaited if it's an async function
    console.log("removeCookie function called."); // Log after calling removeCookie
    setIsLoggedIn(false);
    setFellow({});
    setBusiness({});
    setAccountType("");
    router.push(`/`);
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
  }, [isLoggedIn, accountType, pageType, setCurrentPage, setPageType, router]);

  useEffect(() => {
    setLoadingData(false);
  }, [fellow, business]);

  return (
    <div className="Profile flex w-[85%] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center md:pb-12 md:pt-3">
      {isLoggedIn && accountType === "Fellow" && (
        <FellowProfile self={fellow} isOwn logout={logout} id={fellow?.id} />
      )}
      {isLoggedIn && accountType === "Business" && (
        <BusinessProfile self={business} isOwn logout={logout} />
      )}
    </div>
  );
}
