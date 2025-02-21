"use client";
import { useState, useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useModal } from "@/contexts/ModalContext";
import { timeLog } from "console";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useApplications } from "@/contexts/ApplicationsContext";
import { useColors } from "@/contexts/ColorContext";
import { useFellow } from "@/contexts/FellowContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { avatarOptions } from "@/lib/stylingData/avatarOptions";

import React from "react";
import Image from "next/image";
import EditMessageModal from "../../modals/messagingModals/editMessageModal";
import InfoBox from "../../informationDisplayComponents/infoBox";
import SiteButton from "../../buttonsAndLabels/siteButton";
import InputComponent from "../../inputComponents/inputComponent";

export interface Messages {
  id: number;
  text: Array<string>;
  sender: string;
  date: string;
  timestamp: string;
  edited: boolean;
}

const MessagingCenter = ({ activeApp }: any) => {
  const [messages, setMessages] = useState([] as Messages[]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isBeingEdited, setIsBeingEdited] = useState(null);

  const { accountType } = usePageContext();
  const { showModal, hideModal } = useModal();
  const { jobListings } = useJobListings();
  const { applications, setApplications } = useApplications();
  const { currentColorScheme } = useColors();
  const { fellow } = useFellow();

  const [editingMessage, setEditingMessage] = useState(null);
  const [selectedApp, setSelectedApp] = useState({});

  const { setCurrentColorScheme } = useColors();

  const currentAvatarChoice = avatarOptions.find((option: any) => {
    return option.title === fellow?.avatar;
  })?.colorScheme;

  const correspondingApp = applications?.find((app: any) => {
    return app.id === activeApp;
  });

  const correspondingListing = jobListings?.find((jl: any) => {
    return jl.jobId === correspondingApp?.jobId;
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (currentMessage.trim()) {
      // Split the message into paragraphs based on newlines
      const paragraphs = currentMessage
        .split("\n")
        .map((para) => para.trim())
        .filter((para) => para.length > 0);

      const message = {
        id: messages.length + 1,
        text: paragraphs,
        sender: "fellow",
        date: `${new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit" })}`,
        timestamp: `${new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
        edited: false,
      };

      setMessages([...messages, message]);
      setCurrentMessage("");
    }
  };

  // Declare groupedMessages in a broader scope
  let groupedMessages: { [key: string]: typeof messages } = {};

  // Group Messages Into Dates
  if (messages && messages.length > 0) {
    groupedMessages = messages.reduce(
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
  }

  // Sort Message Dates
  const sortedDates = Object.keys(groupedMessages).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  const updateMessage = (message: any, editId: any) => {
    setMessages((prevMessages) =>
      prevMessages.map(
        (msg) =>
          msg.id === editId
            ? { ...msg, text: message, edited: true } // Update the text and set edited to true
            : msg, // Keep the existing message
      ),
    );
    hideModal();
  };

  const editMessage = (id: any) => {
    const currentMessage = messages.find((message) => {
      return message.id === id;
    });
    setIsBeingEdited(id);
    showModal(
      <EditMessageModal
        paragraphs={currentMessage?.text || []}
        onCancel={() => {
          hideModal();
          setIsBeingEdited(null);
        }}
        onSave={updateMessage}
        editId={id}
      />,
    );
  };

  return (
    <div className="MessagingCenter -mb-4 -mt-4 flex min-h-[70vh] w-full max-w-[1600px] flex-col justify-between">
      <div className="Messages flex w-[100%] flex-col self-center align-top">
        <h2 className="text-right text-emerald">
          Your Conversation with {correspondingListing?.job?.businessName}
        </h2>
        <p className="Subtitle mb-6 mr-2 text-right font-medium lowercase italic text-jade">
          regarding the {correspondingListing?.job?.jobTitle} position
        </p>
        <div className="Messages">
          {sortedDates.map((date) => (
            <div key={date} className="flex w-[100%] flex-col gap-3">
              <div className="Divider mb-2 flex items-center">
                <div className="flex-grow border-t-2 border-dotted border-olive border-opacity-20"></div>
                <p className="mx-3 text-center text-sm text-olive">{date}</p>
                <div className="flex-grow border-t-2 border-dotted border-olive border-opacity-20"></div>
              </div>
              {groupedMessages[date].map((message, messageIndex) => {
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
                      aria={message.text[0]}
                      size="message"
                    >
                      <div
                        className={`Messages ${message.text.length > 1 ? "my-2" : ""} flex flex-col gap-2`}
                      >
                        {message.text.map((paragraph, paraIndex) => (
                          <p
                            key={`${messageIndex}-${paraIndex}`}
                            className={`MessageText px-1 pl-1 focus:outline-none ${paraIndex < message.text.length - 1 ? "mb-2" : ""} ${!isOwn ? "text-midnight" : ""} text-[.95rem]`}
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
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
      </div>

      <form
        onSubmit={handleSubmit}
        className="MessageInput mt-10 flex flex-col items-center justify-center gap-4 border-t-2 border-dotted border-olive border-opacity-25 p-4 align-baseline"
      >
        <textarea
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="min-h-[100px] w-full rounded-2xl border-2 border-jade bg-cream p-3 text-emerald drop-shadow-jade placeholder:text-jade placeholder:opacity-50 focus:outline-none"
          placeholder="Type your message here..."
        />
        <div className="SubmitButton self-end">
          <SiteButton
            type="submit"
            variant="filled"
            colorScheme="b1"
            aria="send"
            size="medium"
            addClasses="px-8 py-[.6rem] "
          >
            Send Message
          </SiteButton>
        </div>
      </form>
    </div>
  );
};

export default MessagingCenter;
