"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { string } from "zod";

export interface Business {
  businessName?: string;
  email?: string;
  password?: string;
  avatar?: any;
  shadow?: string;
  colorScheme?: string;
  buttonShadow?: string;
  buttonImg?: any;
  smallBio?: string;
  country?: string;
  location?: string;
  website?: string;
  profileIsBeingEdited?: boolean;
  businessField?: string;
  missionVision?: string;
  moreAboutBusiness?: string;
  hasActiveJobs?: boolean;
  billingDetails?: boolean;
  amountDue?: string;
  activeJobs?: any;
}

interface BusinessContextType {
  business: Business | null;
  setBusiness: (business: Business) => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(
  undefined,
);

export const BusinessProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [business, setBusiness] = useState<Business | null>({
    // businessName: "Test Business Name",
    // avatar: "/avatars/magenta.svg",
    // shadow: "drop-shadow-lime",
    // colorScheme: "b4",
    // buttonShadow: "bg-lime",
    // buttonImg: "bg-[url('/avatars/magenta.svg')]",
    activeJobs: [
      {
        jobNumber: 1,
        jobTitle: "Front-End Engineer & Graphic Designer",
        positionType: "full-time",
        positionSummary:
          "We are looking for a versatile Front-End Engineer + Graphic Designer to join our team. This hybrid role combines technical expertise in web development with a strong eye for aesthetics and design. You will be responsible for designing and implementing user interfaces that are visually appealing, responsive, and user-friendly.",
        nonNegParams: ["Graphic Design", "Web Development"],
        payDetails: {
          payscale: "$60,000",
          payOption: "annually",
        },
        locationType: "remote",
        idealCandidate:
          "Our ideal candidate is someone passionate about design and quick on their feet with front-end coding.",
        hybridDetails: {},
        experienceLevel: ["junior", "senior"],
        preferredSkills: [
          "Content Writing",
          "Graphic Design",
          "Web Development",
          "Graphic Illustration",
        ],
        moreAboutPosition:
          "We are seeking a talented Front-End Engineer + Graphic Designer to join our remote team. In this hybrid role, you will combine your technical skills in web development with creative expertise in graphic design to craft engaging, user-friendly digital experiences. Working remotely, you’ll have the flexibility to manage your workflow while collaborating effectively across distributed teams using modern communication tools.",
        responsibilities: [
          "Collaborating with managers and content creators",
          "Design & Development",
          "Producing high-quality designs",
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
    ],
    amountDue: "400",
    billingDetails: true,
    hasActiveJobs: true,
    businessName: "Straightforward Job Site ",
    avatar: "/avatars/magenta.svg",
    shadow: "drop-shadow-lime",
    colorScheme: "b4",
    buttonShadow: "drop-shadow-lime",
    buttonImg: "bg-[url('/avatars/magenta.svg')]",
    email: "jenny@straightforwardjobsite.com",
    password: "daehfjkgrnhtjelngr",
    country: "United States",
    location: "Montana",
    smallBio: "The place where Hiring is Human",
    website: "http://www.straightforwardjobsite.com",
    profileIsBeingEdited: false,
    businessField: "Job Board // HR Services",
    missionVision:
      "To use effective communication, simplicity, transparency, and human connection to make the job search and hiring process better for everyone involved.",
    moreAboutBusiness:
      "Started in 2024, Straightforward Job Site is a passion-based project built from volunteers who see the ability to help people in their job search by bringing more transparency and humanity to the process. We believe we can make things better by uplifting and connecting one person at a time. ",
  });

  return (
    <BusinessContext.Provider value={{ business, setBusiness }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusiness must be used within a BusinessProvider");
  }
  return context;
};
