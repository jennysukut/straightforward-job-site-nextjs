"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { string } from "zod";

export interface Applications {
  id?: string;
  message?: string;
  applicant?: string;
  jobId?: string;
  business?: string;
  businessId?: string;
  dateOfApp?: any;
  appStatus?: string;
  businessNote?: Array<string>;
  mail?: Array<{
    id: number;
    text: Array<string>;
    sender: string;
    date: string;
    timestamp: string;
    edited: boolean;
    read: boolean;
  }>;
  fellowNote?: Array<string>;
  appointments?: Array<{
    interviewStep?: string;
    interviewDate?: {
      month?: number;
      day?: number;
    };
    interviewTime?: string;
  }>;
  appIsBeingRejected?: boolean;
  rejectionMessage?: any;
  // can make rejectionMessage = "sent"?
  rejectionDetails?: { message: any };
  highlighted?: boolean;
  jobOfferBeingSent?: boolean;
  appMovingToNextStage?: boolean;
}

interface ApplicationsContextType {
  applications: Applications[] | null;
  setApplications: (applications: Applications[]) => void;
}

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(
  undefined,
);

export const ApplicationsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [applications, setApplications] = useState<Applications[] | null>([]);

  return (
    <ApplicationsContext.Provider value={{ applications, setApplications }}>
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error(
      "useApplications must be used within a ApplicationsProvider",
    );
  }
  return context;
};
