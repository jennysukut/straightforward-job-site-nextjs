"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";
import { useApplications } from "@/contexts/ApplicationsContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useJobListings } from "@/contexts/JobListingsContext";
import { RenderFellowMessageList } from "@/components/pages/messagingCenter/fellowMessagingComponents";
import { RenderBusinessMessageList } from "@/components/pages/messagingCenter/businessMessagingComponents";
import { useQuery } from "@apollo/client";
import { GET_JOB_LISTINGS } from "@/graphql/queries";
import { useBusiness } from "@/contexts/BusinessContext";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";

import MessageCenter from "@/components/pages/messagingCenter/messagingCenter";
import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
import Image from "next/image";
import LoginModal from "@/components/modals/loginModal";

type CurrentSchemeType = ButtonColorOption;

// TO-DO:
// Make a Display if their currentApps length is 0 and display some kind of error instead, telling them they don't currently have any messages
// Check to see if the account is a fellow or business, and display the info differently for each.
// Figure out if we want to have a "read" / "unopened" / "new" label on the mailList - we'd need to have a field in the mail details that updates that. I think this might be better to try after MVP.

// PAGE RUNDOWN: The Messages page's main job is to hold the activeApp State,
// activeApp is informed by the currentMessages, controlled from the Components: RenderBusinessMessageList and RenderFellowMessageList
// activeApp is then passed into the MessageCenter, which will display the active Messages related to the activeApp application.

export default function Messages() {
  const { accountType, isLoggedIn } = usePageContext();
  const { fellow } = useFellow();
  const { business } = useBusiness();
  const { applications } = useApplications();
  const [colorArray, setColorArray] = useState<CurrentSchemeType[]>([]);
  const [jobListings, setJobListings] = useState<[]>([]);
  const [activeApp, setActiveApp] = useState("");
  const [currentMessages, setCurrentMessages] = useState(Array<any>);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingListings, setLoadingListings] = useState(true);
  const router = useRouter();
  const { showModal } = useModal();

  // Find the current Applications and sort them via the date of their latest messages, so the most recent messages are displayed at the top

  const {
    loading: queryLoading,
    error: queryError,
    data: { jobListings: jobListingsArray = [] } = {},
  } = useQuery(GET_JOB_LISTINGS, {
    variables: { businessId: business?.id },
    skip: loadingData === false || accountType === "Fellow" || !isLoggedIn,
    onCompleted: (data) => {
      setJobListings(data.jobListings);
      setLoadingListings(false);
    },
  });

  const showMessages = (id: any) => {
    console.log(
      "using the showMessages function in the messages page. Here's the id we got passed:",
      id,
    );
    if (activeApp === id) {
      setActiveApp(currentMessages?.[0]?.id || "");
    } else {
      setLoadingData(true);
      setActiveApp(id);
    }
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
  }, []);

  useEffect(() => {
    if (currentMessages) {
      setActiveApp(currentMessages?.[0]?.id || "");
    }
  }, [currentMessages]);

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
    <div className="MessagePage">
      {isLoggedIn && (
        <div className="MessageCenter -mb-10 ml-4 flex w-[95%] justify-between justify-items-start gap-10 self-center text-jade md:pb-12">
          <div className="MailList flex min-h-[75vh] flex-col justify-between gap-4 border-r-2 border-olive border-opacity-25 pr-8">
            <div className="MessageListGroup flex flex-col gap-4">
              {/* message list for fellows */}
              {accountType === "Fellow" && (
                <RenderFellowMessageList
                  colorArray={colorArray}
                  activeApp={activeApp}
                  showMessages={showMessages}
                  setCurrentMessages={setCurrentMessages}
                />
              )}

              {/* message list for businesses */}
              {accountType === "Business" && (
                <RenderBusinessMessageList
                  colorArray={colorArray}
                  activeApp={activeApp}
                  showMessages={showMessages}
                  setCurrentMessages={setCurrentMessages}
                  currentListings={jobListings}
                  setActiveApp={setActiveApp}
                  setLoadingData={setLoadingData}
                />
              )}
            </div>
            <Image
              width={140}
              height={140}
              alt="decor"
              src="/lime-flower.svg"
              className={`${!activeApp ? "-mb-4 -ml-4" : "-mb-6 -ml-20"} self-baseline`}
            ></Image>
          </div>
          <div className="MessageCenter -mr-4 w-full pl-2 pr-10">
            <MessageCenter
              activeConvo={activeApp}
              messageHeight="max-h-[65vh] min-h-[55vh]"
              loadingData={loadingData}
              setLoadingData={setLoadingData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
