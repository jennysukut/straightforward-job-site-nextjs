import React, { useState } from "react";
import InfoBox from "../informationDisplayComponents/infoBox";
import SiteButton from "../buttonsAndLabels/siteButton";
import InputComponent from "../inputComponents/inputComponent";
import { usePageContext } from "@/contexts/PageContext";
import EditMessageModal from "../modals/messagingModals/editMessageModal";
import { useModal } from "@/contexts/ModalContext";
import { timeLog } from "console";
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
    },
    {
      id: 2,
      text: "I have a question about my account",
      sender: "fellow",
      date: "February 10",
      timestamp: "10:01 AM",
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
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

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

  // Sort the dates
  const sortedDates = Object.keys(groupedMessages).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  const editMessage = (id: any) => {
    setEditingMessage(id);
    const currentMessage = messages.find((message) => {
      return message.id === id;
    })?.text;
    showModal(<EditMessageModal message={currentMessage} />);
    console.log(id);

    setTimeout(() => {
      setEditingMessage(null);
    }, 3000);
  };

  console.log(accountType);

  return (
    <div className="MessagingCenter flex h-[100%] w-[80%] max-w-[1600px] flex-col justify-center">
      <h1 className="text-xl font-bold">Your Messages:</h1>

      <div className="Messages mt-8 flex w-[100%] flex-col self-center">
        {sortedDates.map((date) => (
          <div key={date} className="flex w-[100%] flex-col gap-3">
            <div className="Divider mb-2 flex items-center">
              <div className="flex-grow border-t-2 border-jade border-opacity-20"></div>
              <p className="mx-3 text-center text-sm">{date}</p>
              <div className="flex-grow border-t-2 border-jade border-opacity-20"></div>
            </div>
            {groupedMessages[date].map((message) => {
              return (
                <div
                  key={message.id}
                  className={`Message ${message.sender === "fellow" ? "self-end" : "self-start"} flex flex-col gap-4`}
                >
                  {accountType === "Fellow" && message.sender === "fellow" && (
                    <div className="EditButton -mb-8 -mr-6 -mt-4 self-end">
                      <SiteButton
                        size="extraSmallCircle"
                        variant="filled"
                        aria="edit"
                        colorScheme="b3"
                        addClasses="bg-center"
                        addImage="bg-[url('/settings-button.svg')]"
                        isSelected={editingMessage === message.id}
                        onClick={() => editMessage(message.id)}
                      />
                    </div>
                  )}
                  <InfoBox
                    colorScheme="b3"
                    variant={message.sender === "fellow" ? "filled" : "hollow"}
                    aria={message.text}
                    size="note"
                  >
                    <p
                      className={`MessageText ${message.text.length > 40 ? "py-2 pl-3 pr-2 indent-8" : "-py-1"} ${message.sender === "business" ? "text-midnight" : ""} text-sm`}
                    >
                      {message.text}
                    </p>
                  </InfoBox>
                  <p
                    className={`Timestamp ${message.sender === "fellow" ? "text-right text-olive" : "ml-2 text-left"} text-xs`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="MessageInput mt-10 flex justify-center gap-4 border-t-2 border-olive border-opacity-50 p-4"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Your message..."
          className="w-[90%] rounded-full border-2 border-jade bg-cream px-6 py-3 text-emerald drop-shadow-smJade placeholder:text-jade focus:outline-none"
        />
        <SiteButton
          type="submit"
          variant="filled"
          colorScheme="b1"
          aria="send"
          size="medium"
          addClasses="px-8 py-3"
        >
          send
        </SiteButton>
      </form>
    </div>
  );
};

export default MessageCenter;
