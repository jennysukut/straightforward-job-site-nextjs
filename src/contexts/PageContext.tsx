"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type PageContextType = {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  pageType: string;
  setPageType: (type: string) => void;
  accountType: string;
  setAccountType: (type: string) => void;
};

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState<string>("");
  const [pageType, setPageType] = useState<string>("Fellow");
  const [accountType, setAccountType] = useState<string>("Fellow");

  return (
    <PageContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        pageType,
        setPageType,
        accountType,
        setAccountType,
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
