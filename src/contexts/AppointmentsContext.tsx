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
      id: "7",
      month: 0,
      day: 9,
      time: "12:00pm",
      businessName: "TechNova Solutions",
      jobId: "derp",
    },
    {
      id: "5",
      month: 0,
      day: 14,
      time: "3:00pm",
      businessName: "Creative Minds Studio",
      jobId: "blerp",
    },
    {
      id: "6",
      month: 0,
      day: 14,
      time: "5:00pm",
      businessName: "Pinnacle Enterprises",
      jobId: "3",
    },
    {
      id: "1",
      month: 0,
      day: 15,
      time: "2:00am",
      businessName: "Insight Analytics Co.",
      jobId: "4",
    },
    {
      id: "2",
      month: 0,
      day: 14,
      time: "9:00pm",
      businessName: "Finance Pros Ltd.",
      jobId: "5",
    },
    {
      id: "3",
      month: 0,
      day: 14,
      time: "2:00am",
      businessName: "QuickAssist Corp",
      jobId: "6",
    },
    {
      id: "4",
      month: 1,
      day: 14,
      time: "3:00pm",
      businessName: "Innovatech Manufacturing",
      jobId: "7",
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
