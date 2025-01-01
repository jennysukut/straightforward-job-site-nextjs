import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Value } from "react-calendar/dist/esm/shared/types.js";

export default function CalendarComp({}) {
  const [value, setValue] = useState(new Date());

  const handleChange = (nextValue: Value) => {
    if (nextValue instanceof Date) {
      setValue(nextValue);
    }
  };

  return (
    <div className="Calendar w-full p-8">
      {/* <Calendar onChange={handleChange} value={value} /> */}
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    </div>
  );
}
