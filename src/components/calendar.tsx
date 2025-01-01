import React, { useState } from "react";
import SiteButton from "./buttonsAndLabels/siteButton";
import SiteLabel from "./buttonsAndLabels/siteLabel";
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
            className={`CalendarInfo ${currentDay === i && currentMonth === actualMonth ? "bg-peach bg-opacity-20" : ""} flex h-[100%] w-[100%] flex-col items-start overflow-hidden p-1`}
          >
            <p className="Date self-start">{i}</p>
            {interviewDate.day === i &&
              interviewDate.month === currentMonth && (
                <div className="Appointment flex flex-col items-center gap-1">
                  <SiteLabel
                    aria="apptTest"
                    variant="display"
                    colorScheme="b6"
                    textSize="small"
                    size="extraSmall"
                  >
                    12:00pm
                  </SiteLabel>
                  <p className="AppointmentDetails text-center text-xs">
                    interview with Business With Long Name
                  </p>
                </div>
              )}
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
        <button onClick={handlePrevMonth}>Prev</button>
        <h1 className="MonthName">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h1>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <table>
        <thead>
          <tr className="mb-2">
            <th>SUN</th>
            <th>MON</th>
            <th>TUE</th>
            <th>WED</th>
            <th>THU</th>
            <th>FRI</th>
            <th>SAT</th>
          </tr>
        </thead>
        <tbody>{generateCalendar()}</tbody>
      </table>
    </div>
  );
};

export default CalendarComp;
