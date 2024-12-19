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
      jobId: "derp",
      job: {
        applicants: ["testid", "123au"],
        roundNumber: "1",
        jobTitle: "Software Engineer II",
        businessName: "TechNova Solutions",
        applicationLimit: "50",
        numberOfApps: "35",
        locationOption: "remote",
        experienceLevel: ["senior"],
        payDetails: {
          payscaleMin: 85,
          payscaleMax: 110,
          payOption: "hourly",
        },
        positionType: "full-time",
        country: "United States",
        location: "Montana",
        positionSummary:
          "We are looking for a versatile Front-End Engineer + Graphic Designer to join our team. This hybrid role combines technical expertise in web development with a strong eye for aesthetics and design. You will be responsible for designing and implementing user interfaces that are visually appealing, responsive, and user-friendly.",
        nonNegParams: ["Graphic Design", "Web Development"],
        idealCandidate:
          "Our ideal candidate is someone passionate about design and quick on their feet with front-end coding.",
        hybridDetails: {},
        preferredSkills: [
          "Git",
          "MySQL",
          "PostgreSQL",
          "Java",
          "Python",
          "JavaScript",
          "Spring Boot",
          "Docker",
          "Kubernetes",
          "Linux",
          "HTML",
          "CSS",
          "AWS",
          "React",
          "Node.js",
        ],

        moreAboutPosition:
          "We are seeking a talented Front-End Engineer + Graphic Designer to join our remote team. In this hybrid role, you will combine your technical skills in web development with creative expertise in graphic design to craft engaging, user-friendly digital experiences. Working remotely, you’ll have the flexibility to manage your workflow while collaborating effectively across distributed teams using modern communication tools.",
        responsibilities: [
          {
            responsibility: "Collaborating with managers and content creators",
            id: 1,
          },
          {
            responsibility: "Design & Development",
            id: 2,
          },
          {
            responsibility: "Producing high-quality designs",
            id: 3,
          },
        ],
        perks: ["401K", "Medical Coverage", "Paid Maternity Leave"],
        interviewProcess: [
          {
            stage: "Stage 1",
            step: "Meet & Greet",
            details:
              "Our first step is hopping on a video chat where we'll get to know a little bit more about you, your experience, and how you would do as part of our team.",
            id: 1,
          },
          {
            stage: "Stage 2",
            step: "Technical Assignment",
            details:
              "Our second step is to provide a paid assignment where you're responsible for either producing a design for us or turning a design into a small, functional front-end component.",
            id: 2,
          },
          {
            stage: "Stage 3",
            step: "Manager Meeting",
            details:
              "If you've moved onto the next state, you'll meet our manager and go over responsibilities and details about the position. This is the time to ask questions. ",
            id: 3,
          },
          {
            stage: "Stage 4",
            step: "Offer & Acceptance",
            details:
              "If you're a good fit, we'll extend an offer and get the paperwork signed to get you on board!",
            id: 4,
          },
        ],
      },
    },
    {
      jobId: "blerp",
      job: {
        applicants: [],
        jobTitle: "Graphic Designer",
        businessName: "Creative Minds Studio",
        roundNumber: "1",
        applicationLimit: "25",
        numberOfApps: "20",
        locationOption: "on-site",
        experienceLevel: ["junior"],
        payDetails: {
          payscaleMin: 20,
          payscaleMax: 30,
          payOption: "hourly",
        },
        positionType: "part-time",
        country: "Canada",
        location: "Toronto",
        positionSummary:
          "We are looking for a versatile Front-End Engineer + Graphic Designer to join our team. This hybrid role combines technical expertise in web development with a strong eye for aesthetics and design. You will be responsible for designing and implementing user interfaces that are visually appealing, responsive, and user-friendly.",
        nonNegParams: ["Graphic Design", "Web Development"],
        idealCandidate:
          "Our ideal candidate is someone passionate about design and quick on their feet with front-end coding.",
        hybridDetails: {},
        preferredSkills: [
          "Adobe Photoshop",
          "Adobe Illustrator",
          "Adobe InDesign",
          "Figma",
          "Sketch",
          "Canva",
          "CorelDRAW",
          "Procreate",
          "Typography",
          "Color Theory",
          "UI/UX Design",
          "Vector Graphics",
          "Raster Graphics",
          "Brand Identity",
          "Motion Graphics",
        ],
        moreAboutPosition:
          "We are seeking a talented Front-End Engineer + Graphic Designer to join our remote team. In this hybrid role, you will combine your technical skills in web development with creative expertise in graphic design to craft engaging, user-friendly digital experiences. Working remotely, you’ll have the flexibility to manage your workflow while collaborating effectively across distributed teams using modern communication tools.",
        responsibilities: [
          {
            responsibility: "Collaborating with managers and content creators",
            id: 1,
          },
          {
            responsibility: "Design & Development",
            id: 2,
          },
          {
            responsibility: "Producing high-quality designs",
            id: 3,
          },
        ],
        perks: ["401K", "Medical Coverage", "Paid Maternity Leave"],
        interviewProcess: [
          {
            stage: "Stage 1",
            step: "Meet & Greet",
            details:
              "Our first step is hopping on a video chat where we'll get to know a little bit more about you, your experience, and how you would do as part of our team.",
            id: 1,
          },
          {
            stage: "Stage 2",
            step: "Technical Assignment",
            details:
              "Our second step is to provide a paid assignment where you're responsible for either producing a design for us or turning a design into a small, functional front-end component.",
            id: 2,
          },
          {
            stage: "Stage 3",
            step: "Manager Meeting",
            details:
              "If you've moved onto the next state, you'll meet our manager and go over responsibilities and details about the position. This is the time to ask questions. ",
            id: 3,
          },
          {
            stage: "Stage 4",
            step: "Offer & Acceptance",
            details:
              "If you're a good fit, we'll extend an offer and get the paperwork signed to get you on board!",
            id: 4,
          },
        ],
      },
    },
    {
      jobId: "3",
      job: {
        jobTitle: "Project Manager",
        businessName: "Pinnacle Enterprises",
        applicationLimit: "40",
        numberOfApps: "10",
        roundNumber: "1",
        locationOption: "hybrid",
        hybridDetails: {
          daysInOffice: "3",
          daysRemote: "2",
        },
        experienceLevel: ["senior"],
        payDetails: {
          payscaleMin: 85000,
          payscaleMax: 110000,
          payOption: "yearly",
        },
        positionType: "full-time",
        country: "United States",
        location: "California",
        positionSummary:
          "We are looking for a versatile Front-End Engineer + Graphic Designer to join our team. This hybrid role combines technical expertise in web development with a strong eye for aesthetics and design. You will be responsible for designing and implementing user interfaces that are visually appealing, responsive, and user-friendly.",
        nonNegParams: ["English", "United States", "Agile"],
        idealCandidate:
          "Our ideal candidate is someone passionate about design and quick on their feet with front-end coding.",
        preferredSkills: [
          "Content Writing",
          "Graphic Design",
          "Web Development",
          "Graphic Illustration",
        ],
        moreAboutPosition:
          "We are seeking a talented Front-End Engineer + Graphic Designer to join our remote team. In this hybrid role, you will combine your technical skills in web development with creative expertise in graphic design to craft engaging, user-friendly digital experiences. Working remotely, you’ll have the flexibility to manage your workflow while collaborating effectively across distributed teams using modern communication tools.",
        responsibilities: [
          {
            responsibility: "Collaborating with managers and content creators",
            id: 1,
          },
          {
            responsibility: "Design & Development",
            id: 2,
          },
          {
            responsibility: "Producing high-quality designs",
            id: 3,
          },
        ],
        perks: ["401K", "Medical Coverage", "Paid Maternity Leave"],
        interviewProcess: [
          {
            stage: "Stage 1",
            step: "Meet & Greet",
            details:
              "Our first step is hopping on a video chat where we'll get to know a little bit more about you, your experience, and how you would do as part of our team.",
            id: 1,
          },
          {
            stage: "Stage 2",
            step: "Technical Assignment",
            details:
              "Our second step is to provide a paid assignment where you're responsible for either producing a design for us or turning a design into a small, functional front-end component.",
            id: 2,
          },
          {
            stage: "Stage 3",
            step: "Manager Meeting",
            details:
              "If you've moved onto the next state, you'll meet our manager and go over responsibilities and details about the position. This is the time to ask questions. ",
            id: 3,
          },
          {
            stage: "Stage 4",
            step: "Offer & Acceptance",
            details:
              "If you're a good fit, we'll extend an offer and get the paperwork signed to get you on board!",
            id: 4,
          },
        ],
      },
    },
    {
      jobId: "4",
      job: {
        jobTitle: "Data Analyst",
        businessName: "Insight Analytics Co.",
        applicationLimit: "30",
        numberOfApps: "28",
        locationOption: "remote",
        experienceLevel: ["entry-level"],
        payDetails: {
          payscaleMin: 25,
          payscaleMax: 35,
          payOption: "hourly",
        },
        positionType: "contract",
        country: "United Kingdom",
        location: "London",
        positionSummary:
          "We are looking for a versatile Front-End Engineer + Graphic Designer to join our team. This hybrid role combines technical expertise in web development with a strong eye for aesthetics and design. You will be responsible for designing and implementing user interfaces that are visually appealing, responsive, and user-friendly.",
        nonNegParams: ["Graphic Design", "Web Development"],
        idealCandidate:
          "Our ideal candidate is someone passionate about design and quick on their feet with front-end coding.",
        hybridDetails: {},
        preferredSkills: [
          "Content Writing",
          "Graphic Design",
          "Web Development",
          "Graphic Illustration",
        ],
        moreAboutPosition:
          "We are seeking a talented Front-End Engineer + Graphic Designer to join our remote team. In this hybrid role, you will combine your technical skills in web development with creative expertise in graphic design to craft engaging, user-friendly digital experiences. Working remotely, you’ll have the flexibility to manage your workflow while collaborating effectively across distributed teams using modern communication tools.",
        responsibilities: [
          {
            responsibility: "Collaborating with managers and content creators",
            id: 1,
          },
          {
            responsibility: "Design & Development",
            id: 2,
          },
          {
            responsibility: "Producing high-quality designs",
            id: 3,
          },
        ],
        perks: ["401K", "Medical Coverage", "Paid Maternity Leave"],
        interviewProcess: [
          {
            stage: "Stage 1",
            step: "Meet & Greet",
            details:
              "Our first step is hopping on a video chat where we'll get to know a little bit more about you, your experience, and how you would do as part of our team.",
            id: 1,
          },
          {
            stage: "Stage 2",
            step: "Technical Assignment",
            details:
              "Our second step is to provide a paid assignment where you're responsible for either producing a design for us or turning a design into a small, functional front-end component.",
            id: 2,
          },
          {
            stage: "Stage 3",
            step: "Manager Meeting",
            details:
              "If you've moved onto the next state, you'll meet our manager and go over responsibilities and details about the position. This is the time to ask questions. ",
            id: 3,
          },
          {
            stage: "Stage 4",
            step: "Offer & Acceptance",
            details:
              "If you're a good fit, we'll extend an offer and get the paperwork signed to get you on board!",
            id: 4,
          },
        ],
      },
    },
    {
      jobId: "5",
      job: {
        jobTitle: "Senior Accountant",
        businessName: "Finance Pros Ltd.",
        applicationLimit: "20",
        numberOfApps: "20",
        locationOption: "on-site",
        experienceLevel: ["senior"],
        payDetails: {
          payscaleMin: 70000,
          payscaleMax: 90000,
          payOption: "yearly",
        },
        positionType: "full-time",
        country: "Canada",
        location: "Vancouver",
        positionSummary:
          "We are looking for a versatile Front-End Engineer + Graphic Designer to join our team. This hybrid role combines technical expertise in web development with a strong eye for aesthetics and design. You will be responsible for designing and implementing user interfaces that are visually appealing, responsive, and user-friendly.",
        nonNegParams: ["Graphic Design", "Web Development"],
        idealCandidate:
          "Our ideal candidate is someone passionate about design and quick on their feet with front-end coding.",
        hybridDetails: {},
        preferredSkills: [
          "Content Writing",
          "Graphic Design",
          "Web Development",
          "Graphic Illustration",
        ],
        moreAboutPosition:
          "We are seeking a talented Front-End Engineer + Graphic Designer to join our remote team. In this hybrid role, you will combine your technical skills in web development with creative expertise in graphic design to craft engaging, user-friendly digital experiences. Working remotely, you’ll have the flexibility to manage your workflow while collaborating effectively across distributed teams using modern communication tools.",
        responsibilities: [
          {
            responsibility: "Collaborating with managers and content creators",
            id: 1,
          },
          {
            responsibility: "Design & Development",
            id: 2,
          },
          {
            responsibility: "Producing high-quality designs",
            id: 3,
          },
        ],
        perks: ["401K", "Medical Coverage", "Paid Maternity Leave"],
        interviewProcess: [
          {
            stage: "Stage 1",
            step: "Meet & Greet",
            details:
              "Our first step is hopping on a video chat where we'll get to know a little bit more about you, your experience, and how you would do as part of our team.",
            id: 1,
          },
          {
            stage: "Stage 2",
            step: "Technical Assignment",
            details:
              "Our second step is to provide a paid assignment where you're responsible for either producing a design for us or turning a design into a small, functional front-end component.",
            id: 2,
          },
          {
            stage: "Stage 3",
            step: "Manager Meeting",
            details:
              "If you've moved onto the next state, you'll meet our manager and go over responsibilities and details about the position. This is the time to ask questions. ",
            id: 3,
          },
          {
            stage: "Stage 4",
            step: "Offer & Acceptance",
            details:
              "If you're a good fit, we'll extend an offer and get the paperwork signed to get you on board!",
            id: 4,
          },
        ],
      },
    },
    {
      jobId: "6",
      job: {
        jobTitle: "Customer Service Representative",
        businessName: "QuickAssist Corp",
        applicationLimit: "100",
        numberOfApps: "85",
        locationOption: "remote",
        experienceLevel: ["entry-level"],
        payDetails: {
          payscaleMin: 15,
          payscaleMax: 18,
          payOption: "hourly",
        },
        positionType: "part-time",
        country: "United States",
        location: "Texas",
        positionSummary:
          "We are looking for a versatile Front-End Engineer + Graphic Designer to join our team. This hybrid role combines technical expertise in web development with a strong eye for aesthetics and design. You will be responsible for designing and implementing user interfaces that are visually appealing, responsive, and user-friendly.",
        nonNegParams: ["Graphic Design", "Web Development"],
        idealCandidate:
          "Our ideal candidate is someone passionate about design and quick on their feet with front-end coding.",
        hybridDetails: {},
        preferredSkills: [
          "Content Writing",
          "Graphic Design",
          "Web Development",
          "Graphic Illustration",
        ],
        moreAboutPosition:
          "We are seeking a talented Front-End Engineer + Graphic Designer to join our remote team. In this hybrid role, you will combine your technical skills in web development with creative expertise in graphic design to craft engaging, user-friendly digital experiences. Working remotely, you’ll have the flexibility to manage your workflow while collaborating effectively across distributed teams using modern communication tools.",
        responsibilities: [
          {
            responsibility: "Collaborating with managers and content creators",
            id: 1,
          },
          {
            responsibility: "Design & Development",
            id: 2,
          },
          {
            responsibility: "Producing high-quality designs",
            id: 3,
          },
        ],
        perks: ["401K", "Medical Coverage", "Paid Maternity Leave"],
        interviewProcess: [
          {
            stage: "Stage 1",
            step: "Meet & Greet",
            details:
              "Our first step is hopping on a video chat where we'll get to know a little bit more about you, your experience, and how you would do as part of our team.",
            id: 1,
          },
          {
            stage: "Stage 2",
            step: "Technical Assignment",
            details:
              "Our second step is to provide a paid assignment where you're responsible for either producing a design for us or turning a design into a small, functional front-end component.",
            id: 2,
          },
          {
            stage: "Stage 3",
            step: "Manager Meeting",
            details:
              "If you've moved onto the next state, you'll meet our manager and go over responsibilities and details about the position. This is the time to ask questions. ",
            id: 3,
          },
          {
            stage: "Stage 4",
            step: "Offer & Acceptance",
            details:
              "If you're a good fit, we'll extend an offer and get the paperwork signed to get you on board!",
            id: 4,
          },
        ],
      },
    },
    {
      jobId: "7",
      job: {
        jobTitle: "Mechanical Engineer",
        businessName: "Innovatech Manufacturing",
        applicationLimit: "15",
        numberOfApps: "10",
        locationOption: "on-site",
        experienceLevel: ["senior"],
        payDetails: {
          payscaleMin: 75000,
          payscaleMax: 95000,
          payOption: "yearly",
        },
        positionType: "full-time",
        country: "United Kingdom",
        location: "Manchester",
        positionSummary:
          "We are looking for a versatile Front-End Engineer + Graphic Designer to join our team. This hybrid role combines technical expertise in web development with a strong eye for aesthetics and design. You will be responsible for designing and implementing user interfaces that are visually appealing, responsive, and user-friendly.",
        nonNegParams: ["Graphic Design", "Web Development"],
        idealCandidate:
          "Our ideal candidate is someone passionate about design and quick on their feet with front-end coding.",
        hybridDetails: {},
        preferredSkills: [
          "Content Writing",
          "Graphic Design",
          "Web Development",
          "Graphic Illustration",
        ],
        moreAboutPosition:
          "We are seeking a talented Front-End Engineer + Graphic Designer to join our remote team. In this hybrid role, you will combine your technical skills in web development with creative expertise in graphic design to craft engaging, user-friendly digital experiences. Working remotely, you’ll have the flexibility to manage your workflow while collaborating effectively across distributed teams using modern communication tools.",
        responsibilities: [
          {
            responsibility: "Collaborating with managers and content creators",
            id: 1,
          },
          {
            responsibility: "Design & Development",
            id: 2,
          },
          {
            responsibility: "Producing high-quality designs",
            id: 3,
          },
        ],
        perks: ["401K", "Medical Coverage", "Paid Maternity Leave"],
        interviewProcess: [
          {
            stage: "Stage 1",
            step: "Meet & Greet",
            details:
              "Our first step is hopping on a video chat where we'll get to know a little bit more about you, your experience, and how you would do as part of our team.",
            id: 1,
          },
          {
            stage: "Stage 2",
            step: "Technical Assignment",
            details:
              "Our second step is to provide a paid assignment where you're responsible for either producing a design for us or turning a design into a small, functional front-end component.",
            id: 2,
          },
          {
            stage: "Stage 3",
            step: "Manager Meeting",
            details:
              "If you've moved onto the next state, you'll meet our manager and go over responsibilities and details about the position. This is the time to ask questions. ",
            id: 3,
          },
          {
            stage: "Stage 4",
            step: "Offer & Acceptance",
            details:
              "If you're a good fit, we'll extend an offer and get the paperwork signed to get you on board!",
            id: 4,
          },
        ],
      },
    },
    {
      jobId: "8",
      job: {
        jobTitle: "Marketing Specialist",
        businessName: "BrightPath Marketing",
        applicationLimit: "30",
        numberOfApps: "29",
        locationOption: "hybrid",
        hybridDetails: {
          daysInOffice: "3",
          daysRemote: "2",
        },
        experienceLevel: ["junior"],
        payDetails: {
          payscaleMin: 40000,
          payscaleMax: 50000,
          payOption: "yearly",
        },
        positionType: "full-time",
        country: "United States",
        location: "New York",
      },
    },
    {
      jobId: "9",
      job: {
        jobTitle: "IT Support Technician",
        businessName: "NetSecure Systems",
        applicationLimit: "25",
        numberOfApps: "24",
        locationOption: "on-site",
        experienceLevel: ["entry-level"],
        payDetails: {
          payscaleMin: 20,
          payscaleMax: 25,
          payOption: "hourly",
        },
        positionType: "contract",
        country: "Canada",
        location: "Ottawa",
        positionSummary:
          "We are looking for a versatile Front-End Engineer + Graphic Designer to join our team. This hybrid role combines technical expertise in web development with a strong eye for aesthetics and design. You will be responsible for designing and implementing user interfaces that are visually appealing, responsive, and user-friendly.",
        nonNegParams: ["Graphic Design", "Web Development"],
        idealCandidate:
          "Our ideal candidate is someone passionate about design and quick on their feet with front-end coding.",
        hybridDetails: {},
        preferredSkills: [
          "Content Writing",
          "Graphic Design",
          "Web Development",
          "Graphic Illustration",
        ],
        moreAboutPosition:
          "We are seeking a talented Front-End Engineer + Graphic Designer to join our remote team. In this hybrid role, you will combine your technical skills in web development with creative expertise in graphic design to craft engaging, user-friendly digital experiences. Working remotely, you’ll have the flexibility to manage your workflow while collaborating effectively across distributed teams using modern communication tools.",
        responsibilities: [
          {
            responsibility: "Collaborating with managers and content creators",
            id: 1,
          },
          {
            responsibility: "Design & Development",
            id: 2,
          },
          {
            responsibility: "Producing high-quality designs",
            id: 3,
          },
        ],
        perks: ["401K", "Medical Coverage", "Paid Maternity Leave"],
        interviewProcess: [
          {
            stage: "Stage 1",
            step: "Meet & Greet",
            details:
              "Our first step is hopping on a video chat where we'll get to know a little bit more about you, your experience, and how you would do as part of our team.",
            id: 1,
          },
          {
            stage: "Stage 2",
            step: "Technical Assignment",
            details:
              "Our second step is to provide a paid assignment where you're responsible for either producing a design for us or turning a design into a small, functional front-end component.",
            id: 2,
          },
          {
            stage: "Stage 3",
            step: "Manager Meeting",
            details:
              "If you've moved onto the next state, you'll meet our manager and go over responsibilities and details about the position. This is the time to ask questions. ",
            id: 3,
          },
          {
            stage: "Stage 4",
            step: "Offer & Acceptance",
            details:
              "If you're a good fit, we'll extend an offer and get the paperwork signed to get you on board!",
            id: 4,
          },
        ],
      },
    },
    {
      jobId: "10",
      job: {
        jobTitle: "Content Writer",
        businessName: "WordFlow Media",
        applicationLimit: "50",
        numberOfApps: "50",
        locationOption: "remote",
        experienceLevel: ["junior"],
        payDetails: {
          payscaleMin: 30,
          payscaleMax: 45,
          payOption: "hourly",
        },
        positionType: "freelance",
        country: "United Kingdom",
        location: "Birmingham",
        positionSummary:
          "We are looking for a versatile Front-End Engineer + Graphic Designer to join our team. This hybrid role combines technical expertise in web development with a strong eye for aesthetics and design. You will be responsible for designing and implementing user interfaces that are visually appealing, responsive, and user-friendly.",
        nonNegParams: ["Graphic Design", "Web Development"],
        idealCandidate:
          "Our ideal candidate is someone passionate about design and quick on their feet with front-end coding.",
        hybridDetails: {},
        preferredSkills: [
          "Content Writing",
          "Graphic Design",
          "Web Development",
          "Graphic Illustration",
        ],
        moreAboutPosition:
          "We are seeking a talented Front-End Engineer + Graphic Designer to join our remote team. In this hybrid role, you will combine your technical skills in web development with creative expertise in graphic design to craft engaging, user-friendly digital experiences. Working remotely, you’ll have the flexibility to manage your workflow while collaborating effectively across distributed teams using modern communication tools.",
        responsibilities: [
          {
            responsibility: "Collaborating with managers and content creators",
            id: 1,
          },
          {
            responsibility: "Design & Development",
            id: 2,
          },
          {
            responsibility: "Producing high-quality designs",
            id: 3,
          },
        ],
        perks: ["401K", "Medical Coverage", "Paid Maternity Leave"],
        interviewProcess: [
          {
            stage: "Stage 1",
            step: "Meet & Greet",
            details:
              "Our first step is hopping on a video chat where we'll get to know a little bit more about you, your experience, and how you would do as part of our team.",
            id: 1,
          },
          {
            stage: "Stage 2",
            step: "Technical Assignment",
            details:
              "Our second step is to provide a paid assignment where you're responsible for either producing a design for us or turning a design into a small, functional front-end component.",
            id: 2,
          },
          {
            stage: "Stage 3",
            step: "Manager Meeting",
            details:
              "If you've moved onto the next state, you'll meet our manager and go over responsibilities and details about the position. This is the time to ask questions. ",
            id: 3,
          },
          {
            stage: "Stage 4",
            step: "Offer & Acceptance",
            details:
              "If you're a good fit, we'll extend an offer and get the paperwork signed to get you on board!",
            id: 4,
          },
        ],
      },
    },
    {
      jobId: "11",
      job: {
        applicationLimit: "25",
        businessName: "Straightforward Job Site",
        location: "Montana",
        country: "United States",
        jobTitle: "Front-End Engineer & Graphic Designer",
        positionType: "full-time",
        positionSummary:
          "We are looking for a versatile Front-End Engineer + Graphic Designer to join our team. This hybrid role combines technical expertise in web development with a strong eye for aesthetics and design. You will be responsible for designing and implementing user interfaces that are visually appealing, responsive, and user-friendly.",
        nonNegParams: ["Graphic Design", "Web Development"],
        payDetails: {
          payscaleMin: 60000,
          payscaleMax: 80000,
          payOption: "annually",
        },
        locationOption: "remote",
        idealCandidate:
          "Our ideal candidate is someone passionate about design and quick on their feet with front-end coding.",
        hybridDetails: {},
        experienceLevel: ["junior"],
        preferredSkills: [
          "Content Writing",
          "Graphic Design",
          "Web Development",
          "Graphic Illustration",
        ],
        moreAboutPosition:
          "We are seeking a talented Front-End Engineer + Graphic Designer to join our remote team. In this hybrid role, you will combine your technical skills in web development with creative expertise in graphic design to craft engaging, user-friendly digital experiences. Working remotely, you’ll have the flexibility to manage your workflow while collaborating effectively across distributed teams using modern communication tools.",
        responsibilities: [
          {
            responsibility: "Collaborating with managers and content creators",
            id: 1,
          },
          {
            responsibility: "Design & Development",
            id: 2,
          },
          {
            responsibility: "Producing high-quality designs",
            id: 3,
          },
        ],
        perks: ["401K", "Medical Coverage", "Paid Maternity Leave"],
        interviewProcess: [
          {
            stage: "Stage 1",
            step: "Meet & Greet",
            details:
              "Our first step is hopping on a video chat where we'll get to know a little bit more about you, your experience, and how you would do as part of our team.",
            id: 1,
          },
          {
            stage: "Stage 2",
            step: "Technical Assignment",
            details:
              "Our second step is to provide a paid assignment where you're responsible for either producing a design for us or turning a design into a small, functional front-end component.",
            id: 2,
          },
          {
            stage: "Stage 3",
            step: "Manager Meeting",
            details:
              "If you've moved onto the next state, you'll meet our manager and go over responsibilities and details about the position. This is the time to ask questions. ",
            id: 3,
          },
          {
            stage: "Stage 4",
            step: "Offer & Acceptance",
            details:
              "If you're a good fit, we'll extend an offer and get the paperwork signed to get you on board!",
            id: 4,
          },
        ],
        numberOfApps: "0",
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
