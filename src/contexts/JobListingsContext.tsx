"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { StringValidation } from "zod";

export interface JobListing {
  jobId?: string;
  job?: {
    applicants?: Array<string>;
    jobId?: string;
    jobTitle?: string;
    businessName?: string;
    businessId?: string;
    applications?: Array<string>;
    applicationLimit?: string;
    numberOfApps?: string;
    positionType?: string;
    positionSummary?: string;
    nonNegParams?: Array<string>;
    locationOption?: string;
    idealCandidate?: string;
    interviewer?: { name: string; details: string };
    payDetails?: {
      payscaleMin?: number;
      payscaleMax?: number;
      payOption?: string;
    };
    hybridDetails?: {
      daysInOffice?: string;
      daysRemote?: string;
    };
    experienceLevel?: Array<string>;
    preferredSkills?: Array<string>;
    moreAboutPosition?: string;
    responsibilities?: Array<{ id?: number; responsibility?: string }> | [];
    perks?: Array<string>;
    interviewProcess?: Array<{
      stage: string;
      step: string;
      details: string;
      id: number;
    }>;
    location?: string;
    country?: string;
    jobIsBeingEdited?: boolean;
    roundNumber?: string;
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
  const [jobListings, setJobListings] = useState<JobListing[] | null>([]);

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
