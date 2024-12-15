"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { StringValidation } from "zod";

export interface JobListing {
  jobId?: number;
  job?: {
    jobTitle?: string;
    businessName?: string;
    experienceLevel?: string;
    appLimit?: string;
    numberOfApps?: string;
    locationOption?: string;
    positionType?: string;
    payDetails?: any;
  };
}

interface JobListingContextType {
  jobListings: JobListing[] | null;
  setJobListings: (jobListings: JobListing[]) => void;
}

const JobListingsContext = createContext<JobListingContextType | undefined>(
  undefined,
);

export const JobListingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jobListings, setJobListings] = useState<JobListing[] | null>([
    {
      jobId: 1,
      job: {
        jobTitle: "Fantastic Job",
        businessName: "Best Business",
        appLimit: "25",
        numberOfApps: "12",
        locationOption: "remote",
        experienceLevel: "senior",
        payDetails: {
          payscaleMin: "$60,000",
          payscaleMax: "$80,000",
          payOption: "annually",
        },
        positionType: "full-time",
      },
    },
    {
      jobId: 2,
      job: {
        jobTitle: "Amazing Job",
        businessName: "Wonderful Business",
        appLimit: "50",
        numberOfApps: "20",
        locationOption: "on-site",
        experienceLevel: "junior",

        payDetails: {
          payscaleMin: "$20",
          payscaleMax: "$30",
          payOption: "hourly",
        },
        positionType: "full-time",
      },
    },
    {
      jobId: 3,
      job: {
        jobTitle: "Extra Fantastic Job",
        businessName: "Most Best Business",
        appLimit: "40",
        numberOfApps: "2",
        locationOption: "remote",
        experienceLevel: "junior",
        payDetails: {
          payscaleMin: "$80,000",
          payscaleMax: "$100,000",
          payOption: "annually",
        },
        positionType: "part-time",
      },
    },
    {
      jobId: 4,
      job: {
        jobTitle: "Super Amazing Job",
        businessName: "Wickedly Wonderful Business",
        appLimit: "10",
        numberOfApps: "9",
        locationOption: "on-site",
        experienceLevel: "senior",

        payDetails: {
          payscaleMin: "$50",
          payscaleMax: "$65",
          payOption: "hourly",
        },
        positionType: "full-time",
      },
    },
  ]);

  return (
    <JobListingsContext.Provider value={{ jobListings, setJobListings }}>
      {children}
    </JobListingsContext.Provider>
  );
};

export const useJobListings = () => {
  const context = useContext(JobListingsContext);
  if (!context) {
    throw new Error("useJobListings must be used within JobListingsProvider");
  }
  return context;
};
