"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import MessageCenter from "@/components/pages/messagingCenter";
import { useFellow } from "@/contexts/FellowContext";
import { useApplications } from "@/contexts/ApplicationsContext";
import SiteButton from "@/components/buttonsAndLabels/siteButton";
import { getRandomColorArray } from "@/utils/getRandomColorScheme";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
type CurrentSchemeType = ButtonColorOption;

export default function Messages() {
  const { accountType } = usePageContext();
  const { fellow } = useFellow();
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

  console.log(currentApps);

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

  useEffect(() => {
    const colors = getRandomColorArray(36);
    setColorArray(colors);
  }, []);

  return (
    <div className="MessagePage flex gap-8 text-jade md:pb-12">
      {/* For this main-messaging page, we'll have be able to pass appIds into the "messageCenter" component to display messages associated with a particular app */}
      {/* we'll need to find all the apps that have message Arrays with an item in it, and display those */}
      <div className="MailList">
        {currentApps?.map((app: any, index: any) => {
          return (
            <SiteButton
              variant="filled"
              aria="mail item"
              key={index}
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

      <MessageCenter activeMessages={activeMessages} />
    </div>
  );
}
