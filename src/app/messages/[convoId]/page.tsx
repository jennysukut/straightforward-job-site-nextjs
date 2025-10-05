"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { usePageContext } from "@/contexts/PageContext";

import MessageCenter from "@/components/pages/messagingCenter/messagingCenter";
import LoginModal from "@/components/modals/loginModal";

// PAGE RUNDOWN: AppMessages Page is passed an appId to use in displaying messages. It displays only the messages from that application.
// It finds the application via the Id and passes it into the MessageCenter.
// It's also tasked with scrolling to the bottom of the page - once we're connected to the database, we might just render the messages backwards instead?

// TODO: Make sure this URL conversation is restricted to either of the parties involved or an admin?

export default function AppMessages({ params }: any) {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { isLoggedIn } = usePageContext();
  const router = useRouter();
  const { showModal } = useModal();
  const [loadingMessages, setLoadingMessages] = useState(true);

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
    if (loadingMessages === false) {
      // setTimeout(() => {
      scrollToPageBottom();
      // }, 5000);
    }
  }, [loadingMessages]);

  // give a timeout and if it's not logged in, perhaps open the logIn Modal?
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!isLoggedIn) {
  //       showModal(<LoginModal />);
  //     }
  //   }, 5000);
  // }, []);

  useEffect(() => {
    if (isLoggedIn) return; // only run when not logged in

    const timer = setTimeout(async () => {
      if (!isLoggedIn) {
        showModal(<LoginModal prompt={"login to access"} />);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, router]);

  return (
    <div
      className="MessagePage flex h-full min-h-[90vh] w-[80%] flex-grow flex-col items-center gap-8 self-center text-jade md:pb-12"
      ref={chatContainerRef}
    >
      {/* since this conversation is accessed through the AMS, relating to a specific app, we'll keep it focused on the conversation at hand with a button to go back to the general messaging center */}
      {/* this'll help with the mobile version as well */}
      <MessageCenter
        activeConvo={params.convoId}
        specificMessages
        messageHeight="h-full"
        setLoadingMessages={setLoadingMessages}
        loadingMessages={loadingMessages}
      />
    </div>
  );
}
