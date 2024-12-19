"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { string } from "zod";

export interface BusinessList {
  id?: string;
  business?: {
    businessName?: string;
    email?: string;
    password?: string;
    avatar?: string;
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
  };
}

interface BusinessListContextType {
  businessList: BusinessList[] | null;
  setBusinessList: (businessList: BusinessList[]) => void;
}

const BusinessListContext = createContext<BusinessListContextType | undefined>(
  undefined,
);

export const BusinessListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [businessList, setBusinessList] = useState<BusinessList[] | null>([
    {
      id: "1b23i",
      business: {
        amountDue: "400",
        billingDetails: true,
        hasActiveJobs: true,
        businessName: "Straightforward Job Site ",
        avatar: "app",
        email: "jenny@straightforwardjobsite.com",
        password: "daehfjkgrnhtjelngr",
        country: "United States",
        location: "Montana",
        smallBio: "The place where Hiring is Human",
        website: "http://www.straightforwardjobsite.com",
        profileIsBeingEdited: false,
        businessField: "Job Board // HR Services",
        missionVision:
          "To use effective communication, simplicity, transparency, and human connection to make the job search and hiring process better for everyone involved.",
        moreAboutBusiness:
          "Started in 2024, Straightforward Job Site is a passion-based project built from volunteers who see the ability to help people in their job search by bringing more transparency and humanity to the process. We believe we can make things better by uplifting and connecting one person at a time. ",
      },
    },
  ]);

  return (
    <BusinessListContext.Provider value={{ businessList, setBusinessList }}>
      {children}
    </BusinessListContext.Provider>
  );
};

export const useBusinessList = () => {
  const context = useContext(BusinessListContext);
  if (!context) {
    throw new Error("useBusiness must be used within a BusinessProvider");
  }
  return context;
};
