"use client";

import { useEffect, useRef } from "react";
import MessageCenter from "@/components/pages/messagingCenter/messagingCenter";

export default function AppMessages({ params }: any) {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    setTimeout(() => {
      scrollToPageBottom();
    }, 500);
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
        messageHeight="h-full"
      />
    </div>
  );
}
