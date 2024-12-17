"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { StringValidation } from "zod";

export interface JobListing {
  jobId?: number;
  job?: {
    jobTitle?: string;
    businessName?: string;
    experienceLevel?: string;
    applicationLimit?: string;
    numberOfApps?: string;
    locationOption?: string;
    positionType?: string;
    payDetails?: any;
    appLimitReached?: boolean;
    country?: string;
    location?: string;
    positionSummary?: string;
    nonNegParams?: Array<string>;
    idealCandidate?: string;
    hybridDetails?: any;
    preferredSkills?: Array<string>;
    moreAboutPosition?: string;
    responsibilities?: any;
    perks?: Array<string>;
    interviewProcess?: Array<any>;
    jobIsBeingEdited?: boolean;
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
    // {
    //   jobId: 1,
    //   job: {
    //     jobTitle: "Fantastic Job",
    //     businessName: "Best Business",
    //     appLimit: "25",
    //     numberOfApps: "12",
    //     locationOption: "remote",
    //     experienceLevel: "senior",
    //     payDetails: {
    //       payscaleMin: "$60,000",
    //       payscaleMax: "$80,000",
    //       payOption: "annually",
    //     },
    //     positionType: "full-time",
    //   },
    // },
    // {
    //   jobId: 2,
    //   job: {
    //     jobTitle: "Amazing Job",
    //     businessName: "Wonderful Business",
    //     appLimit: "50",
    //     numberOfApps: "20",
    //     locationOption: "on-site",
    //     experienceLevel: "junior",

    //     payDetails: {
    //       payscaleMin: "$20",
    //       payscaleMax: "$30",
    //       payOption: "hourly",
    //     },
    //     positionType: "full-time",
    //   },
    // },
    // {
    //   jobId: 3,
    //   job: {
    //     jobTitle: "Extra Fantastic Job",
    //     businessName: "Most Best Business",
    //     appLimit: "40",
    //     numberOfApps: "2",
    //     locationOption: "remote",
    //     experienceLevel: "junior",
    //     payDetails: {
    //       payscaleMin: "$80,000",
    //       payscaleMax: "$100,000",
    //       payOption: "annually",
    //     },
    //     positionType: "part-time",
    //   },
    // },
    // {
    //   jobId: 4,
    //   job: {
    //     jobTitle: "Super Extra Most Long Amazing Job Title",
    //     businessName: "Super Duper Most Awesome Business",
    //     appLimit: "10",
    //     numberOfApps: "10",
    //     locationOption: "on-site",
    //     experienceLevel: "senior",

    //     payDetails: {
    //       payscaleMin: "$50",
    //       payscaleMax: "$65",
    //       payOption: "hourly",
    //     },
    //     positionType: "full-time",
    //     appLimitReached: true,
    //   },
    // },
    // {
    //   jobId: 5,
    //   job: {
    //     jobTitle: "Fantastic Job",
    //     businessName: "Best Business",
    //     appLimit: "25",
    //     numberOfApps: "12",
    //     locationOption: "remote",
    //     experienceLevel: "senior",
    //     payDetails: {
    //       payscaleMin: "$60,000",
    //       payscaleMax: "$80,000",
    //       payOption: "annually",
    //     },
    //     positionType: "full-time",
    //   },
    // },
    // {
    //   jobId: 6,
    //   job: {
    //     jobTitle: "Amazing Job",
    //     businessName: "Wonderful Business",
    //     appLimit: "50",
    //     numberOfApps: "20",
    //     locationOption: "on-site",
    //     experienceLevel: "junior",

    //     payDetails: {
    //       payscaleMin: "$20",
    //       payscaleMax: "$30",
    //       payOption: "hourly",
    //     },
    //     positionType: "full-time",
    //   },
    // },
    // {
    //   jobId: 7,
    //   job: {
    //     jobTitle: "Extra Fantastic Job",
    //     businessName: "Most Best Business",
    //     appLimit: "40",
    //     numberOfApps: "2",
    //     locationOption: "remote",
    //     experienceLevel: "junior",
    //     payDetails: {
    //       payscaleMin: "$80,000",
    //       payscaleMax: "$100,000",
    //       payOption: "annually",
    //     },
    //     positionType: "part-time",
    //   },
    // },
    // {
    //   jobId: 8,
    //   job: {
    //     jobTitle: "Super Extra Most Long Amazing Job Title",
    //     businessName: "Super Duper Most Awesome Business",
    //     appLimit: "10",
    //     numberOfApps: "9",
    //     locationOption: "on-site",
    //     experienceLevel: "senior",

    //     payDetails: {
    //       payscaleMin: "$50",
    //       payscaleMax: "$65",
    //       payOption: "hourly",
    //     },
    //     positionType: "full-time",
    //   },
    // },
    // {
    //   jobId: 9,
    //   job: {
    //     jobTitle: "Fantastic Job",
    //     businessName: "Best Business",
    //     appLimit: "25",
    //     numberOfApps: "12",
    //     locationOption: "remote",
    //     experienceLevel: "senior",
    //     payDetails: {
    //       payscaleMin: "$60,000",
    //       payscaleMax: "$80,000",
    //       payOption: "annually",
    //     },
    //     positionType: "full-time",
    //   },
    // },
    // {
    //   jobId: 10,
    //   job: {
    //     jobTitle: "Amazing Job",
    //     businessName: "Wonderful Business",
    //     appLimit: "50",
    //     numberOfApps: "20",
    //     locationOption: "on-site",
    //     experienceLevel: "junior",

    //     payDetails: {
    //       payscaleMin: "$20",
    //       payscaleMax: "$30",
    //       payOption: "hourly",
    //     },
    //     positionType: "full-time",
    //   },
    // },
    // {
    //   jobId: 11,
    //   job: {
    //     jobTitle: "Extra Fantastic Job",
    //     businessName: "Most Best Business",
    //     appLimit: "40",
    //     numberOfApps: "2",
    //     locationOption: "remote",
    //     experienceLevel: "junior",
    //     payDetails: {
    //       payscaleMin: "$80,000",
    //       payscaleMax: "$100,000",
    //       payOption: "annually",
    //     },
    //     positionType: "part-time",
    //   },
    // },
    // {
    //   jobId: 12,
    //   job: {
    //     jobTitle: "Super Extra Most Long Amazing Job Title",
    //     businessName: "Super Duper Most Awesome Business",
    //     appLimit: "10",
    //     numberOfApps: "9",
    //     locationOption: "on-site",
    //     experienceLevel: "senior",

    //     payDetails: {
    //       payscaleMin: "$50",
    //       payscaleMax: "$65",
    //       payOption: "hourly",
    //     },
    //     positionType: "full-time",
    //   },
    // },

    {
      jobId: 1,
      job: {
        jobTitle: "Software Engineer II",
        businessName: "TechNova Solutions",
        applicationLimit: "50",
        numberOfApps: "35",
        locationOption: "remote",
        experienceLevel: "senior",
        payDetails: {
          payscaleMin: "$85",
          payscaleMax: "$110",
          payOption: "hourly",
        },
        positionType: "full-time",
        appLimitReached: false,
        country: "United States",
        location: "Montana",
      },
    },
    {
      jobId: 2,
      job: {
        jobTitle: "Graphic Designer",
        businessName: "Creative Minds Studio",
        applicationLimit: "25",
        numberOfApps: "25",
        locationOption: "on-site",
        experienceLevel: "junior",
        payDetails: {
          payscaleMin: "$20",
          payscaleMax: "$30",
          payOption: "hourly",
        },
        positionType: "part-time",
        appLimitReached: true,
        country: "Canada",
        location: "Toronto",
      },
    },
    {
      jobId: 3,
      job: {
        jobTitle: "Project Manager",
        businessName: "Pinnacle Enterprises",
        applicationLimit: "40",
        numberOfApps: "10",
        locationOption: "hybrid",
        experienceLevel: "senior",
        payDetails: {
          payscaleMin: "$95,000",
          payscaleMax: "$120,000",
          payOption: "yearly",
        },
        positionType: "full-time",
        appLimitReached: false,
        country: "United States",
        location: "California",
      },
    },
    {
      jobId: 4,
      job: {
        jobTitle: "Data Analyst",
        businessName: "Insight Analytics Co.",
        applicationLimit: "30",
        numberOfApps: "28",
        locationOption: "remote",
        experienceLevel: "entry-level",
        payDetails: {
          payscaleMin: "$25",
          payscaleMax: "$35",
          payOption: "hourly",
        },
        positionType: "contract",
        appLimitReached: false,
        country: "United Kingdom",
        location: "London",
      },
    },
    {
      jobId: 5,
      job: {
        jobTitle: "Senior Accountant",
        businessName: "Finance Pros Ltd.",
        applicationLimit: "20",
        numberOfApps: "20",
        locationOption: "on-site",
        experienceLevel: "senior",
        payDetails: {
          payscaleMin: "$70,000",
          payscaleMax: "$90,000",
          payOption: "yearly",
        },
        positionType: "full-time",
        appLimitReached: true,
        country: "Canada",
        location: "Vancouver",
      },
    },
    {
      jobId: 6,
      job: {
        jobTitle: "Customer Service Representative",
        businessName: "QuickAssist Corp",
        applicationLimit: "100",
        numberOfApps: "85",
        locationOption: "remote",
        experienceLevel: "entry-level",
        payDetails: {
          payscaleMin: "$15",
          payscaleMax: "$18",
          payOption: "hourly",
        },
        positionType: "part-time",
        appLimitReached: false,
        country: "United States",
        location: "Texas",
      },
    },
    {
      jobId: 7,
      job: {
        jobTitle: "Mechanical Engineer",
        businessName: "Innovatech Manufacturing",
        applicationLimit: "15",
        numberOfApps: "10",
        locationOption: "on-site",
        experienceLevel: "senior",
        payDetails: {
          payscaleMin: "$75,000",
          payscaleMax: "$95,000",
          payOption: "yearly",
        },
        positionType: "full-time",
        appLimitReached: false,
        country: "United Kingdom",
        location: "Manchester",
      },
    },
    {
      jobId: 8,
      job: {
        jobTitle: "Marketing Specialist",
        businessName: "BrightPath Marketing",
        applicationLimit: "30",
        numberOfApps: "29",
        locationOption: "hybrid",
        experienceLevel: "junior",
        payDetails: {
          payscaleMin: "$40,000",
          payscaleMax: "$50,000",
          payOption: "yearly",
        },
        positionType: "full-time",
        appLimitReached: false,
        country: "United States",
        location: "New York",
      },
    },
    {
      jobId: 9,
      job: {
        jobTitle: "IT Support Technician",
        businessName: "NetSecure Systems",
        applicationLimit: "25",
        numberOfApps: "24",
        locationOption: "on-site",
        experienceLevel: "entry-level",
        payDetails: {
          payscaleMin: "$20",
          payscaleMax: "$25",
          payOption: "hourly",
        },
        positionType: "contract",
        appLimitReached: false,
        country: "Canada",
        location: "Ottawa",
      },
    },
    {
      jobId: 10,
      job: {
        jobTitle: "Content Writer",
        businessName: "WordFlow Media",
        applicationLimit: "50",
        numberOfApps: "50",
        locationOption: "remote",
        experienceLevel: "junior",
        payDetails: {
          payscaleMin: "$30",
          payscaleMax: "$45",
          payOption: "hourly",
        },
        positionType: "freelance",
        appLimitReached: true,
        country: "United Kingdom",
        location: "Birmingham",
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
