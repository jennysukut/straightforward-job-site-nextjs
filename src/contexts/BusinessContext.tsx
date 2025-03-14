"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { string } from "zod";

export interface Business {
  id?: string;
  businessName?: string;
  email?: string;
  password?: string;
  avatar?: any;
  smallBio?: string;
  country?: string;
  location?: string;
  website?: string;
  profileIsBeingEdited?: boolean;
  businessField?: string;
  missionVision?: string;
  moreAboutBusiness?: string;
  hasActiveJobs?: boolean;
  billingDetails?: boolean;
  amountDue?: string;
  activeJobs?: any;
}

interface BusinessContextType {
  business: Business | null;
  setBusiness: (business: Business) => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(
  undefined,
);

export const BusinessProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [business, setBusiness] = useState<Business | null>({
    id: "1b23i",
    avatar: "app",
    // amountDue: "400",
    // billingDetails: true,
    // hasActiveJobs: true,
    // businessName: "Straightforward Job Site ",
    // avatar: "backpack",
    // email: "jenny@straightforwardjobsite.com",
    // password: "daehfjkgrnhtjelngr",
    // country: "United States",
    // location: "Montana",
    // smallBio: "The place where Hiring is Human",
    // website: "http://www.straightforwardjobsite.com",
    // profileIsBeingEdited: false,
    // businessField: "Job Board // HR Services",
    // missionVision:
    //   "To use effective communication, simplicity, transparency, and human connection to make the job search and hiring process better for everyone involved.",
    // moreAboutBusiness:
    //   "Started in 2024, Straightforward Job Site is a passion-based project built from volunteers who see the ability to help people in their job search by bringing more transparency and humanity to the process. We believe we can make things better by uplifting and connecting one person at a time. ",
  });

  return (
    <BusinessContext.Provider value={{ business, setBusiness }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusiness must be used within a BusinessProvider");
  }
  return context;
};
