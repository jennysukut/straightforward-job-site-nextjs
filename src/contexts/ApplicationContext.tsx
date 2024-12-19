"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { string } from "zod";

export interface Application {
  id?: string;
  message?: string;
  applicant?: {
    name?: string;
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
    locationOptions?: Array<string>;
    languages?: Array<string>;
    addMoreInfo?: boolean;
  };
}

interface ApplicationContextType {
  application: Application | null;
  setApplication: (application: Application) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined,
);

export const ApplicationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [application, setApplication] = useState<Application | null>({});

  return (
    <ApplicationContext.Provider value={{ application, setApplication }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useApplication must be used within a ApplicationProvider");
  }
  return context;
};
