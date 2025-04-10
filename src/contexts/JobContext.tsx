"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Job {
  id?: number;
  jobTitle?: string;
  positionType?: string;
  positionSummary?: string;
  nonNegParams?: Array<string>;
  payscaleMin?: number;
  payscaleMax?: number;
  payOption?: string;
  locationOption?: string;
  idealCandidate?: string;
  daysInOffice?: string;
  daysRemote?: string;
  city?: string;
  state?: string;
  experienceLevel?: Array<string>;
  preferredSkills?: Array<string>;
  moreAboutPosition?: string;
  responsibilities?: Array<string>;
  perks?: Array<string>;
  interviewProcess?: Array<{
    stage: string;
    step: string;
    details: string;
    id: number;
  }>;
  business?: {
    id?: string;
    name?: string;
    businessProfile?: {
      smallBio?: string;
      country?: string;
      location?: string;
      website?: string;
      avatar?: string;
      businessField?: string;
      missionVision?: string;
      moreAboutBusiness?: string;
    };
  };
  applications?: Array<string>;
  applicationLimit?: string;
  beingEdited?: boolean;
  roundNumber?: string;
  completed?: string;
}

interface JobContextType {
  job: Job | null;
  setJob: (job: Job) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [job, setJob] = useState<Job | null>({
    id: 1,
  });

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
