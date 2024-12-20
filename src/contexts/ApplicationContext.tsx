"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { string } from "zod";

export interface Application {
  id?: string;
  message?: string;
  applicant?: any;
  jobId?: string;
  business?: string;
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
