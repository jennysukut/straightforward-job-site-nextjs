"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Fellows {
  id?: string;
  name?: string;
  email?: string;
  smallBio?: string;
  country?: string;
  location?: string;
  skills?: Array<string>;
  jobTitles?: Array<string>;
  experience?: Record<string, any>;
  education?: Record<string, any>;
  awards?: Record<string, any>;
  experienceLevels?: Record<string, any>;
  accomplishments?: Record<string, any>;
  passions?: string;
  lookingFor?: string;
  hobbies?: Array<any>;
  bookOrQuote?: Array<any>;
  petDetails?: string;
  links?: Array<any>;
  aboutMe?: string;
  avatar?: any;
  shadow?: any;
  locationOptions?: Array<string>;
  colorScheme?: string;
  languages?: Array<string>;
  buttonShadow?: any;
  buttonImg?: any;
  profileIsBeingEdited?: boolean;
  addMoreInfo?: boolean;
  subscriptionAmount?: any;
  savedJobs?: Array<any>;
  dailyApplications?: Record<string, any>;
}

interface FellowsContextType {
  fellows: Fellows[] | null;
  setFellows: (fellows: Fellows[]) => void;
}

const FellowsContext = createContext<FellowsContextType | undefined>(undefined);

export const FellowsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [fellows, setFellows] = useState<Fellows[] | null>([
    {
      avatar: "flower",
      id: "testid",
      name: "Jenny Sukut",
      email: "jennysukut@gmail.com",
      smallBio:
        "A Tiny Bit Longer Of A Small Bio - Let's see what happens when the small bio is even bigger. Since there's new formatting, it might make things look different.",
      country: "United States",
      location: "Montana",
      skills: ["Graphic Design", "React.js", "Web Development"],
      jobTitles: ["Web Developer", "Startup Founder"],
      languages: ["English"],
      profileIsBeingEdited: false,
      savedJobs: [],
      experience: [
        {
          title: "Graphic Designer",
          companyName: "WPD",
          yearDetails: "15 Years",
          details:
            "Lead graphic designer in charge of planner and digital designs.",
          id: 1,
        },
        {
          title: "Small Business Owner",
          companyName: "Color.Fully.Curated",
          yearDetails: "3 Years",
          details:
            "I owned and operated a small, colorful business in Columbia TN where I sold handcrafted, bright polymer clay earrings and unique secondhand clothes.",
          id: 2,
        },
      ],
      education: [
        {
          degree: "Full-Stack Engineer",
          school: "TripleTen",
          fieldOfStudy: "Full-Stack Software Development",
          id: 1,
        },
      ],
      awards: [],
      experienceLevels: [
        {
          experienceLevel: "Senior",
          expLevelSkill: "Graphic Design",
          skillYears: "15 Years",
          id: 1,
        },
        {
          experienceLevel: "Junior",
          expLevelSkill: "Front-End Engineer",
          skillYears: "1 Year",
          id: 2,
        },
      ],
      accomplishments: [],
      passions:
        "I'm passionate about living my life and making things better with imagination and creativity.",
      lookingFor:
        "I'm looking to make a meaningful contribution to a place and help make a meaningful contribution to the world in the process.",
      locationOptions: ["remote"],
      hobbies: [
        {
          hobbyTitle: "Polymer Clay Earring Creation",
          howLong: "4 Years",
          id: 1,
        },
        {
          hobbyTitle: "Reading",
          howLong: "Years",
          id: 2,
        },
        {
          hobbyTitle: "Sewing + Clothes Tailoring",
          howLong: "4 Years",
          id: 3,
        },
      ],
      bookOrQuote: [
        {
          bookOrQuote: "The Way Of Kings",
          author: "Brandon Sanderson",
          id: 1,
        },
        {
          bookOrQuote: "Ender's Game",
          author: "Orson Scott Card",
          id: 2,
        },
      ],
      petDetails:
        "I have had an array of pets and I love them all! I don't have any at the moment, but I'd love to get a new one sometime.",
      links: [
        {
          linkType: "Personal Website",
          link: "https://jennysukut.github.io/personal-website/",
          id: 1,
        },
      ],
      aboutMe:
        "I'm wildly passionate about freedom, self-expression, goodness, authenticity, light, beauty, and all things expansive. I like to do things well and for a good purpose. ",
      addMoreInfo: false,
      subscriptionAmount: "0",
    },
    {
      avatar: "checks",
      id: "kittyfritz",
      name: "Cleo Cat",
      email: "kittyfritz@gmail.com",
      smallBio:
        "Part Cat, Part God. I can do everything except for catch that blasted red dot.",
      country: "United States",
      location: "Wyoming",
      skills: ["Nap Expert", "Graphic Design", "Snuggling", "Web Development"],
      jobTitles: ["SnuggleBug", "Pstpstpstpstpst, Here Kitty!"],
      languages: ["English"],
      savedJobs: [],
      experience: [],
      education: [
        {
          degree: "Bath Expert",
          school: "Life",
          fieldOfStudy: "Cleanliness",
          id: 1,
        },
      ],
      awards: [],
      accomplishments: [],
      passions:
        "I'm passionate about living my being the amazing ball of fuzz I am.",
      lookingFor: "Snacks, naps, constant praise and adoration.",
      locationOptions: ["remote"],
      hobbies: [
        {
          hobbyTitle: "Being Fantastic",
          howLong: "1 Years",
          id: 1,
        },
        {
          hobbyTitle: "Acting Aloof",
          howLong: "2 Months",
          id: 1,
        },
      ],
      bookOrQuote: [
        {
          bookOrQuote: "I can't read.",
          author: "Every Cat Ever",
          id: 1,
        },
      ],
      petDetails: "I find the term pets derogatory.",
      links: [
        {
          linkType: "Favorite Website",
          link: "https://www.montereybayaquarium.org/animals/live-cams/jelly-cam",
          id: 1,
        },
      ],
      aboutMe:
        "I'm everything you would expect of a great god incarnate into a tiny, furry, pouncy little cat body.",
      subscriptionAmount: "0",
    },
  ]);

  return (
    <FellowsContext.Provider value={{ fellows, setFellows }}>
      {children}
    </FellowsContext.Provider>
  );
};

export const useFellows = () => {
  const context = useContext(FellowsContext);
  if (!context) {
    throw new Error("useFellows must be used within a FellowsProvider");
  }
  return context;
};
