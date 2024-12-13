"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Fellow {
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
  shadow?: string;
  locationOptions?: Array<string>;
  colorScheme?: string;
  languages?: Array<string>;
  buttonShadow?: string;
  buttonImg?: any;
  profileIsBeingEdited?: boolean;
  addMoreInfo?: boolean;
  subscriptionAmount?: any;
}

interface FellowContextType {
  fellow: Fellow | null;
  setFellow: (fellow: Fellow) => void;
}

const FellowContext = createContext<FellowContextType | undefined>(undefined);

export const FellowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [fellow, setFellow] = useState<Fellow | null>({
    avatar: "/avatars/peach.svg",
    shadow: "drop-shadow-lime",
    colorScheme: "b6",
    buttonShadow: "bg-lime",
    buttonImg: "bg-[url('/avatars/magenta.svg')]",

    // subscriptionAmount: "10",
    // addMoreInfo: false,
    // name: "Jenny Sukut",
    // avatar: "/avatars/magenta.svg",
    // shadow: "drop-shadow-lime",
    // colorScheme: "b4",
    // buttonShadow: "bg-lime",
    // buttonImg: "bg-[url('/avatars/magenta.svg')]",
    // email: "jennysukut@gmail.com",
    // smallBio:
    //   "Founder of Straightforward Job Site || Lover of Color || I Like Coding Things || Could Snuggle Animals All Day",
    // country: "United States",
    // location: "Montana",
    // skills: ["Web Development", "Graphic Design", "Content Writing"],
    // jobTitles: ["Web Developer", "Graphic Designer", "Front-End Engineer"],
    // languages: ["English"],
    // profileIsBeingEdited: false,
    // aboutMe:
    //   "More about me - lots of details and words and whatnot telling about me and where I come from and what I do and why I do it and all that good stuff.",
    // experience: [
    //   {
    //     title: "First Job",
    //     companyName: "First Company",
    //     yearDetails: "4 Years",
    //     details: "Details about my first job at my first company.",
    //     id: 1,
    //   },
    //   {
    //     title: "Secondary Job",
    //     companyName: "Other Company Co.",
    //     yearDetails: "1 Year",
    //     details:
    //       "At the other company co I worked at such and such and whatnot.",
    //     id: 2,
    //   },
    // ],
    // education: [
    //   {
    //     degree: "My Degree",
    //     school: "My School",
    //     fieldOfStudy: "My Field of Study",
    //     id: 1,
    //   },
    //   {
    //     degree: "Full-Stack Engineer",
    //     school: "TripleTen",
    //     fieldOfStudy: "Web Development",
    //     id: 2,
    //   },
    // ],
    // awards: [
    //   {
    //     awardTitle: "Being Awesome",
    //     givenBy: "Humanity",
    //     awardDetails: "For Being Awesome",
    //     id: 1,
    //   },
    // ],
    // experienceLevels: [
    //   {
    //     experienceLevel: "Senior",
    //     expLevelSkill: "Graphic Design",
    //     skillYears: "15 Years",
    //     id: 1,
    //   },
    //   {
    //     experienceLevel: "Junior",
    //     expLevelSkill: "Software Engineer",
    //     skillYears: "1 Year",
    //     id: 2,
    //   },
    // ],
    // accomplishments: [
    //   {
    //     accTitle: "Making 3 Cute Kids",
    //     accDetails: "They're the cutest ever.",
    //     id: 1,
    //   },
    // ],
    // passions:
    //   "I'm passionate about a lot of things. At the end of the day, creativity and self-expression are things I strive to bring into every aspect of my life.",
    // lookingFor:
    //   "I'm looking for a meaningful place to do meaningful work for meaningful pay. ",
    // locationOptions: ["remote", "on-site", "hybrid"],
    // hobbies: [
    //   {
    //     hobbyTitle: "Making Everything",
    //     howLong: "Forever",
    //     id: 1,
    //   },
    // ],
    // bookOrQuote: [
    //   {
    //     bookOrQuote: "Peace Like A River",
    //     author: "Leif Enger",
    //     id: 1,
    //   },
    //   {
    //     bookOrQuote: "The Way Of Kings",
    //     author: "Brandon Sanderson",
    //     id: 2,
    //   },
    // ],
    // petDetails:
    //   "I love all the pets. I would have a collection of about 27 cats, dogs, ferrets, and spiders if I could!",
    // links: [
    //   {
    //     linkType: "Personal Website",
    //     link: "https://jennysukut.github.io/personal-website/",
    //     id: 1,
    //   },
    //   {
    //     linkType: "LinkedIn",
    //     link: "http://www.linkedin.com/in/jennifer-sukut",
    //     id: 1,
    //   },
    // ],
  });

  return (
    <FellowContext.Provider value={{ fellow, setFellow }}>
      {children}
    </FellowContext.Provider>
  );
};

export const useFellow = () => {
  const context = useContext(FellowContext);
  if (!context) {
    throw new Error("useFellow must be used within a FellowProvider");
  }
  return context;
};
