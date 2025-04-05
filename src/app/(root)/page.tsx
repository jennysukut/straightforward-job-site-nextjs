"use client";

import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "@/graphql/queries";
import { useFellow } from "@/contexts/FellowContext";
import { useBusiness } from "@/contexts/BusinessContext";
import OtherHeaderSection from "./otherHeaderSection";

export default function Home() {
  const { setPageType, isLoggedIn, setIsLoggedIn, setAccountType } =
    usePageContext();
  const { setFellow } = useFellow();
  const { setBusiness } = useBusiness();
  const router = useRouter();

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_MY_PROFILE, {
    skip: isLoggedIn,
    onCompleted: (data) => {
      console.log("called the GET_MY_PROFILE query on the Home Screen", data);
      // setFellow({ ...data.fellow });
      // setIsLoggedIn(true);
      if (data.getMyProfile === null) {
        console.log("looks like you're not logged in");
        setIsLoggedIn(false);
      } else if (data.getMyProfile.roles.includes("FELLOW")) {
        setIsLoggedIn(true);
        setAccountType("Fellow");
        setFellow(data.getMyProfile.fellow);
        console.log("you're a fellow and you're logged in!");
      } else if (data.getMyProfile.roles.includes("BUSINESS")) {
        setIsLoggedIn(true);
        setAccountType("Business");
        setBusiness(data.getMyProfile.business);
        console.log("you're a business and you're logged in!");
      }
    },
  });

  useEffect(() => {
    setPageType("main");
  }, []);

  return (
    <div
      className="LandingPageContainer -mb-10 -mt-48 flex h-[140vh] w-[100vw] max-w-[1600px] flex-col items-center justify-center"
      style={{
        backgroundImage: 'url("/BackgroundShapes5.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* <button onClick={() => router.push(`/business-signup/step2`)}>
        go to signup page 3
      </button> */}
      <OtherHeaderSection />
    </div>
  );
}
