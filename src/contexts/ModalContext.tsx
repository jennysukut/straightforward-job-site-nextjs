"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import ModalWrapper from "@/components/modals/modalWrapper";

interface ModalContextType {
  showModal: (content: ReactNode) => void;
  hideModal: () => void;
  goBack: () => void;
  isBackButtonVisible: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalStack, setModalStack] = useState<ReactNode[]>([]);

  const showModal = (content: ReactNode): void => {
    setModalStack((prev) => [...prev, content]);
  };

  const hideModal = (): void => {
    setModalStack([]);
  };

  const goBack = (): void => {
    setModalStack((prev) => prev.slice(0, -1));
  };

  const isBackButtonVisible = modalStack.length > 1;

  return (
    <ModalContext.Provider
      value={{ showModal, hideModal, goBack, isBackButtonVisible }}
    >
      {children}
      {modalStack.length > 0 && (
        <Dialog.Root open={true} onOpenChange={() => hideModal()}>
          <ModalWrapper modalKey={modalStack.length}>
            {modalStack[modalStack.length - 1]}
          </ModalWrapper>
        </Dialog.Root>
      )}
    </ModalContext.Provider>
  );
}
