"use client";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

import CalendarComp from "@/components/calendar";
export default function CalendarPage() {
  const { textColor, inputColors } = useColorOptions();

  return (
    <div className={`CalendarPage ${textColor} w-full`}>
      <CalendarComp />
    </div>
  );
}
