"use client";

import { usePageContext } from "@/contexts/PageContext";
import MessageCenter from "@/components/pages/messagingCenter/messagingCenter";
import { useEffect } from "react";

export default function AppMessages({ params }: any) {
  const { accountType } = usePageContext();
  //you'll get an appId sent into this param

  const scrollToPageBottom = () => {
    const messagePageContainer = document.getElementById("MessagePage"); // Replace with your actual container ID
    if (messagePageContainer) {
      messagePageContainer.scrollTop = messagePageContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToPageBottom();
  }, []);

  return (
    <div
      className="MessagePage flex min-h-[90vh] w-[80%] flex-grow items-center gap-8 self-center text-jade md:pb-12"
      id="MessagePage"
    >
      {/* MESSAGING PAGE HERE FOR SPECIFIC APPLICATION: {params.appId} */}
      {/* since this conversation is accessed through the AMS, relating to a specific app, we'll keep it focused on the conversation at hand with a button to go back to the general messaging center */}
      {/* this'll help with the mobile version as well */}
      <MessageCenter
        activeApp={params.appId}
        specificMessages
        messageHeight="h-full"
        // addClasses="h-full"
        // singleThread={true}
        //need to send details here so we scroll to the bottom of messages on load
      />
    </div>
  );
}
