"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Job {
  activeJobs?: any;
  jobTitle?: string;
  businessName?: string;
  applicationLimit?: string;
  jobNumber?: number;
  positionType?: string;
  positionSummary?: string;
  nonNegParams?: Array<string>;
  payDetails?: any;
  locationOption?: string;
  idealCandidate?: string;
  hybridDetails?: any;
  experienceLevel?: any;
  preferredSkills?: Array<string>;
  moreAboutPosition?: string;
  responsibilities?: any;
  perks?: Array<string>;
  interviewProcess?: Array<any>;
  location?: string;
  country?: string;
  jobIsBeingEdited?: boolean;
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
    jobIsBeingEdited: false,

    // jobIsBeingEdited: false,
    // applicationLimit: "25",
    // businessName: "Straightforward Job Site",
    // location: "Montana",
    // country: "United States",
    // jobNumber: 1,
    // jobTitle: "Front-End Engineer & Graphic Designer",
    // positionType: "full-time",
    // positionSummary:
    //   "We are looking for a versatile Front-End Engineer + Graphic Designer to join our team. This hybrid role combines technical expertise in web development with a strong eye for aesthetics and design. You will be responsible for designing and implementing user interfaces that are visually appealing, responsive, and user-friendly.",
    // nonNegParams: ["Graphic Design", "Web Development"],
    // payDetails: {
    //   payscaleMin: "$60,000",
    //   payscaleMax: "$80,000",
    //   payOption: "annually",
    // },
    // locationOption: "remote",
    // idealCandidate:
    //   "Our ideal candidate is someone passionate about design and quick on their feet with front-end coding.",
    // hybridDetails: {},
    // experienceLevel: "junior",
    // preferredSkills: [
    //   "Content Writing",
    //   "Graphic Design",
    //   "Web Development",
    //   "Graphic Illustration",
    // ],
    // moreAboutPosition:
    //   "We are seeking a talented Front-End Engineer + Graphic Designer to join our remote team. In this hybrid role, you will combine your technical skills in web development with creative expertise in graphic design to craft engaging, user-friendly digital experiences. Working remotely, you’ll have the flexibility to manage your workflow while collaborating effectively across distributed teams using modern communication tools.",
    // responsibilities: [
    //   {
    //     responsibility: "Collaborating with managers and content creators",
    //     id: 1,
    //   },
    //   {
    //     responsibility: "Design & Development",
    //     id: 2,
    //   },
    //   {
    //     responsibility: "Producing high-quality designs",
    //     id: 3,
    //   },
    // ],
    // perks: ["401K", "Medical Coverage", "Paid Maternity Leave"],
    // interviewProcess: [
    //   {
    //     stage: "Stage 1",
    //     step: "Meet & Greet",
    //     details:
    //       "Our first step is hopping on a video chat where we'll get to know a little bit more about you, your experience, and how you would do as part of our team.",
    //     id: 1,
    //   },
    //   {
    //     stage: "Stage 2",
    //     step: "Technical Assignment",
    //     details:
    //       "Our second step is to provide a paid assignment where you're responsible for either producing a design for us or turning a design into a small, functional front-end component.",
    //     id: 2,
    //   },
    //   {
    //     stage: "Stage 3",
    //     step: "Manager Meeting",
    //     details:
    //       "If you've moved onto the next state, you'll meet our manager and go over responsibilities and details about the position. This is the time to ask questions. ",
    //     id: 3,
    //   },
    //   {
    //     stage: "Stage 4",
    //     step: "Offer & Acceptance",
    //     details:
    //       "If you're a good fit, we'll extend an offer and get the paperwork signed to get you on board!",
    //     id: 4,
    //   },
    // ],
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
