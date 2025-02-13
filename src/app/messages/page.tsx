"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import MessageCenter from "@/components/pages/messagingCenter";
import { useFellow } from "@/contexts/FellowContext";
import { useApplications } from "@/contexts/ApplicationsContext";
import SiteButton from "@/components/buttonsAndLabels/siteButton";
import { getRandomColorArray } from "@/utils/getRandomColorScheme";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useJob } from "@/contexts/JobContext";
type CurrentSchemeType = ButtonColorOption;

export default function Messages() {
  const { accountType } = usePageContext();
  const { fellow } = useFellow();
  const { jobListings } = useJobListings();
  const { applications } = useApplications();
  const [colorArray, setColorArray] = useState<CurrentSchemeType[]>([]);
  const [activeApp, setActiveApp] = useState("");
  const [activeMessages, setActiveMessages] = useState([
    {
      id: 1,
      text: "Testing Setting Active Messages.",
      sender: "business",
      date: "February 10",
      timestamp: "10:00 AM",
      edited: true,
    },
    {
      id: 2,
      text: "Sounds good!",
      sender: "fellow",
      date: "February 10",
      timestamp: "10:01 AM",
      edited: false,
    },
  ]);

  // get the fellow's applications
  // we'll test it out with our faux ID: testid

  const currentApps = applications?.filter((app: any) => {
    return app.applicant === "testid" && app.mail;
  });

  const correspondingApp = applications?.find((app: any) => {
    return app.id === activeApp;
  });

  const correspondingListing = jobListings?.find((jl: any) => {
    return jl.jobId === correspondingApp?.jobId;
  });

  // make something so we show the latest messages initially in the messenger.
  // also, make sure we can have a way to expand the conversation, opening it in the appId page?
  const showMessages = (id: any) => {
    if (activeApp === id) {
      setActiveApp("");
      setActiveMessages([]);
    } else {
      setActiveApp(id);
      const selectedApp: any = currentApps?.find((app: any) => {
        return app.id === id;
      });
      if (selectedApp?.mail) {
        setActiveMessages(selectedApp.mail);
      }
    }
  };

  // useEffect(() => {
  //   const colors = getRandomColorArray(36);
  //   setColorArray(colors);
  //   // perhaps it'd be better to use the idealButtonColors array at a random number starting point?
  // }, []);

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
  }, []);

  return (
    <div className="MessagePage -mb-10 flex w-[95%] justify-between justify-items-start gap-10 self-center text-jade md:pb-12">
      {/* For this main-messaging page, we'll have be able to pass appIds into the "messageCenter" component to display messages associated with a particular app */}
      {/* we'll need to find all the apps that have message Arrays with an item in it, and display those */}
      <div className="MailList flex h-[75vh] flex-col gap-4 border-r-2 border-olive border-opacity-25 pr-8">
        <h2 className="Title text-center">Your Messages:</h2>
        {currentApps?.map((app: any, index: any) => {
          return (
            <SiteButton
              variant="filled"
              size="medium"
              aria="mail item"
              key={index}
              addClasses="w-[20vw] overflow-hidden truncate"
              colorScheme={
                colorArray[index % colorArray.length] as ButtonColorOption
              }
              onClick={() => showMessages(app.id)}
              isSelected={activeApp === app.id}
            >
              {app.business}
            </SiteButton>
          );
        })}
      </div>
      <div className="MessageCenter w-[80vw] pl-2 pr-10">
        {/* <h2 className="text-right text-emerald">
          Your Conversation with {correspondingListing?.job?.businessName}
        </h2>
        <p className="Subtitle mb-4 mr-2 text-right font-medium lowercase italic text-olive">
          regarding the {correspondingListing?.job?.jobTitle} position
        </p> */}
        <MessageCenter
          activeMessages={activeMessages}
          activeApp={activeApp}
          correspondingApp={correspondingApp}
          correspondingListing={correspondingListing}
        />
      </div>
    </div>
  );
}
