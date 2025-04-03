"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Job {
  // this job number will probably get replaced by an
  // auto-generated id made by sending details to the server?
  //probably best to name it jobId
  applicants?: Array<string>;
  jobId?: string;
  jobTitle?: string;
  businessName?: string;
  applications?: Array<string>;
  applicationLimit?: string;
  numberOfApps?: string;
  positionType?: string;
  positionSummary?: string;
  nonNegParams?: Array<string>;
  locationOption?: string;
  idealCandidate?: string;
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
}

interface JobContextType {
  job: Job | null;
  setJob: (job: Job) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [job, setJob] = useState<Job | null>({});

  return (
    <JobContext.Provider value={{ job, setJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJob must be used within JobProvider");
  }
  return context;
};
