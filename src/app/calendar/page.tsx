"use client";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import OtherCalendar from "@/components/otherCalendar";
import CalendarComp from "@/components/calendar";

export default function CalendarPage() {
  const { textColor, inputColors } = useColorOptions();

  const dateClick = (date: any) => {
    console.log(date);
  };

  return (
    <div
      className={`CalendarPage ${textColor} flex w-full items-center justify-center self-center`}
    >
      <CalendarComp />
      {/* <OtherCalendar year={2024} month={1} onDateClick={dateClick} /> */}
    </div>
  );
}
