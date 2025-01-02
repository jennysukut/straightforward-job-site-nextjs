import React, { useState, useEffect } from "react";
import SiteButton from "./buttonsAndLabels/siteButton";
import SiteLabel from "./buttonsAndLabels/siteLabel";
import Image from "next/image";
import ShuffleIdealButtonPattern from "./buttonsAndLabels/shuffleIdealButtonPattern";

const CalendarComp = ({ size, addClasses }: any) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [actualMonth, setActualMonth] = useState(new Date().getMonth());
  const [colorArray, setColorArray] = useState(Array<any>);

  // we need to make sure we sort the appointments by time when we're adding them to the list so they'll be rendered in the correct order?
  const appointments = [
    { month: 0, day: 9, time: "12:00pm", company: "Business Co." },
    { month: 0, day: 14, time: "3:00pm", company: "Other Company" },
    { month: 0, day: 14, time: "5:00pm", company: "Appt Company" },
    { month: 0, day: 15, time: "2:00am", company: "Holden Co." },
    { month: 0, day: 14, time: "9:00pm", company: "Place & Stuff Co." },
    { month: 0, day: 14, time: "2:00am", company: "Other Business" },
    { month: 1, day: 14, time: "3:00pm", company: "Other Company" },
  ];

  const generateCalendar = (size: any) => {
    const firstDay = new Date(currentYear, currentMonth).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`}></td>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <td
          className={`${size === "small" ? "h-[5rem] w-[7rem]" : "h-[7rem] w-[9rem]"} items-start border-[2px] border-jade border-opacity-40 text-end`}
          key={i}
        >
          <div
            onClick={() => console.log(currentMonth, i)}
            className={`CalendarInfo ${currentDay === i && currentMonth === actualMonth ? "bg-peach bg-opacity-20" : ""} -ml-1 -mt-1 flex ${size === "small" ? "max-h-[5rem] max-w-[7rem]" : "max-h-[8rem] max-w-[10rem]"} h-[104%] w-[104%] flex-col items-center justify-between overflow-hidden overflow-y-visible p-1`}
          >
            <p className="Date self-start px-2 pt-1">{i}</p>
            <div className="Appointment flex flex-col items-center justify-center gap-0 text-center">
              {appointments.map((app, index) => {
                if (app.day === i && app.month === currentMonth) {
                  return (
                    <SiteLabel
                      aria="apptTest"
                      key={index}
                      variant="display"
                      colorScheme={colorArray[index % colorArray.length]}
                      textSize="small"
                      size={size === "small" ? "tiny" : "extraSmall"}
                      addClasses="justify-center items-center cursor-pointer mx-1"
                      onClick={() => console.log(app)}
                    >
                      {size === "small"
                        ? `${app.time}`
                        : `${app.time} with ${app.company}`}
                    </SiteLabel>
                  );
                }
              })}
            </div>
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

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
  }, []);

  console.log(size);

  return (
    <div
      className={`Calendar ${addClasses} -mt-8 justify-center self-center p-4`}
    >
      <div className="MonthAndButtons mb-2 flex items-center justify-center gap-8 self-center text-jade">
        <button onClick={handlePrevMonth}>
          <Image
            src="/back-arrow.svg"
            alt="prev"
            width={20}
            height={20}
            className="opacity-50 hover:opacity-80"
          />
        </button>
        <h2 className="MonthName">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
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
      <table className="table-fixed">
        <thead>
          <tr className="h-[2rem]">
            <th>sun</th>
            <th>mon</th>
            <th>tue</th>
            <th>wed</th>
            <th>thu</th>
            <th>fri</th>
            <th>sat</th>
          </tr>
        </thead>
        <tbody>{generateCalendar(size)}</tbody>
      </table>
    </div>
  );
};

export default CalendarComp;
