import { useState, useEffect, useCallback } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useModal } from "@/contexts/ModalContext";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useApplications } from "@/contexts/ApplicationsContext";
import { useColors } from "@/contexts/ColorContext";
import { useFellow } from "@/contexts/FellowContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { avatarOptions } from "@/lib/stylingData/avatarOptions";
import { useFellows } from "@/contexts/FellowsContext";

import React from "react";
import Image from "next/image";
import EditMessageModal from "../../modals/messagingModals/editMessageModal";
import InfoBox from "../../informationDisplayComponents/infoBox";
import SiteButton from "../../buttonsAndLabels/siteButton";
import { useRouter } from "next/navigation";

export interface Messages {
  id: number;
  text: Array<string>;
  sender: string;
  date: string;
  timestamp: string;
  edited: boolean;
  read: boolean;
}

// We need to make the message center display something about initial contact is the message array doesn't have anything in it.

const MessageCenter = ({
  activeApp,
  addClasses,
  messageHeight,
  specificMessages,
}: any): JSX.Element => {
  const { accountType } = usePageContext();
  const { showModal, hideModal } = useModal();
  const { jobListings } = useJobListings();
  const { applications, setApplications } = useApplications();
  const { currentColorScheme, setCurrentColorScheme } = useColors();
  const { fellow } = useFellow();
  const { fellows } = useFellows();

  const router = useRouter();

  const [buttonClicked, setButtonClicked] = useState("");
  const [messages, setMessages] = useState([] as Messages[]);
  const [selectedApp, setSelectedApp] = useState({});
  // const [editingMessage, setEditingMessage] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isBeingEdited, setIsBeingEdited] = useState(null);

  const currentAvatarChoice = avatarOptions.find((option: any) => {
    return option.title === fellow?.avatar;
  })?.colorScheme;

  const correspondingApp = applications?.find((app: any) => {
    return app.id === activeApp;
  });

  const correspondingListing = jobListings?.find((jl: any) => {
    return jl.jobId === correspondingApp?.jobId;
  });

  const scrollToBottom = () => {
    const messageContainer = document.getElementById("Messages");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  };

  const renderMessages = useCallback(() => {
    if (activeApp) {
      const selectedApp: any = applications?.find((app: any) => {
        return app.id === activeApp;
      });
      setSelectedApp(selectedApp);
      setMessages(selectedApp.mail);
    } else {
      // do I need to have an else statement?
    }
  }, [activeApp, applications]);

  // Send A Message!
  const handleSendMessage = (e: any) => {
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
        read: false,
      };

      const index: number =
        applications?.findIndex(
          (app: any) => app.id === correspondingApp?.id,
        ) ?? -1;
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
              read: boolean;
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
        setMessages([...messages, message]);
      }

      setCurrentMessage("");
      renderMessages();
    }
  };

  // Group Messages Together
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

  // Sort Messages By Dates
  const sortedDates = Object.keys(groupedMessages).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  // Edit Message Function
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

  const updateMessage = (message: any, editId: any) => {
    console.log("updated text:", message);

    // Update the messages state by mapping through the existing messages
    setMessages((prevMessages) =>
      prevMessages.map(
        (msg) =>
          msg.id === editId
            ? { ...msg, text: message } // Update the text array for the matching message
            : msg, // Keep the existing message
      ),
    );

    // update the message using a server call to update the messages, then rerender
    renderMessages();
    scrollToBottom();
    hideModal();
  };

  const findApplicantName: any = (id: any) => {
    const applicant = fellows?.find((fellow) => fellow.id === id);
    return applicant ? applicant.name : "Unknown";
  };

  const viewRelevantProfile = () => {
    setButtonClicked("viewRelevantProfile");
    if (accountType === "Fellow") {
      console.log(
        "need to go to the profile for: ",
        correspondingApp?.businessId,
      );
      router.push(`/profile/${correspondingApp?.businessId}`);
    } else if (accountType === "Business") {
      router.push(`/application/${correspondingApp?.id}`);
      // router.push(`/profile/${correspondingApp?.applicant}`);
    }
  };

  const fileReport = () => {
    setButtonClicked("fileReport");
    console.log("need to file a report");
  };

  const viewListing = () => {
    setButtonClicked("viewListing");
    if (accountType === "Fellow") {
      router.push(`/listing/${correspondingApp?.id}`);
    } else if (accountType === "Business") {
      router.push(`/ams/${correspondingApp?.jobId}`);
    }
  };

  useEffect(() => {
    renderMessages();
    if (currentMessage === "") {
      scrollToBottom();
    }
  }, [currentMessage, activeApp, groupedMessages]);

  useEffect(() => {
    setCurrentColorScheme(currentAvatarChoice || "b2");
  }, [currentAvatarChoice, setCurrentColorScheme]);

  const readMesssages = () => {
    const updatedMessages = messages.map((message) => {
      const isOwn =
        (message.sender === "fellow" && accountType === "Fellow") ||
        (message.sender === "business" && accountType === "Business");
      if (!isOwn) {
        return { ...message, read: true }; // Mark as read if it's not the user's message
      }
      return message; // Keep the existing message
    });
    console.log(updatedMessages);
    // setMessages(updatedMessages);
  };

  // useEffect to mark messages from other person as "read" - we should do this directly with the server
  useEffect(() => {
    // make sure this gets updated each time the specific messages get changed.
    readMesssages();
  }, []);

  return (
    <div
      className={`MessagingCenter ${addClasses} -mb-4 -mt-4 flex min-h-[70vh] w-full max-w-[1600px] flex-col justify-between self-center`}
      id="messagingCenter"
    >
      <div className="Messages flex w-[100%] flex-col self-center align-top">
        <div
          className={`TitleArea flex ${specificMessages ? "justify-between" : "self-end"} align-middle`}
        >
          {specificMessages && (
            <SiteButton
              variant="hollow"
              aria="go to mail"
              colorScheme="b4"
              addClasses="mt-4"
              onClick={() => router.push(`/messages`)}
            >
              go to mailbox
            </SiteButton>
          )}
          <div className="Title flex flex-col">
            <h2 className="text-right text-emerald">
              Your Conversation with{" "}
              {accountType === "Fellow"
                ? correspondingListing?.job?.businessName
                : findApplicantName(correspondingApp?.applicant)}
            </h2>
            <p className="Subtitle mb-6 mr-2 text-right font-medium lowercase italic text-jade">
              regarding the {correspondingListing?.job?.jobTitle} position
            </p>
          </div>
        </div>

        {/* Messages */}
        <div
          className={`Messages -mr-6 ${messageHeight} overflow-y-auto pr-6`}
          id="Messages"
        >
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
                      className={`TimestampGroup flex gap-2 ${isOwn ? "self-end" : "self-start"} items-center`}
                    >
                      {isOwn && message.edited && (
                        <p className="EditedNotification text-xs text-olive opacity-50">
                          edited |
                        </p>
                      )}
                      {isOwn && message.read === true && (
                        <div className="ReadDetails flex gap-1">
                          <Image
                            src="/message-read.svg"
                            alt="read"
                            width={16}
                            height={13}
                            className="mr-1 mt-[0.1rem] w-auto opacity-80"
                          />
                          <p className="ReadNotification text-xs text-olive opacity-50">
                            |{" "}
                          </p>
                        </div>
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
                      {!isOwn && message.read === true && (
                        <div className="ReadDetails flex gap-1">
                          <p className="ReadNotification text-xs text-jade opacity-50">
                            |{" "}
                          </p>
                          <Image
                            src="/message-read-other.svg"
                            alt="read"
                            width={16}
                            height={13}
                            className="ml-1 mt-[0.1rem] w-auto opacity-80"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="InputAndButtons">
        {/* Message Input */}
        <form
          onSubmit={handleSendMessage}
          className="MessageInput mt-10 flex items-center justify-center gap-4 border-t-2 border-dotted border-olive border-opacity-25 p-4 align-baseline"
          id="MessageInput"
        >
          <textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Your message..."
            className="min-h-[100px] w-full rounded-2xl border-2 border-jade bg-cream p-3 pl-3 text-emerald drop-shadow-jade placeholder:text-jade placeholder:opacity-50 focus:outline-none"
          />
          <SiteButton
            type="submit"
            variant="filled"
            colorScheme="c5"
            aria="send"
            size="medium"
            addClasses="px-8 py-[.6rem]"
          >
            send
          </SiteButton>
        </form>

        {/* Button Options After Messages */}
        <div
          className={`ButtonOptions mt-6 flex w-[100%] ${specificMessages ? "" : "mb-8"} justify-between self-end border-t-2 border-dotted border-olive border-opacity-25 pt-3`}
        >
          <div
            className={`ButtonGroup ${!specificMessages ? "items-end justify-end self-end" : "justify-start"} flex w-[100%] gap-4`}
          >
            <SiteButton
              aria="report"
              variant="filled"
              colorScheme="e3"
              onClick={fileReport}
              isSelected={buttonClicked === "fileReport"}
            >
              report
            </SiteButton>
            <SiteButton
              aria="view profile"
              variant="filled"
              colorScheme="a5"
              onClick={viewRelevantProfile}
              isSelected={buttonClicked === "viewRelevantProfile"}
            >
              {accountType === "Business"
                ? "view application"
                : "view business profile"}
            </SiteButton>
            <SiteButton
              aria="view listing"
              variant="filled"
              colorScheme="c1"
              onClick={viewListing}
              isSelected={buttonClicked === "viewListing"}
            >
              {accountType === "Business"
                ? "manage applications"
                : "go to listing"}
            </SiteButton>
            <SiteButton aria="report" variant="filled" colorScheme="b3">
              set an appointment?
            </SiteButton>
          </div>

          {specificMessages && (
            <SiteButton
              aria="mail"
              variant="filled"
              colorScheme="b6"
              onClick={() => router.push(`/messages`)}
            >
              mailbox
            </SiteButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;
