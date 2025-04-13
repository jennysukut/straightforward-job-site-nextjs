"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { string } from "zod";

export interface Messages {
  app: {
    id: string;
  };
  id: string;
  text: string;
  sender: string;
  date: any;
  timestamp: any;
  edited: boolean;
  viewed: boolean;
}

interface MessagesContextType {
  messages: Messages[] | null;
  setMessages: (messages: Messages[]) => void;
}

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined,
);

export const MessagesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Messages[] | null>([]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
};
