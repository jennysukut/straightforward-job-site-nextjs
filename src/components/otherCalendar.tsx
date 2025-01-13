// import React, { useState } from "react";
// import dayjs from "dayjs";
// import InfoBox from "./informationDisplayComponents/infoBox";

// interface CalendarProps {
//   year: number;
//   month: number;
//   onDateClick: (date: Date) => void;
// }

// const OtherCalendar: React.FC<CalendarProps> = ({
//   year,
//   month,
//   onDateClick,
// }) => {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const firstDayOfMonth = dayjs(new Date(year, month, 1));
//   const lastDayOfMonth = dayjs(new Date(year, month + 1, 0));
//   const daysInMonth = lastDayOfMonth.date();
//   const firstDayIndex = firstDayOfMonth.day();

//   const generateCalendarGrid = (): JSX.Element[][] => {
//     let date = 1;
//     const calendarGrid = [];

//     for (let week = 0; week < 6; week++) {
//       const weekRow = [];
//       for (let day = 0; day < 7; day++) {
//         if (week === 0 && day < firstDayIndex) {
//           weekRow.push(<td key={`${week}-${day}`}></td>);
//         } else if (date > daysInMonth) {
//           break;
//         } else {
//           const dateObj = new Date(year, month, date);
//           const isCurrentDay = dayjs(dateObj).isSame(currentDate, "day");

//           weekRow.push(
//             <div
//               key={`${week}-${day}`}
//               onClick={() => onDateClick(dateObj)}
//               className={
//                 isCurrentDay
//                   ? "current-day"
//                   : "w-[5rem] border-[1px] border-jade text-right"
//               }
//             >
//               {date}
//             </div>,
//           );
//           date++;
//         }
//       }
//       calendarGrid.push(weekRow);
//     }

//     return calendarGrid;
//   };

//   return (
//     <div className="Calendar gap-2">
//       <div className="Header">
//         <div className="row flex">
//           {daysOfWeek.map((day) => (
//             <div className="w-[5rem]" key={day}>
//               {day}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="body">
//         {generateCalendarGrid().map((weekRow, index) => (
//           <div className="flex h-[4rem] border-[1px] border-sky" key={index}>
//             {weekRow}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
//   // <table className="calendar gap-2">
//   //   <thead>
//   //     <tr>
//   //       {daysOfWeek.map((day) => (
//   //         <th className="w-[5rem]" key={day}>
//   //           {day}
//   //         </th>
//   //       ))}
//   //     </tr>
//   //   </thead>
//   //   <tbody>
//   //     {generateCalendarGrid().map((weekRow, index) => (
//   //       <tr className="h-[4rem] rounded-lg border-2 border-sky" key={index}>
//   //         {weekRow}
//   //       </tr>
//   //     ))}
//   //   </tbody>
//   // </table>
//   // );
// };

// export default OtherCalendar;
