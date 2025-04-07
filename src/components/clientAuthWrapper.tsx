"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@apollo/client";
import { usePageContext } from "@/contexts/PageContext";
import { GET_MY_PROFILE } from "@/graphql/queries";
import { useFellow } from "@/contexts/FellowContext";
import { useBusiness } from "@/contexts/BusinessContext";

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
      console.log(
        "called the GET_MY_PROFILE query in the Client Auth Wrapper",
        data,
      );
      if (data.getMyProfile === null) {
        console.log("looks like you're not logged in");
        setIsLoggedIn(false);
        // setIsLoadingAccount(false);
      } else if (data.getMyProfile.roles.includes("FELLOW")) {
        setIsLoggedIn(true);
        setAccountType("Fellow");
        setFellow(data.getMyProfile.fellow);
        // setIsLoadingAccount(false);
        console.log("you're a fellow and you're logged in!");
      } else if (data.getMyProfile.roles.includes("BUSINESS")) {
        setIsLoggedIn(true);
        setAccountType("Business");
        setBusiness(data.getMyProfile.business);
        // setIsLoadingAccount(false);
        console.log("you're a business and you're logged in!");
      }
      setIsLoadingAccount(false);

      // could maybe just do a general setIsLoadingAccount(false) here?
    },
  });

  return <>{children}</>;
}
