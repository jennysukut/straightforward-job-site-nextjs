"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@apollo/client";
import { usePageContext } from "@/contexts/PageContext";
import { GET_MY_PROFILE } from "@/graphql/queries";
import { useFellow } from "@/contexts/FellowContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { useApplications } from "@/contexts/ApplicationsContext";

export default function ClientAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    setPageType,
    isLoggedIn,
    setIsLoggedIn,
    setAccountType,
    setIsLoadingAccount,
    accountType,
    isLoggingOut,
  } = usePageContext();
  const { fellow, setFellow } = useFellow();
  const { setBusiness } = useBusiness();
  const { setApplications } = useApplications();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoadingAccount(false);
    }
  }, [isLoggedIn, setIsLoadingAccount]);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
    refetch: refetchProfile,
  } = useQuery(GET_MY_PROFILE, {
    skip: isLoggedIn || isLoggingOut,
    onCompleted: (data) => {
      console.log(
        "called the GET_MY_PROFILE query in the Client Auth Wrapper",
        data,
      );
      if (data.getMyProfile === null) {
        console.log("looks like you're not logged in");
        setIsLoggedIn(false);
      } else if (data.getMyProfile.roles.includes("FELLOW")) {
        setIsLoggedIn(true);
        setAccountType("Fellow");
        setFellow(data.getMyProfile.fellow);
        setApplications(data.getMyProfile.fellow.jobApplications);
        console.log("you're a fellow and you're logged in!");
      } else if (data.getMyProfile.roles.includes("BUSINESS")) {
        setIsLoggedIn(true);
        setAccountType("Business");
        setBusiness(data.getMyProfile.business);
        console.log("you're a business and you're logged in!");
      }
      setIsLoadingAccount(false);

      // could maybe just do a general setIsLoadingAccount(false) here?
    },
  });

  useEffect(() => {
    console.log("newApplication:", fellow?.newApplication);
    if (
      isLoggedIn &&
      accountType !== "Business" &&
      fellow?.newApplication === true
    ) {
      console.log("there's a new application - we should refetch their info");
      refetchProfile();
    }
  }, [fellow]);

  return <>{children}</>;
}
