"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { string } from "zod";

export interface Business {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  businessProfile?: {
    avatar?: any;
    smallBio?: string;
    country?: string;
    location?: string;
    website?: string;
    businessField?: string;
    missionVision?: string;
    moreAboutBusiness?: string;
  };
  profileIsBeingEdited?: boolean;
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
  const [business, setBusiness] = useState<Business | null>({});

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
