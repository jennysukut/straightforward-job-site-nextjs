"use client";

import { useApplications } from "@/contexts/ApplicationsContext";
import { useEffect, useRef } from "react";
import MessageCenter from "@/components/pages/messagingCenter/messagingCenter";

export default function AppMessages({ params }: any) {
  const { applications } = useApplications();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const correspondingApp = applications?.find((app: any) => {
    return app.id === params.appId;
  });

  const scrollToPageBottom = () => {
    const offset = 0; // Adjust this value as needed
    const element = chatContainerRef.current;
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().bottom + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  // This is how we scroll to the bottom of messages
  useEffect(() => {
    if (correspondingApp?.mail && correspondingApp?.mail.length > 0) {
      setTimeout(() => {
        scrollToPageBottom();
      }, 500);
    }
  }, []);

  return (
    <div
      className="MessagePage flex h-full min-h-[90vh] w-[80%] flex-grow flex-col items-center gap-8 self-center text-jade md:pb-12"
      ref={chatContainerRef}
    >
      {/* since this conversation is accessed through the AMS, relating to a specific app, we'll keep it focused on the conversation at hand with a button to go back to the general messaging center */}
      {/* this'll help with the mobile version as well */}
      <MessageCenter
        activeApp={params.appId}
        specificMessages
        messageHeight="h-[90vh]"
      />
    </div>
  );
}
