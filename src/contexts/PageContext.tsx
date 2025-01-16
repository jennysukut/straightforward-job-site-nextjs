"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type PageContextType = {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  pageType: string;
  setPageType: (type: string) => void;
  accountType: string;
  setAccountType: (type: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (type: boolean) => void;
};

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // this is for setting particular pages for controlled states
  const [currentPage, setCurrentPage] = useState<string>("");

  // this is for setting categories of pages, like "Individual Signup"
  const [pageType, setPageType] = useState<string>("");

  // this is for setting account type - options are "Fellow" and "Business"
  const [accountType, setAccountType] = useState<string>("Fellow");

  // this is obvious - see if someone/a business is logged in
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return (
    <PageContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        pageType,
        setPageType,
        accountType,
        setAccountType,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return context;
};
