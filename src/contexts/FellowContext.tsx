"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";

export interface Fellow {
  id?: string;
  name?: string;
  dailyApplications?: Array<{ id: string; message: string; status: string }>;
  jobApplications?: Record<string, any>;
  newApplication?: Boolean;
  newSave?: Boolean;
  profileIsBeingEdited?: Boolean;
  profileUpdate?: Boolean;
  profile?: {
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
  };
}

interface FellowContextType {
  fellow: Fellow | null;
  setFellow: (fellow: Fellow) => void;
}

const FellowContext = createContext<FellowContextType | undefined>(undefined);

export const FellowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [fellow, setFellow] = useState<Fellow | null>(null);

  return (
    <FellowContext.Provider
      value={{
        fellow,
        setFellow,
      }}
    >
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
