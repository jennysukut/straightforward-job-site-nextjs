"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { string } from "zod";

export interface Reports {
  reportReason?: string;
  otherInfo?: string;
  offenderId: string;
  reportedBy: string;
}

interface ReportsType {
  reports: Reports[] | null;
  setReports: (reports: Reports[]) => void;
}

const ReportsContext = createContext<ReportsType | undefined>(undefined);

export const ReportsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [reports, setReports] = useState<Reports[] | null>([]);

  return (
    <ReportsContext.Provider value={{ reports, setReports }}>
      {children}
    </ReportsContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error("useReports must be used within a ReportsProvider");
  }
  return context;
};
