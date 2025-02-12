import React, { useState } from "react";
import InfoBox from "../informationDisplayComponents/infoBox";
import SiteButton from "../buttonsAndLabels/siteButton";
import InputComponent from "../inputComponents/inputComponent";
import { usePageContext } from "@/contexts/PageContext";
import EditMessageModal from "../modals/messagingModals/editMessageModal";
import { useModal } from "@/contexts/ModalContext";
import { timeLog } from "console";
import Image from "next/image";
const MessageCenter = () => {
  const { accountType } = usePageContext();
  const { showModal, hideModal } = useModal();

  const [editingMessage, setEditingMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: "business",
      date: "February 10",
      timestamp: "10:00 AM",
      edited: true,
    },
    {
      id: 2,
      text: "I have a question about my account",
      sender: "fellow",
      date: "February 10",
      timestamp: "10:01 AM",
      edited: false,
    },
  ]);

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

    setMessages([...messages, message]);
    setNewMessage("");
  };

  // Group Messages Into Dates
  const groupedMessages = messages.reduce(
    (acc: { [key: string]: typeof messages }, message) => {
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
    showModal(
      <EditMessageModal
        message={currentMessage}
        messages={messages}
        setMessages={setMessages}
      />,
    );
    setTimeout(() => {
      setEditingMessage(null);
    }, 2000);
  };

  return (
    <div className="MessagingCenter -mb-8 flex h-full w-full max-w-[1600px] flex-col justify-between">
      <div className="Messages mt-8 flex w-[100%] flex-col self-center align-top">
        <h1 className="text-xl font-bold">Your Messages:</h1>

        {sortedDates.map((date) => (
          <div key={date} className="flex w-[100%] flex-col gap-3">
            <div className="Divider mb-2 flex items-center">
              <div className="flex-grow border-t-2 border-olive border-opacity-20"></div>
              <p className="mx-3 text-center text-sm text-olive">{date}</p>
              <div className="flex-grow border-t-2 border-olive border-opacity-20"></div>
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
                    colorScheme="b3"
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
        className="MessageInput mt-10 flex items-center justify-center gap-4 border-t-2 border-olive border-opacity-30 p-4 align-baseline"
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
