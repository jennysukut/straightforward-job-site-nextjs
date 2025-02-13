"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";
import { useApplications } from "@/contexts/ApplicationsContext";
import { getRandomColorArray } from "@/utils/getRandomColorScheme";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useJob } from "@/contexts/JobContext";
import { Applications } from "@/contexts/ApplicationsContext";

import MessageCenter from "@/components/pages/messagingCenter/messagingCenter";
import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
import SiteButton from "@/components/buttonsAndLabels/siteButton";
import SiteLabel from "@/components/buttonsAndLabels/siteLabel";

type CurrentSchemeType = ButtonColorOption;

export default function Messages() {
  const { accountType } = usePageContext();
  const { fellow } = useFellow();
  const { jobListings } = useJobListings();
  const { applications } = useApplications();
  const [colorArray, setColorArray] = useState<CurrentSchemeType[]>([]);
  const [activeApp, setActiveApp] = useState("");

  // Make a Display if their currentApps length is 0 and display some kind of error instead, telling them they don't currently have any messages

  // Find the current Applications and sort them via the date of their latest messages, so the most recent messages are displayed at the top
  const currentApps = applications
    ?.filter((app: any) => app.applicant === fellow?.id && app.mail)
    .sort((a, b) => {
      const mostRecentA = a.mail?.reduce((latest, message) => {
        const messageDate = new Date(`${message.date} ${message.timestamp}`);
        return messageDate > latest ? messageDate : latest;
      }, new Date(0));

      const mostRecentB = b.mail?.reduce((latest, message) => {
        const messageDate = new Date(`${message.date} ${message.timestamp}`);
        return messageDate > latest ? messageDate : latest;
      }, new Date(0));

      return (mostRecentB?.getTime() ?? 0) - (mostRecentA?.getTime() ?? 0); // Sort in descending order
    });

  const correspondingApp = applications?.find((app: any) => {
    return app.id === activeApp;
  });

  const correspondingListing = jobListings?.find((jl: any) => {
    return jl.jobId === correspondingApp?.jobId;
  });

  const showMessages = (id: any) => {
    if (activeApp === id) {
      setActiveApp(currentApps?.[0]?.id || "");
    } else {
      setActiveApp(id);
    }
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
    setActiveApp(currentApps?.[0]?.id || "");
  }, []);

  return (
    <div className="MessagePage -mb-10 flex w-[95%] justify-between justify-items-start gap-10 self-center text-jade md:pb-12">
      <div className="MailList flex h-[75vh] flex-col gap-4 border-r-2 border-olive border-opacity-25 pr-8">
        <h2 className="Title text-center">Your Messages:</h2>
        {currentApps?.map((app: any, index: any) => {
          return (
            <div key={index} className="MessageGroup flex gap-2">
              <SiteButton
                variant="hollow"
                size="medium"
                aria="mail item"
                addClasses="w-[20vw] overflow-hidden truncate"
                colorScheme={
                  colorArray[index % colorArray.length] as ButtonColorOption
                }
                onClick={() => showMessages(app.id)}
                isSelected={activeApp === app.id}
              >
                {app.business}
              </SiteButton>
              {/* trying to make a good notification button */}
              {/* {app.mail.length > 3 && (
                <SiteLabel
                  variant="notification"
                  size="notification"
                  aria="notification"
                  colorScheme={
                    colorArray[index % colorArray.length] as ButtonColorOption
                  }
                  addClasses="mt-4"
                />
              )} */}
            </div>
          );
        })}
      </div>
      <div className="MessageCenter w-[80vw] pl-2 pr-10">
        <MessageCenter
          activeApp={activeApp}
          correspondingApp={correspondingApp}
          correspondingListing={correspondingListing}
        />
      </div>
    </div>
  );
}
