// import SiteButton from "@/components/buttonsAndLabels/siteButton";

// import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
// import { useApplications } from "@/contexts/ApplicationsContext";
// import { useFellow } from "@/contexts/FellowContext";
// import { useEffect, useState } from "react";

// const RenderFellowMessageList = ({
//   colorArray,
//   activeApp,
//   showMessages,
//   setCurrentMessages,
// }: any) => {
//   const { applications, setApplications } = useApplications();
//   const { fellow } = useFellow();

//   const [filteredMsgs, setFilteredMsgs] = useState<string[]>([]);

//   const filterMessages = () => {
//     const filteredMessages: any = currentMsgs?.filter((msg: any) => {
//       const activeAppMessages = msg.appStatus !== "closed";
//       return activeAppMessages;
//     });

//     setFilteredMsgs(filteredMessages);
//   };

//   const currentMsgs = applications
//     ?.filter((app: any) => app.applicant === fellow?.id && app.mail.length > 0)
//     .sort((a, b) => {
//       const mostRecentA = a.mail?.reduce((latest, message) => {
//         const messageDate = new Date(`${message.date} ${message.timestamp}`);
//         return messageDate > latest ? messageDate : latest;
//       }, new Date(0));

//       const mostRecentB = b.mail?.reduce((latest, message) => {
//         const messageDate = new Date(`${message.date} ${message.timestamp}`);
//         return messageDate > latest ? messageDate : latest;
//       }, new Date(0));

//       return (mostRecentB?.getTime() ?? 0) - (mostRecentA?.getTime() ?? 0); // Sort in descending order
//     });

//   useEffect(() => {
//     setCurrentMessages(filteredMsgs);
//   }, [filteredMsgs]);

//   useEffect(() => {
//     filterMessages();
//   }, []);

//   return (
//     <div className="MessageListGroup flex flex-col gap-4">
//       {filteredMsgs?.map((app: any, index: any) => {
//         const recentMessages = app.mail?.filter(
//           (message: any) => message.sender === "business",
//         );
//         const messageStatus = recentMessages
//           ? recentMessages[recentMessages.length - 1].read === true
//             ? "read"
//             : "new"
//           : "no messages";

//         return (
//           <div key={index} className="FellowMessageGroup flex gap-2">
//             <SiteButton
//               variant="hollow"
//               aria="mail item"
//               addClasses="w-[25vw] py-3 overflow-hidden truncate px-2"
//               colorScheme={
//                 colorArray[index % colorArray.length] as ButtonColorOption
//               }
//               onClick={() => showMessages(app.id)}
//               isSelected={activeApp === app.id}
//             >
//               <div className="MsgInfo flex justify-between">
//                 <p className="BusinessName w-[90%] overflow-hidden truncate text-left text-[.85rem]">
//                   {app.business}
//                 </p>
//                 <p className="ReadStatus text-[.75rem]">| {messageStatus}</p>
//               </div>
//             </SiteButton>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export { RenderFellowMessageList };
