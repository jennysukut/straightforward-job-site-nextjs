import { useState, useEffect, useCallback } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useModal } from "@/contexts/ModalContext";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useApplications } from "@/contexts/ApplicationsContext";
import { useColors } from "@/contexts/ColorContext";
import { useFellow } from "@/contexts/FellowContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { avatarOptions } from "@/lib/stylingData/avatarOptions";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/contexts/BusinessContext";
import { rejectionOptions } from "@/lib/rejectionOptions";
import { useQuery, useSubscription, gql } from "@apollo/client";
import {
  GET_CONVERSATION_BY_ID,
  MESSAGE_SUBSCRIPTION,
} from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "@/graphql/mutations";

import ReportModal from "@/components/modals/reportingModals/reportingModal";
import React from "react";
import Image from "next/image";
import EditMessageModal from "../../modals/messagingModals/editMessageModal";
import InfoBox from "../../informationDisplayComponents/infoBox";
import SiteButton from "../../buttonsAndLabels/siteButton";

export interface Messages {
  id: number;
  deliveredAt: any;
  seenAt: any;
  text: Array<string>;
  fromBusiness: Boolean;
  formattedTime: any;
  // sender: string;
  // date: string;
  // timestamp: string;
  // edited: boolean;
  // read: boolean;
}

// We need to make the message center display something about initial contact is the message array doesn't have anything in it.

//TODO: Find the most recent messages, and open the jobListing category with that set of messages
// {they're already being displayed in the messageCenter} and show which app is open via highlight - this might already be active?

type RejectionOptionKey = keyof typeof rejectionOptions;

