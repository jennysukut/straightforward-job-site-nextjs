"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { string } from "zod";

export interface Applications {
  id?: string;
  message?: string;
  applicant?: any;
  jobId?: string;
  business?: string;
  dateOfApp?: any;
  appStatus?: string;
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
  const [applications, setApplications] = useState<Applications[] | null>([
    {
      id: "chwit7",
      applicant: "testid",
      jobId: "4",
      business: "Insight Analytics Co.",
      dateOfApp: "12.20.2024",
      appStatus: "submitted",
    },
    {
      id: "dfkjb8",
      applicant: "testid",
      message:
        "I'd like to be a customer service representative! Here are some things I think would be helpful if I mentioned: Things and Stuff.",
      business: "QuickAssist Corp",
      jobId: "6",
      dateOfApp: "12.20.2024",
      appStatus: "submitted",
    },
    {
      id: "d87fhw",
      applicant: "testid",
      jobId: "7",
      business: "Innovatech Manufacturing",
      dateOfApp: "12.20.2024",
      appStatus: "submitted",
    },
    {
      id: "iuhec8",
      applicant: "testid",
      message: "Have you tried turning it off and on again?",
      business: "NetSecure Systems",
      jobId: "9",
      dateOfApp: "12.20.2024",
      appStatus: "submitted",
    },
  ]);

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
