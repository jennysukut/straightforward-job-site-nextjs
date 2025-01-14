"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { string } from "zod";

export interface Appointments {
  id?: string;
  month?: number;
  day?: number;
  time?: string;
  businessName?: string;
  jobId?: string;
  note?: string;
}

interface AppointmentsContextType {
  appointments: Appointments[] | null;
  setAppointments: (appointments: Appointments[]) => void;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(
  undefined,
);

export const AppointmentsContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [appointments, setAppointments] = useState<Appointments[] | null>([
    {
      id: "1",
      month: 0,
      day: 15,
      time: "2:00am",
      businessName: "Insight Analytics Co.",
      jobId: "chwit7",
    },
    {
      id: "3",
      month: 0,
      day: 14,
      time: "2:00am",
      businessName: "QuickAssist Corp",
      jobId: "dfkjb8",
    },
    {
      id: "4",
      month: 1,
      day: 14,
      time: "3:00pm",
      businessName: "Innovatech Manufacturing",
      jobId: "cv9t4t",
    },
  ]);

  return (
    <AppointmentsContext.Provider value={{ appointments, setAppointments }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error(
      "useAppointments must be used within a AppointmentsProvider",
    );
  }
  return context;
};
