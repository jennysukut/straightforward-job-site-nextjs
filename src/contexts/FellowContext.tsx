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
  hobbies?: Array<string>;
  bookOrQuote?: Array<string>;
  petDetails?: string;
  links?: Array<string>;
  aboutMe?: string;
  avatar?: any;
  shadow?: string;
  locationOptions?: Array<string>;
  colorScheme?: string;
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
    avatar: "/avatars/question.svg",
    shadow: "drop-shadow-olive",
    colorScheme: "b1",
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
