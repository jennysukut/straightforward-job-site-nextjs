"use client";

import React from "react";
import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";
import { useModal } from "@/contexts/ModalContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

import InfoBox from "@/components/informationDisplayComponents/infoBox";
import SiteButton from "@/components/buttonsAndLabels/siteButton";
import SubscriptionModal from "@/components/modals/subscriptionModal";

export default function Settings() {
  const { setCurrentPage, setPageType, accountType } = usePageContext();
  const { fellow, setFellow } = useFellow();
  const { showModal, hideModal } = useModal();
  const { business } = useBusiness();
  const { textColor } = useColorOptions();

  useEffect(() => {
    setCurrentPage("Profile");
    if (accountType === "Fellow") {
      setPageType("Fellow");
    } else if (accountType === "Business") {
      setPageType("Business");
    }
  }, [setCurrentPage, setPageType]);

  // WE NEED TO MAKE AN OPTION TO CLOSE YOUR ACCOUNT ? HOW ABOUT OPTIONS TO RETRACT APPLICATIONS ?
  // if the current subscription gets changed from 0 to an amount, we'll need to initiate a payment due on that day of the month

  return (
    <div
      className={`SettingsPage flex flex-grow flex-col items-center gap-8 pt-6 md:pb-20 ${textColor}`}
    >
      <div className="SettingsContainer flex w-[84%] max-w-[1600px] flex-col gap-20 sm:gap-32 md:w-[75%]">
        {accountType === "Fellow" && (
          <h1
            className={`SettingsTitle self-end pr-14 ${textColor}`}
          >{`My Profile: Details & Subscription`}</h1>
        )}
        {accountType === "Business" && (
          <h1
            className={`SettingsTitle self-end pr-14 ${textColor}`}
          >{`Business Profile: Details & Payments`}</h1>
        )}

        {accountType === "Business" && !business?.hasActiveJobs && (
          <div className="NameEmailDetails flex flex-col items-end gap-6 self-end pr-14">
            <InfoBox
              aria="aboutInfo"
              variant="hollow"
              size="profile"
              width="medium"
              addClasses="-mt-20"
            >
              <div className="NameAndEmail ml-2 flex flex-col gap-8">
                <h2 className="Name">Business: {business?.businessName}</h2>

                <h2 className="Name leading-6">Email: {business?.email}</h2>
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
        )}

        <div className="NameAndSubscriptionContainer flex items-start justify-between align-top">
          {accountType === "Fellow" && (
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
          )}

          {accountType === "Business" && business?.hasActiveJobs && (
            <div className="NameEmailDetails flex flex-col items-end gap-6">
              <InfoBox
                aria="aboutInfo"
                variant="hollow"
                size="profile"
                width="full"
                addClasses="-mt-20"
              >
                <div className="NameAndEmail ml-2 flex flex-col gap-8">
                  <h2 className="Name">Business: {business?.businessName}</h2>

                  <h2 className="Name leading-6">Email: {business?.email}</h2>
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
          )}

          {accountType === "Fellow" && (
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
                  <h2 className="Name -mt-4 text-2xl">
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
                onClick={() =>
                  showModal(<SubscriptionModal isBeingUpdated="true" />)
                }
              >
                change
              </SiteButton>
            </div>
          )}

          {accountType === "Business" && business?.hasActiveJobs === true && (
            <div className="PaymentDetails -mb-14 flex flex-col items-end gap-6">
              <InfoBox
                aria="payment"
                variant="hollow"
                size="profile"
                width="small"
                addClasses="-mt-4 items-center text-center -mr-4"
              >
                <div className="PaymentDetails flex flex-col gap-8">
                  <h2 className="Payment">Your Next Payment:</h2>
                  <h2 className="Name -mt-4 text-2xl">
                    ${business?.amountDue}
                  </h2>
                  <p className="Amount -mt-6 text-sm font-medium italic">
                    on the 15th of January
                  </p>
                </div>
              </InfoBox>
              <SiteButton
                aria="changeSubscription"
                variant="hollow"
                colorScheme="b5"
                addClasses="px-8"
                onClick={() =>
                  showModal(<SubscriptionModal isBeingUpdated="true" />)
                }
              >
                see history
              </SiteButton>
            </div>
          )}
        </div>

        {accountType === "Business" && business?.billingDetails && (
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
                <p className="Name -mt-2 italic">
                  payments processed using card ending in 0000
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
        {accountType === "Fellow" && fellow?.subscriptionAmount !== "0" && (
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
                <p className="Name">monthly payments on the 14th</p>
                <p className="Name -mt-2 italic">with card ending in 0000</p>
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
