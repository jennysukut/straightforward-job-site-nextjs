import * as Dialog from "@radix-ui/react-dialog";

import React from "react";
import Image from "next/image";

import { useModal } from "@/contexts/ModalContext";
import { motion, AnimatePresence } from "framer-motion";
import { LargeShadowColorOption } from "@/lib/stylingData/largeShadowColors";

interface ModalWrapperProps {
  children: React.ReactNode;
  modalKey: number;
  colorScheme?: LargeShadowColorOption;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, modalKey }) => {
  const { hideModal, goBack, isBackButtonVisible } = useModal();

  const handleModalContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <>
      <Dialog.Overlay asChild>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-10 bg-cream/30 backdrop-blur-lg"
        />
      </Dialog.Overlay>
      {/* aria-describedby={undefined} is used to prevent the modal from being announced as a dialog */}
      <Dialog.Content
        asChild
        aria-describedby={undefined}
        className="max-w-[95vw]"
      >
        <motion.div
          className="ModalOuterContainer fixed inset-0 z-20 flex items-center justify-center"
          onClick={hideModal}
        >
          <AnimatePresence>
            <motion.div
              className="ModalInnerContents absolute -mr-2 -mt-10 flex max-h-[90%] max-w-[90%] flex-col items-center rounded-[50px] border-[3px] border-solid border-jade bg-cream px-10 pb-12 pt-14 text-jade drop-shadow-jade sm:-mr-0 sm:px-14"
              onClick={handleModalContentClick}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              key={modalKey}
            >
              {isBackButtonVisible && (
                <Image
                  src="/back-arrow.svg"
                  alt="back"
                  width={28}
                  height={28}
                  className="absolute left-6 top-6 opacity-80 hover:cursor-pointer hover:opacity-100 sm:left-8 sm:top-8"
                  onClick={goBack}
                />
              )}
              <Dialog.Close asChild>
                <button
                  className="absolute right-6 top-6 text-gray-400 opacity-70 hover:text-gray-600 hover:opacity-100 sm:right-8 sm:top-8"
                  aria-label="Close"
                  onClick={hideModal}
                >
                  <Image
                    src="/modal-close-button.svg"
                    alt="close"
                    width={24}
                    height={24}
                  />
                </button>
              </Dialog.Close>
              {children}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Dialog.Content>
    </>
  );
};

export default ModalWrapper;
