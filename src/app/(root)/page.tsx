"use client";

import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "@/graphql/queries";
import { useFellow } from "@/contexts/FellowContext";
import { useBusiness } from "@/contexts/BusinessContext";
import OtherHeaderSection from "./otherHeaderSection";
import { removeCookie } from "@/components/buttonsAndLabels/logoutButton";

export default function Home() {
  const {
    setPageType,
    isLoggedIn,
    setIsLoggedIn,
    setAccountType,
    setIsLoadingAccount,
    isLoggingOut,
  } = usePageContext();
  const { setFellow } = useFellow();
  const { setBusiness } = useBusiness();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoadingAccount(false);
    }
  }, []);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_MY_PROFILE, {
    skip: isLoggedIn || isLoggingOut,
    onCompleted: (data) => {
      console.log("called the GET_MY_PROFILE query on the Home Screen", data);
      if (data.getMyProfile === null) {
        console.log("looks like you're not logged in");
        setIsLoggedIn(false);
        setIsLoadingAccount(false);
      } else if (data.getMyProfile.roles.includes("FELLOW")) {
        setIsLoggedIn(true);
        setAccountType("Fellow");
        setFellow(data.getMyProfile.fellow);
        setIsLoadingAccount(false);
        console.log("you're a fellow and you're logged in!");
      } else if (data.getMyProfile.roles.includes("BUSINESS")) {
        setIsLoggedIn(true);
        setAccountType("Business");
        setBusiness(data.getMyProfile.business);
        setIsLoadingAccount(false);
        console.log("you're a business and you're logged in!");
      }
      // could maybe just do a general setIsLoadingAccount(false) here?
    },
  });

  const logout = () => {
    console.log("trying to log out from the home page");
    removeCookie("accessToken");
    // THIS WORKS!!!!
    setIsLoggedIn(false);
    setAccountType("");
  };

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
      <button className="mb-10" onClick={logout}>
        Other Logout
      </button>

      <OtherHeaderSection />
    </div>
  );
}
