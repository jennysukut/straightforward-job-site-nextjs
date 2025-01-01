import React, { useState } from "react";

const CalendarComp = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`}></td>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(<td key={i}>{i}</td>);
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
    <div className="Calendar">
      <div className="MonthAndButtons flex gap-6">
        <button onClick={handlePrevMonth}>Prev</button>
        <h2>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{generateCalendar()}</tbody>
      </table>
    </div>
  );
};

export default CalendarComp;
