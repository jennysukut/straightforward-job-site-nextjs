"use client";

import { usePageContext } from "@/contexts/PageContext";
import MessageCenter from "@/components/pages/messagingCenter/messagingCenter";
export default function AppMessages({ params }: any) {
  const { accountType } = usePageContext();
  //you'll get an appId sent into this param

  return (
    <div className="MessagePage flex min-h-[75vh] w-[80%] flex-grow items-center gap-8 self-center text-jade md:pb-12">
      {/* MESSAGING PAGE HERE FOR SPECIFIC APPLICATION: {params.appId} */}
      {/* since this conversation is accessed through the AMS, relating to a specific app, we'll keep it focused on the conversation at hand with a button to go back to the general messaging center */}
      {/* this'll help with the mobile version as well */}
      <MessageCenter activeApp={params.appId} specificMessages />
    </div>
  );
}
