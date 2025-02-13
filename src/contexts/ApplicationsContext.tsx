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
    text: string;
    sender: string;
    date: string;
    timestamp: string;
    edited: boolean;
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
  appIsBeingRejected?: string;
  rejectionMessage?: any;
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
      message: "test message to see if it causes a notification",
      jobId: "4",
      business: "Insight Analytics Co.",
      businessId: "1b23i",
      dateOfApp: "12.20.2024",
      appStatus: "viewed",
      mail: [
        {
          id: 1,
          text: "Hello! I am a business testing out this messaging center.",
          sender: "business",
          date: "February 10",
          timestamp: "10:00 AM",
          edited: true,
        },
        {
          id: 2,
          text: "Sweet! I'm testing it out too! How exciting!",
          sender: "fellow",
          date: "February 10",
          timestamp: "10:01 AM",
          edited: false,
        },
      ],
      appointments: [
        {
          interviewStep: "1",
          interviewDate: {
            month: 0,
            day: 5,
          },
          interviewTime: "12:00pm",
        },
      ],
      appIsBeingRejected: "false",
    },
    {
      id: "efuwog",
      applicant: "123",
      jobId: "4",
      business: "Insight Analytics Co.",
      businessId: "1b23i",
      dateOfApp: "1.13.2024",
      appStatus: "closed",
      appointments: [],
      appIsBeingRejected: "false",
    },
    {
      id: "feuhviw",
      applicant: "456",
      jobId: "4",
      business: "Insight Analytics Co.",
      businessId: "1b23i",
      dateOfApp: "1.13.2024",
      appStatus: "submitted",
      appointments: [],
      appIsBeingRejected: "false",
    },
    {
      id: "ehcvieef",
      applicant: "789",
      jobId: "4",
      business: "Insight Analytics Co.",
      businessId: "1b23i",
      dateOfApp: "1.13.2024",
      appStatus: "submitted",
      appointments: [],
      appIsBeingRejected: "false",
    },
    {
      id: "fvijobe",
      applicant: "101",
      jobId: "4",
      business: "Insight Analytics Co.",
      businessId: "1b23i",
      dateOfApp: "1.13.2024",
      appStatus: "submitted",
      appointments: [],
      appIsBeingRejected: "false",
    },
    {
      id: "ehvtwku",
      applicant: "234",
      jobId: "4",
      business: "Insight Analytics Co.",
      businessId: "1b23i",
      dateOfApp: "1.13.2024",
      appStatus: "submitted",
      appointments: [],
      appIsBeingRejected: "false",
    },
    {
      id: "vgnibvo",
      applicant: "567",
      jobId: "4",
      business: "Insight Analytics Co.",
      businessId: "1b23i",
      dateOfApp: "1.13.2024",
      appStatus: "submitted",
      appointments: [],
      appIsBeingRejected: "false",
    },

    {
      id: "dfkjb8",
      applicant: "testid",
      message:
        "I'd like to be a customer service representative! Here are some things I think would be helpful if I mentioned: Things and Stuff.",
      business: "QuickAssist Corp",
      businessNote: ["Business Note Testing Here", "Another Business Note"],
      jobId: "6",
      dateOfApp: "12.20.2024",
      appStatus: "viewed",
      mail: [
        {
          id: 1,
          text: "testing, testing, 123, testing and testing alot!",
          sender: "business",
          date: "February 10",
          timestamp: "10:00 AM",
          edited: true,
        },
        {
          id: 2,
          text: "what are you testing? And why are you testing so much?",
          sender: "fellow",
          date: "February 10",
          timestamp: "10:01 AM",
          edited: false,
        },
        {
          id: 1,
          text: "I'm testing my sanity.",
          sender: "business",
          date: "February 10",
          timestamp: "11:30 AM",
          edited: false,
        },
      ],
      appointments: [
        {
          interviewStep: "1",
          interviewDate: {
            month: 0,
            day: 9,
          },
          interviewTime: "2:00pm",
        },
      ],
      appIsBeingRejected: "false",
    },
    {
      id: "d87fhw",
      applicant: "testid",
      jobId: "7",
      business: "Innovatech Manufacturing",
      dateOfApp: "12.20.2024",
      appStatus: "stage 2",
      mail: [
        {
          id: 1,
          text: "Zeth SunSun Vilano Wore White on the day he was to kill a king.",
          sender: "business",
          date: "February 10",
          timestamp: "10:00 AM",
          edited: true,
        },
        {
          id: 2,
          text: "I know that excerpt. Where is it from?",
          sender: "fellow",
          date: "February 10",
          timestamp: "10:01 AM",
          edited: false,
        },
        {
          id: 2,
          text: "Wait. Is it from Brandy Sandy's Way Of Kings?",
          sender: "fellow",
          date: "February 10",
          timestamp: "10:01 AM",
          edited: false,
        },
        {
          id: 1,
          text: "It is indeed, young padawan.",
          sender: "business",
          date: "February 10",
          timestamp: "11:00 AM",
          edited: false,
        },
      ],
      appointments: [
        {
          interviewStep: "1",
          interviewDate: {
            month: 0,
            day: 17,
          },
          interviewTime: "5:00pm",
        },
        {
          interviewStep: "1",
          interviewDate: {
            month: 0,
            day: 15,
          },
          interviewTime: "3:00pm",
        },
      ],
      appIsBeingRejected: "false",
    },
    {
      id: "iuhec8",
      applicant: "testid",
      message: "Have you tried turning it off and on again?",
      business: "NetSecure Systems",
      jobId: "9",
      dateOfApp: "12.20.2024",
      appStatus: "offer",
      appIsBeingRejected: "false",
    },

    {
      id: "dsfkv9",
      applicant: "blip",
      message: "What up, buttsnack?",
      business: "QuickAssist Corp",
      jobId: "6",
      dateOfApp: "12.20.2024",
      businessNote: [
        "Here's a note I have about this application / applicant. I think we could use a lot of words to see if our thoughts overflow and make the relevant icon box too big for it's parameters inside the ams page",
        "Here's a secondary little note, also for testing.",
      ],
      appStatus: "viewed",
      appIsBeingRejected: "false",
    },
    {
      id: "cv9t4t",
      applicant: "testid",
      jobId: "7",
      business: "Innovatech Manufacturing",
      dateOfApp: "12.20.2024",
      appStatus: "stage 2",
      appIsBeingRejected: "false",
    },
    {
      id: "hf7ve",
      applicant: "testid",
      message: "Have you tried turning it off and on again?",
      business: "NetSecure Systems",
      jobId: "9",
      dateOfApp: "12.20.2024",
      appStatus: "offer",
      appIsBeingRejected: "false",
      appointments: [
        {
          interviewStep: "1",
          interviewDate: {
            month: 3,
            day: 17,
          },
          interviewTime: "3:00pm",
        },
      ],
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
