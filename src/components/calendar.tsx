import React, { useState, useEffect } from "react";
import { getRandomColorScheme } from "@/utils/getRandomColorScheme";
import { useModal } from "@/contexts/ModalContext";
import { useAppointments } from "@/contexts/AppointmentsContext";

import SiteButton from "./buttonsAndLabels/siteButton";
import SiteLabel from "./buttonsAndLabels/siteLabel";
import Image from "next/image";
import ShuffleIdealButtonPattern from "./buttonsAndLabels/shuffleIdealButtonPattern";
import AppointmentDetailsModal from "./modals/appointmentModals/appointmentDetailsModal";
import AppointmentListModal from "./modals/appointmentModals/AppointmentListModal";

const CalendarComp = ({ size, addClasses }: any) => {
  const { showModal, hideModal } = useModal();
  const { appointments } = useAppointments();

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [actualMonth, setActualMonth] = useState(new Date().getMonth());
  const [colorArray, setColorArray] = useState(Array<any>);

  const [expandedDays, setExpandedDays] = useState(new Set());

  // Helper function to toggle expanded state for a day
  const toggleDayExpand = (day: any) => {
    const newExpandedDays = new Set(expandedDays);
    if (newExpandedDays.has(day)) {
      newExpandedDays.delete(day);
    } else {
      newExpandedDays.add(day);
    }
    setExpandedDays(newExpandedDays);
  };

  const viewAppointments = (apps: any, i: any) => {
    console.log(apps);
    showModal(
      <AppointmentListModal
        apps={apps}
        date={i}
        currentMonth={currentMonth + 1}
      />,
    );
  };

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
            className={`CalendarInfo ${currentDay === i && currentMonth === actualMonth ? "bg-peach bg-opacity-20" : ""} -ml-[0.1rem] -mt-[0.1rem] flex ${size === "small" ? "max-h-[5rem] max-w-[7rem]" : "max-h-[8rem] max-w-[10rem]"} h-[104%] w-[104%] flex-col items-center justify-between overflow-hidden overflow-y-visible p-1`}
          >
            <p className="Date self-start px-2 pt-1">{i}</p>
            <div className="Appointment flex flex-col items-center justify-center gap-0 text-center">
              {appointments &&
                appointments
                  .filter((app) => app.day === i && app.month === currentMonth)
                  .map((app, index, filteredApps) => {
                    if (!expandedDays.has(i) && index > 0) return null;

                    return (
                      <div key={index}>
                        <SiteLabel
                          aria="apptTest"
                          variant="display"
                          colorScheme={
                            colorArray[
                              Math.floor(Math.random() * colorArray.length)
                            ]
                          }
                          textSize="small"
                          size={size === "small" ? "tiny" : "extraSmall"}
                          addClasses={`justify-center items-center cursor-pointer mx-1 mb-2 ${size === "small" ? "w-[5rem]" : "w-[7rem]"}`}
                          onClick={() =>
                            showModal(<AppointmentDetailsModal app={app} />)
                          }
                        >
                          {app.time}
                        </SiteLabel>

                        {/* Show "Show More" button only after first appointment if there are more */}
                        {index === 0 &&
                          filteredApps.length > 1 &&
                          !expandedDays.has(i) && (
                            <SiteLabel
                              variant="display"
                              aria="test"
                              size="tiny"
                              textSize="small"
                              addClasses="justify-center items-center cursor-pointer mx-1 mb-2"
                              // onClick={() => toggleDayExpand(i)}
                              onClick={() => viewAppointments(filteredApps, i)}
                            >
                              +{filteredApps.length - 1} more
                            </SiteLabel>
                          )}

                        {/* Show "Show Less" button after last appointment when expanded */}
                        {/* {index === filteredApps.length - 1 &&
                          expandedDays.has(i) && (
                            <SiteLabel
                              aria="test"
                              variant="display"
                              size="tiny"
                              textSize="small"
                              addClasses="justify-center items-center cursor-pointer mx-1 mb-2"
                              onClick={() => toggleDayExpand(i)}
                            >
                              show less
                            </SiteLabel>
                          )} */}
                      </div>
                    );
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
