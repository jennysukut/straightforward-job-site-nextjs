"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { string } from "zod";

export interface Applications {
  id?: string;
  message?: string;
  applicant?: string;
  jobId?: string;
  business?: string;
  dateOfApp?: string;
  appStatus?: string;
  interview?: {
    interviewStep?: string;
    interviewDate?: {
      month?: number;
      day?: number;
    };
    interviewTime?: string;
  };
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
      interview: {
        interviewStep: "1",
        interviewDate: {
          month: 0,
          day: 5,
        },
        interviewTime: "12:00pm",
      },
    },
    {
      id: "dfkjb8",
      applicant: "testid",
      message:
        "I'd like to be a customer service representative! Here are some things I think would be helpful if I mentioned: Things and Stuff.",
      business: "QuickAssist Corp",
      jobId: "6",
      dateOfApp: "12.20.2024",
      appStatus: "viewed",
    },
    {
      id: "d87fhw",
      applicant: "testid",
      jobId: "7",
      business: "Innovatech Manufacturing",
      dateOfApp: "12.20.2024",
      appStatus: "stage 2",
    },
    {
      id: "iuhec8",
      applicant: "testid",
      message: "Have you tried turning it off and on again?",
      business: "NetSecure Systems",
      jobId: "9",
      dateOfApp: "12.20.2024",
      appStatus: "offer",
    },
    {
      id: "fhuek4",
      applicant: "testid",
      jobId: "4",
      business: "Insight Analytics Co.",
      dateOfApp: "12.20.2024",
      appStatus: "submitted",
    },
    {
      id: "dsfkv9",
      applicant: "testid",
      message:
        "I'd like to be a customer service representative! Here are some things I think would be helpful if I mentioned: Things and Stuff.",
      business: "QuickAssist Corp",
      jobId: "6",
      dateOfApp: "12.20.2024",
      appStatus: "viewed",
    },
    {
      id: "cv9t4t",
      applicant: "testid",
      jobId: "7",
      business: "Innovatech Manufacturing",
      dateOfApp: "12.20.2024",
      appStatus: "stage 2",
    },
    {
      id: "hf7ve",
      applicant: "testid",
      message: "Have you tried turning it off and on again?",
      business: "NetSecure Systems",
      jobId: "9",
      dateOfApp: "12.20.2024",
      appStatus: "offer",
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
