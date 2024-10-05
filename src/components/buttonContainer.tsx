import React, { ReactNode } from "react";
import { motion } from "framer-motion";

export default function ButtonContainer({
  children,
  addClasses,
}: {
  children: ReactNode;
  addClasses?: string;
}) {
  const motionContainer = {
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.6,
      },
    },
  };

  const motionItem = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        y: {
          type: "spring",
          duration: 0.8,
        },
        opacity: {
          duration: 0.5,
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <motion.div
      className={`ButtonContainer flex gap-6 pt-8 ${addClasses}`}
      initial="hidden"
      variants={motionContainer}
      viewport={{ once: true }}
      whileInView="show"
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={motionItem}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
