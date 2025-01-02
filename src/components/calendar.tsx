import React, { useState } from "react";
import SiteButton from "./buttonsAndLabels/siteButton";
import SiteLabel from "./buttonsAndLabels/siteLabel";
import Image from "next/image";

const CalendarComp = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [actualMonth, setActualMonth] = useState(new Date().getMonth());

  const interviewDate = {
    month: 0,
    day: 9,
    company: "Test Company",
  };

  // we need to make sure we sort the appointments by time when we're adding them to the list so they'll be rendered in the correct order?
  const appointments = [
    { month: 0, day: 9, time: "12:00pm", company: "Business Co." },
    { month: 0, day: 14, time: "3:00pm", company: "Other Company" },
    { month: 0, day: 14, time: "5:00pm", company: "Appt Company" },
    { month: 0, day: 15, time: "2:00am", company: "Holden Co." },
  ];

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`}></td>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <td
          className="h-[7rem] w-[9rem] items-start border-[2px] border-jade border-opacity-40 text-end"
          key={i}
        >
          <div
            onClick={() => console.log(currentMonth, i)}
            className={`CalendarInfo ${currentDay === i && currentMonth === actualMonth ? "bg-peach bg-opacity-20" : ""} -ml-1 -mt-1 flex h-[104%] w-[104%] flex-col items-start justify-between overflow-visible p-1`}
          >
            <p className="Date self-start">{i}</p>
            {appointments.map((app, index) => {
              if (app.day === i && app.month === currentMonth) {
                return (
                  <div
                    className="Appointment flex flex-col items-center gap-1 text-center"
                    key={index}
                  >
                    <SiteLabel
                      aria="apptTest"
                      variant="display"
                      colorScheme="b6"
                      textSize="small"
                      size="extraSmall"
                      addClasses="w-full"
                    >
                      {app.time} with {app.company}
                    </SiteLabel>
                  </div>
                );
              }
            })}
          </div>
        </td>,
      );
    }

    const rows = [];
    let dayIndex = 0;
    while (dayIndex < days.length) {
      rows.push(
        <tr key={dayIndex / 7}>{days.slice(dayIndex, dayIndex + 7)}</tr>,
      );
      dayIndex += 7;
    }

    return rows;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth - 1);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth + 1);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    }
  };

  return (
    <div className="Calendar justify-center self-center">
      <div className="MonthAndButtons mb-2 flex items-center justify-center gap-8 self-center text-emerald">
        <button onClick={handlePrevMonth}>
          <Image
            src="/back-arrow.svg"
            alt="prev"
            width={20}
            height={20}
            className="opacity-50 hover:opacity-80"
          />
        </button>
        <h1 className="MonthName">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h1>
        <button onClick={handleNextMonth}>
          <Image
            src="/forward-arrow.svg"
            alt="next"
            width={20}
            height={20}
            className="opacity-50 hover:opacity-80"
          />
        </button>
      </div>
      <table>
        <thead>
          <tr className="mb-2">
            <th>sun</th>
            <th>mon</th>
            <th>tue</th>
            <th>wed</th>
            <th>thu</th>
            <th>fri</th>
            <th>sat</th>
          </tr>
        </thead>
        <tbody>{generateCalendar()}</tbody>
      </table>
    </div>
  );
};

export default CalendarComp;