const MessageCenter = ({
  activeConvo,
  addClasses,
  messageHeight,
  specificMessages,
}: any): JSX.Element => {
  const { accountType, isLoggedIn } = usePageContext();
  const { showModal, hideModal } = useModal();
  const { jobListings } = useJobListings();
  const { applications, setApplications } = useApplications();
  const { currentColorScheme, setCurrentColorScheme } = useColors();
  const { fellow } = useFellow();
  const { business } = useBusiness();

  const router = useRouter();

  const [buttonClicked, setButtonClicked] = useState("");
  const [messages, setMessages] = useState([] as Messages[]);
  const [selectedApp, setSelectedApp] = useState({});
  // const [editingMessage, setEditingMessage] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isBeingEdited, setIsBeingEdited] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [sendMessage, { loading, error }] = useMutation(SEND_MESSAGE);
  const [paragraphs, setParagraphs] = useState([""]);
  const [fellowName, setFellowName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [relevantPosition, setRelevantPosition] = useState("");

  //Testing Connecting to Messaging Subscription/Webhook

  // const {
  //   data: subscriptionData,
  //   loading: subscriptionLoading,
  //   error: subscriptionError,
  // } = useSubscription(MESSAGE_SUBSCRIPTION, {
  //   variables: { conversationId: activeConvo },
  // });

  // console.log(
  //   "subscriptionData:",
  //   subscriptionData,
  //   "activeConvo:",
  //   activeConvo,
  // );

  // useEffect(() => {
  //   if (subscriptionData) {
  //     console.log("full subscription data:", subscriptionData);
  //     console.log("upstreamPublisher:", subscriptionData.upstreamPublisher);

  //     // Try to find the actual message data
  //     if (subscriptionData.upstreamPublisher) {
  //       console.log(
  //         "upstreamPublisher keys:",
  //         Object.keys(subscriptionData.upstreamPublisher),
  //       );
  //     }
  //   }
  // }, [subscriptionData]);

  const {
    data: subscriptionData,
    loading: subscriptionLoading,
    error: subscriptionError,
  } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { conversationId: "22" },
    onData: ({ data }) => {
      console.log("New message received:", data);
      // This will log the actual message when one comes in
    },
  });

  // Or check what's in data
  useEffect(() => {
    console.log("Subscription data:", subscriptionData);
  }, [subscriptionData]);
  ////end of messaging test

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(GET_CONVERSATION_BY_ID, {
    variables: { id: activeConvo },
    skip: !isLoggedIn,
    onCompleted: (data) => {
      console.log("using the GET_CONVERSATION_BY_ID query:", data);
      // Filter messages to only include those with non-null text
      const filteredMessages = data.getConversation.messages
        .filter((message: Messages) => message.text !== null)
        .map((message: Messages) => ({
          ...message,
          text: message.text.flatMap((text: string) => text.split("\n")), // Split by double newlines for paragraphs
        }));
      setMessages(filteredMessages);
      setLoadingData(false);
      setFellowName(data.getConversation.jobApplication.fellow.name);
      setBusinessName(
        data.getConversation.jobApplication.jobListing.business.name,
      );
      setRelevantPosition(
        data.getConversation.jobApplication.jobListing.jobTitle,
      );
    },
  });

  const currentAvatarChoice = avatarOptions.find((option: any) => {
    if (accountType === "Fellow") {
      return option.title === fellow?.profile?.avatar;
    } else if (accountType === "Business") {
      return option.title === business?.businessProfile?.avatar;
    }
  })?.colorScheme;

  // You can grab the correspondingApp and corresponding listing data from the GET_CONVO_BY_ID
  // const correspondingApp = applications?.find((app: any) => {
  //   return app.id === activeConvo;
  // });
  const correspondingListing = "1";
  // jobListings?.find((jl: any) => {
  //   return jl.jobId === correspondingApp?.jobId;
  // });

  const scrollToBottom = () => {
    const messageContainer = document.getElementById("Messages");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  };

  // const renderMessages = useCallback(() => {
  //   // if (activeConvo) {
  //   //   const selectedApp: any = applications?.find((app: any) => {
  //   //     return app.id === activeConvo;
  //   //   });
  //   //   setSelectedApp(selectedApp);
  //     setMessages(selectedApp.mail);
  //   // } else {
  //     // do I need to have an else statement?
  //     //what if there isn't an active app?
  //   // }
  // }, [activeConvo, applications]);

  // Send A Message!
  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    console.log("trying to send message");
    setButtonClicked("send");

    if (currentMessage.trim()) {
      // Split the message into paragraphs based on newlines
      const currentParagraphs = currentMessage
        .split("\n")
        .map((para) => para.trim())
        .filter((para) => para.length > 0);
    }

    try {
      const response = await sendMessage({
        variables: {
          conversationId: activeConvo,
          text: currentMessage,
        },
      });
      console.log(
        "Message sent successfully, Details:",
        response.data.sendMessage,
      );
      setMessages([...messages, response.data.sendMessage]);
      setCurrentMessage("");
      setButtonClicked("");
    } catch (error) {
      console.error("Message Sending error:", error);
      setButtonClicked("");
      // Optionally, you can set an error state here to display to the user
    }
  };

  // Group Messages Together
  let groupedMessages: { [key: string]: typeof messages } = {};

  // Group Messages Into Dates - get the time here??
  // ADD A FIELD TO THE GROUPED MESSAGES THAT'LL HOLD THE TIME AS WELL AS THE DATE.
  // if (messages && messages.length > 0) {
  //   groupedMessages = messages.reduce(
  //     (acc: { [key: string]: typeof messages }, message: any) => {
  //       const date = new Date(message.createdAt).toISOString().split("T")[0]; // Get only the date part
  //       // GOT THE TIME HERE
  //       const time = new Date(message.createdAt).toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       });
  //       console.log("time:", time);
  //       if (!acc[date]) {
  //         acc[date] = [];
  //       }
  //       acc[date].push(message);
  //       return acc;
  //     },
  //     {},
  //   );
  // }

  if (messages && messages.length > 0) {
    groupedMessages = messages.reduce(
      (acc: { [key: string]: any[] }, message: any) => {
        const dt = new Date(message.createdAt);
        const date = dt.toISOString().split("T")[0]; // YYYY-MM-DD (UTC)
        const time = dt.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }); // local HH:MM

        if (!acc[date]) acc[date] = [];
        acc[date].push({ ...message, formattedTime: time });
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
    // renderMessages();
    scrollToBottom();
    hideModal();
  };

  // const viewRelevantProfile = () => {
  //   setButtonClicked("viewRelevantProfile");
  //   if (accountType === "Fellow") {
  //     console.log(
  //       "need to go to the profile for: ",
  //       correspondingApp?.businessId,
  //     );
  //     router.push(`/profile/${correspondingApp?.businessId}`);
  //   } else if (accountType === "Business") {
  //     router.push(`/application/${correspondingApp?.id}`);
  //     // router.push(`/profile/${correspondingApp?.applicant}`);
  //   }
  // };

  const expandClick = () => {
    setButtonClicked("expandClick");
    // router.push(`/messages/${correspondingApp?.id}`);
  };

  // const fileReport = () => {
  //   if (accountType === "Business") {
  //     const reportee = correspondingApp?.applicant;
  //     showModal(
  //       <ReportModal
  //         id={reportee}
  //         nameForReport={findApplicantName(correspondingApp?.applicant)}
  //       />,
  //     );
  //   } else if (accountType === "Fellow") {
  //     const reportee = correspondingListing?.job?.businessId;
  //     showModal(
  //       <ReportModal
  //         id={reportee}
  //         nameForReport={correspondingListing?.job?.businessName}
  //       />,
  //     );
  //   }
  //   setButtonClicked("fileReport");
  //   console.log("need to file a report");
  // };

  // const viewListing = () => {
  //   setButtonClicked("viewListing");
  //   if (accountType === "Fellow") {
  //     router.push(`/listing/${correspondingApp?.id}`);
  //   } else if (accountType === "Business") {
  //     router.push(`/ams/${correspondingApp?.jobId}`);
  //   }
  // };

  // const readMesssages = () => {
  //   const updatedMessages = messages.map((message) => {
  //     const isOwn =
  //       (!message.fromBusiness && accountType === "Fellow") ||
  //       (message.fromBusiness && accountType === "Business");
  //     if (!isOwn) {
  //       return { ...message, read: true }; // Mark as read if it's not the user's message
  //     }
  //     return message; // Keep the existing message
  //   });
  //   console.log(updatedMessages);
  //   // setMessages(updatedMessages);
  // };

  // useEffect(() => {
  //   renderMessages();
  //   if (currentMessage === "" && messages.length !== 0) {
  //     scrollToBottom();
  //   }
  // }, [currentMessage, activeConvo, groupedMessages]);

  useEffect(() => {
    setCurrentColorScheme(currentAvatarChoice || "b2");
  }, [currentAvatarChoice, setCurrentColorScheme]);

  // useEffect to mark messages from other person as "read" - we should do this directly with the server
  // useEffect(() => {
  //   readMesssages();
  // }, []);

  // useEffect(() => {
  //   if (correspondingApp?.appIsBeingRejected) {
  //     setCurrentMessage(correspondingApp.rejectionDetails?.message.join("\n"));
  //     // } else if (correspondingApp?.jobOfferBeingSent) {
  //     //   setCurrentMessage("Hey You! We'd like to offer you a job!");
  //   }
  // }, []);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const makeDateReadable = (date: any) => {
    const currentDate = new Date(date);

    // Extract the month, day, and year
    const month = monthNames[currentDate.getUTCMonth()]; // Get the full month name
    const day = currentDate.getUTCDate();
    const year = currentDate.getUTCFullYear();
    // .toString().slice(-2); // Get last two digits of the year

    // Format the date as "M.D.YY"
    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
  };

  // pass in something other than the date?? // the date is limited before it gets here
  // const getMessageTime = (date: any) => {
  //   const currentDate = new Date(date);

  //   const hours = currentDate.getUTCHours();
  //   const minutes = currentDate.getUTCMinutes();
  //   const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  //   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero if needed
  //   const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
  //   return `${formattedHours}:${formattedMinutes} ${ampm}`; // Format as "HH:MM AM/PM"
  // };

  return (
    <div className="MessagingCenterPage h-full w-full">
      {loadingData ? (
        <p className="LoadingData">loading...</p>
      ) : (
        <div
          className={`MessagingCenter ${addClasses} -mb-4 -mt-4 flex min-h-[70vh] w-full max-w-[1600px] flex-col justify-between self-center`}
          id="messagingCenter"
        >
          <div className="Messages flex w-[100%] flex-col self-center align-top">
            <div className={`TitleArea flex justify-between align-middle`}>
              {!specificMessages && activeConvo && (
                <div className="ExpandOption flex gap-2 self-start align-middle">
                  <SiteButton
                    aria="expandButton"
                    size="smallCircle"
                    variant="filled"
                    colorScheme={
                      (currentColorScheme as ButtonColorOption) || "b3"
                    }
                    addImage="bg-[url('/expand-icon.svg')] bg-center bg-no-repeat"
                    addClasses={`mt-2 -ml-6`}
                    onClick={expandClick}
                    isSelected={buttonClicked === "expandClick"}
                  />
                </div>
              )}
              {specificMessages && (
                <SiteButton
                  variant="hollow"
                  aria="go to mail"
                  colorScheme="b4"
                  addClasses="mt-4 mb-3"
                  onClick={() => router.push(`/messages`)}
                >
                  go to mailbox
                </SiteButton>
              )}
              {(activeConvo || specificMessages) && (
                <div className="Title flex flex-col">
                  <h2 className="text-right text-emerald">
                    Your Conversation with{" "}
                    {accountType === "Fellow" ? businessName : fellowName}
                  </h2>
                  <p className="Subtitle mb-6 mr-2 text-right font-medium lowercase italic text-jade">
                    regarding the {relevantPosition} position
                  </p>
                </div>
              )}
            </div>

            {/* Messages */}
            <div
              className={`Messages -mr-6 ${messageHeight} ${!activeConvo ? "flex flex-col justify-center" : ""}overflow-y-auto pr-6`}
              id="Messages"
            >
              {!activeConvo && (
                <div className="NoMessagesBox flex h-[60vh] flex-col justify-center self-center text-center">
                  <p className="NoMessagesText text-center italic text-olive">
                    There are no messages yet.
                  </p>
                </div>
              )}

              {activeConvo && messages.length < 1 && (
                <div className="NoMessagesBox flex min-h-[30vh] flex-col justify-center self-center text-center">
                  <p className="NoMessagesText text-center italic text-olive">
                    There are no messages with{" "}
                    {accountType === "Fellow" ? businessName : fellowName} yet.
                  </p>
                </div>
              )}

              {sortedDates.map((date) => (
                <div key={date} className="flex w-[100%] flex-col gap-3">
                  <div className="Divider mb-1 mt-4 flex items-center">
                    <div className="flex-grow border-t-2 border-dotted border-olive border-opacity-20"></div>
                    <p className="mx-3 text-center text-sm text-olive">
                      {/* TODO: turn this date to something easier to read */}
                      {/* {date} */}
                      {makeDateReadable(date)}
                    </p>
                    <div className="flex-grow border-t-2 border-dotted border-olive border-opacity-20"></div>
                  </div>
                  {groupedMessages[date].map((message, messageIndex) => {
                    const isOwn =
                      (!message.fromBusiness && accountType === "Fellow") ||
                      (message.fromBusiness && accountType === "Business");
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
                          aria={"testing" + messageIndex}
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
                          {/* {isOwn && message.edited && (
                            <p className="EditedNotification text-xs text-olive opacity-50">
                              edited |
                            </p>
                          )} */}

                          {/* {isOwn && message.read === true && (
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
                      )} */}
                          <p
                            className={`Timestamp ${isOwn ? "text-right text-olive" : "ml-2 text-left"} text-xs`}
                          >
                            {message?.formattedTime}
                            {/* {getMessageTime(date)} */}
                            {/* {message.timestamp} */}
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
                          {/* {!isOwn && message.edited && (
                        <p className="EditedNotification text-xs text-jade opacity-50">
                          | edited
                        </p>
                      )} */}
                          {/* {!isOwn && message.read === true && (
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
                      )} */}
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
              <InfoBox
                variant="hollow"
                size="note"
                aria="messageInput"
                width="full"
              >
                <textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Your message..."
                  className="min-h-[50px] w-full bg-transparent pr-2 leading-6 text-emerald placeholder:text-jade placeholder:text-opacity-50 focus:outline-none"
                />
              </InfoBox>

              <SiteButton
                type="submit"
                variant="filled"
                colorScheme="c5"
                aria="send"
                size="medium"
                addClasses="px-8 py-[.6rem]"
                isSelected={buttonClicked === "send"}
              >
                {buttonClicked === "send" ? "sending..." : "send"}
                {/* send */}
              </SiteButton>
            </form>

            {/* Button Options After Messages */}
            <div
              className={`ButtonOptions mt-6 flex w-[100%] ${specificMessages ? "" : "mb-8"} justify-between self-end border-t-2 border-dotted border-olive border-opacity-25 pt-3`}
            >
              {/* <div
            className={`ButtonGroup ${!specificMessages ? "justify-end" : "justify-start"} flex w-[100%] gap-4`}
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
              {accountType === "Business"
                ? "set an appointment"
                : "view appointments"}
            </SiteButton>
          </div> */}

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
      )}
    </div>
  );
};

export default MessageCenter;
