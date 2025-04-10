"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";
import { useApplications } from "@/contexts/ApplicationsContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useJobListings } from "@/contexts/JobListingsContext";
// import { RenderFellowMessageList } from "@/components/pages/messagingCenter/fellowMessagingComponents";
// import { RenderBusinessMessageList } from "@/components/pages/messagingCenter/businessMessagingComponents";

// import MessageCenter from "@/components/pages/messagingCenter/messagingCenter";
import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
import Image from "next/image";

type CurrentSchemeType = ButtonColorOption;

// TO-DO:
// Make a Display if their currentApps length is 0 and display some kind of error instead, telling them they don't currently have any messages
// Check to see if the account is a fellow or business, and display the info differently for each.
// Figure out if we want to have a "read" / "unopened" / "new" label on the mailList - we'd need to have a field in the mail details that updates that. I think this might be better to try after MVP.

// PAGE RUNDOWN: The Messages page's main job is to hold the activeApp State,
// activeApp is informed by the currentMessages, controlled from the Components: RenderBusinessMessageList and RenderFellowMessageList
// activeApp is then passed into the MessageCenter, which will display the active Messages related to the activeApp application.

export default function Messages() {
  const { accountType } = usePageContext();
  const { fellow } = useFellow();
  const { jobListings } = useJobListings();
  const { applications } = useApplications();
  const [colorArray, setColorArray] = useState<CurrentSchemeType[]>([]);
  const [activeApp, setActiveApp] = useState("");
  const [currentMessages, setCurrentMessages] = useState(Array<any>);

  // Find the current Applications and sort them via the date of their latest messages, so the most recent messages are displayed at the top

  const showMessages = (id: any) => {
    if (activeApp === id) {
      setActiveApp(currentMessages?.[0]?.id || "");
    } else {
      setActiveApp(id);
    }
  };

  // const showJobMessages = (id: any) => {
  //   console.log("showing applicants for this job:", id);
  // };

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
  }, []);

  useEffect(() => {
    if (currentMessages) {
      setActiveApp(currentMessages?.[0]?.id || "");
    }
  }, [currentMessages]);

  return (
    <div className="MessagePage -mb-10 flex w-[95%] justify-between justify-items-start gap-10 self-center text-jade md:pb-12">
      <div className="MailList flex min-h-[75vh] flex-col justify-between gap-4 border-r-2 border-olive border-opacity-25 pr-8">
        <div className="MessageListGroup flex flex-col gap-4">
          {/* message list for fellows */}

          {/* {accountType === "Fellow" && (
            <RenderFellowMessageList
              colorArray={colorArray}
              activeApp={activeApp}
              showMessages={showMessages}
              setCurrentMessages={setCurrentMessages}
            />
          )} */}

          {/* {accountType === "Business" && (
            <RenderBusinessMessageList
              colorArray={colorArray}
              activeApp={activeApp}
              showMessages={showMessages}
              setCurrentMessages={setCurrentMessages}
            />
          )} */}
        </div>
        <Image
          width={140}
          height={140}
          alt="decor"
          src="/lime-flower.svg"
          className={`${!activeApp ? "-mb-4 -ml-4" : "-mb-6 -ml-20"} self-baseline`}
        ></Image>
      </div>
      <div className="MessageCenter -mr-4 w-full pl-2 pr-10">
        {/* <MessageCenter
          activeApp={activeApp}
          messageHeight="max-h-[65vh] min-h-[55vh]"
        /> */}
      </div>
    </div>
  );
}
