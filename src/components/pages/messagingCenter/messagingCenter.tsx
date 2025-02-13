import { useState, useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useModal } from "@/contexts/ModalContext";
import { timeLog } from "console";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useApplications } from "@/contexts/ApplicationsContext";
import { useColors } from "@/contexts/ColorContext";

import React from "react";
import Image from "next/image";
import EditMessageModal from "../../modals/messagingModals/editMessageModal";
import InfoBox from "../../informationDisplayComponents/infoBox";
import SiteButton from "../../buttonsAndLabels/siteButton";
import InputComponent from "../../inputComponents/inputComponent";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";

export interface Messages {
  id: number;
  text: string;
  sender: string;
  date: string;
  timestamp: string;
  edited: boolean;
}

const MessageCenter = ({
  activeApp,
  correspondingApp,
  correspondingListing,
}: any) => {
  const { accountType } = usePageContext();
  const { showModal, hideModal } = useModal();
  const { jobListings } = useJobListings();
  const { applications, setApplications } = useApplications();
  const { currentColorScheme } = useColors();

  const [editingMessage, setEditingMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([] as Messages[]);
  const [updatedMessages, setUpdatedMessages] = useState([] as Messages[]);
  const [selectedApp, setSelectedApp] = useState({});

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "fellow",
      date: `${new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit" })}`,
      timestamp: `${new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      edited: false,
    };

    const index: number =
      applications?.findIndex((app: any) => app.id === correspondingApp?.id) ??
      -1;
    if (index !== -1) {
      const updatedApp = {
        ...(applications?.[index] as {
          mail?: {
            id: number;
            text: string;
            sender: string;
            date: string;
            timestamp: string;
            edited: boolean;
          }[];
        }),
        mail: [...(applications?.[index]?.mail || []), message],
      };
      console.log(updatedApp);
      const updatedApplications = [
        ...(applications ?? []).slice(0, index),
        updatedApp,
        ...(applications ?? []).slice(index + 1),
      ];
      setApplications(updatedApplications);
      updateMessages();
    }
    console.log(applications);
    setNewMessage("");
  };

  // Group Messages Into Dates
  const groupedMessages = messages.reduce(
    (acc: { [key: string]: typeof messages }, message: any) => {
      const date = message.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(message);
      return acc;
    },
    {},
  );

  // Sort Message Dates
  const sortedDates = Object.keys(groupedMessages).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  const editMessage = (id: any) => {
    setEditingMessage(id);
    const currentMessage = messages.find((message) => {
      return message.id === id;
    });
    showModal(<EditMessageModal message={currentMessage} app={selectedApp} />);
    // We need to make a way for edited messages to get reflected in the database - this might be easier to do in integration, since it'll be easier to work with the data then.
    // we can find the specific message via it's id and update it pretty simply.
    setTimeout(() => {
      setEditingMessage(null);
    }, 2000);
  };

  const updateMessages = () => {
    if (activeApp) {
      const selectedApp: any = applications?.find((app: any) => {
        return app.id === activeApp;
      });
      setSelectedApp(selectedApp);
      setMessages(selectedApp.mail);
      // console.log(selectedApp);
    }
  };

  useEffect(() => {
    if (updatedMessages.length > 0) {
      setMessages(updatedMessages);
      setUpdatedMessages([]);
    } else if (activeApp) {
      updateMessages();
    }
  }, [updateMessages, setApplications, activeApp, applications]);

  return (
    <div className="MessagingCenter -mb-8 flex h-full w-full max-w-[1600px] flex-col justify-between">
      <div className="Messages flex w-[100%] flex-col self-center align-top">
        <h2 className="text-right text-emerald">
          Your Conversation with {correspondingListing?.job?.businessName}
        </h2>
        <p className="Subtitle mb-4 mr-2 text-right font-medium lowercase italic text-olive">
          regarding the {correspondingListing?.job?.jobTitle} position
        </p>

        {sortedDates.map((date) => (
          <div key={date} className="flex w-[100%] flex-col gap-3">
            <div className="Divider mb-2 flex items-center">
              <div className="flex-grow border-t-2 border-dotted border-olive border-opacity-20"></div>
              <p className="mx-3 text-center text-sm text-olive">{date}</p>
              <div className="flex-grow border-t-2 border-dotted border-olive border-opacity-20"></div>
            </div>
            {groupedMessages[date].map((message) => {
              const isOwn =
                (message.sender === "fellow" && accountType === "Fellow") ||
                (message.sender === "business" && accountType === "Business");
              return (
                <div
                  key={message.id}
                  className={`Message ${isOwn ? "self-end" : "self-start"} flex flex-col gap-4`}
                >
                  <InfoBox
                    colorScheme={
                      (currentColorScheme || "b3") as ButtonColorOption
                    }
                    variant={isOwn ? "filled" : "hollow"}
                    aria={message.text}
                    size="message"
                  >
                    <p
                      className={`MessageText ${message.text.length > 100 ? "py-2 pl-3 pr-2 indent-4" : "-py-2"} ${!isOwn ? "text-midnight" : ""} text-[.95rem]`}
                    >
                      {message.text}
                    </p>
                  </InfoBox>
                  <div
                    className={`TimestampGroup flex gap-2 ${isOwn ? "self-end" : ""}`}
                  >
                    {isOwn && message.edited && (
                      <p className="EditedNotification text-xs text-olive opacity-50">
                        edited |
                      </p>
                    )}
                    <p
                      className={`Timestamp ${isOwn ? "text-right text-olive" : "ml-2 text-left"} text-xs`}
                    >
                      {message.timestamp}
                    </p>
                    {isOwn && (
                      <Image
                        src="/edit-pencil.svg"
                        alt="edit"
                        width={12}
                        height={12}
                        className="opacity-50 hover:opacity-80"
                        onClick={() => editMessage(message.id)}
                      />
                    )}
                    {!isOwn && message.edited && (
                      <p className="EditedNotification text-xs text-jade opacity-50">
                        | edited
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="MessageInput mt-10 flex items-center justify-center gap-4 border-t-2 border-dotted border-olive border-opacity-25 p-4 align-baseline"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Your message..."
          className="w-[90%] rounded-full border-2 border-jade bg-cream px-4 py-[.6rem] text-emerald drop-shadow-smJade placeholder:text-jade focus:outline-none"
        />
        <SiteButton
          type="submit"
          variant="filled"
          colorScheme="b1"
          aria="send"
          size="medium"
          addClasses="px-8 py-[.6rem]"
        >
          send
        </SiteButton>
      </form>
    </div>
  );
};

export default MessageCenter;
