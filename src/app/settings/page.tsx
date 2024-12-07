"use client";

import React from "react";
import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";
import { useModal } from "@/contexts/ModalContext";

import InfoBox from "@/components/infoBox";
import SiteButton from "@/components/siteButton";
import SubscriptionModal from "@/components/modals/subscriptionModal";

export default function Settings() {
  const { setCurrentPage, setPageType } = usePageContext();
  const { fellow, setFellow } = useFellow();
  const { showModal, hideModal } = useModal();

  useEffect(() => {
    setCurrentPage("Profile");
    setPageType("Individual");
  }, [setCurrentPage, setPageType]);

  // WE NEED TO MAKE AN OPTION TO CLOSE YOUR ACCOUNT ? HOW ABOUT OPTIONS TO RETRACT APPLICATIONS ?
  // if the current subscription gets changed from 0 to an amount, we'll need to initiate a payment due on that day of the month

  return (
    <div className="SettingsPage flex flex-grow flex-col items-center gap-8 pt-6 md:pb-12">
      <div className="SettingsContainer flex w-[84%] max-w-[1600px] flex-col gap-20 sm:gap-32 md:w-[75%]">
        <h1 className="SettingsTitle self-end pr-14">{`My Profile: Details & Subscription`}</h1>
        <div className="NameAndSubscriptionContainer flex items-start justify-between align-top">
          <div className="NameEmailDetails flex flex-col items-end gap-6">
            <InfoBox
              aria="aboutInfo"
              variant="hollow"
              size="profile"
              width="medium"
              addClasses="-mt-20"
            >
              <div className="NameAndEmail ml-10 flex flex-col gap-8">
                <h2 className="Name">Name: {fellow?.name}</h2>
                <h2 className="Name">Email: {fellow?.email}</h2>
              </div>
            </InfoBox>
            <SiteButton
              aria="editNameEmail"
              variant="hollow"
              colorScheme="b1"
              addClasses="px-8"
            >
              edit
            </SiteButton>
          </div>
          <div className="CurrentSubscriptionDetails -mb-14 flex flex-col items-end gap-6">
            <InfoBox
              aria="currentSubscription"
              variant="hollow"
              size="profile"
              width="small"
              addClasses="-mt-4 items-center text-center"
            >
              <div className="NameAndEmail flex flex-col gap-8">
                <h2 className="Name">Your Current Subscription:</h2>
                <h2 className="Name -mt-4 text-2xl text-jade">
                  ${fellow?.subscriptionAmount}
                </h2>
                <p className="Amount -mt-6 text-sm font-medium italic">
                  per month
                </p>
              </div>
            </InfoBox>
            <SiteButton
              aria="changeSubscription"
              variant="hollow"
              colorScheme="b5"
              addClasses="px-8"
              onClick={() => showModal(<SubscriptionModal isBeingUpdated />)}
            >
              change
            </SiteButton>
          </div>
        </div>
        {fellow?.subscriptionAmount !== "0" && (
          <div className="BillingDetails flex flex-col items-center gap-6">
            <InfoBox
              aria="billingDetails"
              variant="hollow"
              size="profile"
              width="small"
              addClasses="items-center text-center self-center mr-40 -mt-20"
            >
              <div className="BillingDetails flex flex-col gap-4">
                <h2 className="Name">Your Billing Details:</h2>
                {/* I don't know if we should have this section? */}
                <p className="Name text-jade">monthly payments on the 14th</p>
                <p className="Name -mt-2 italic text-jade">
                  with card ending in 0000
                </p>
              </div>
            </InfoBox>
            <SiteButton
              aria="editNameEmail"
              variant="hollow"
              colorScheme="e5"
              addClasses="px-8"
            >
              update
            </SiteButton>
          </div>
        )}
      </div>
    </div>
  );
}
