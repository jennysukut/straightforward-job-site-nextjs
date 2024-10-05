import React, { ReactNode } from "react";
import { motion } from "framer-motion";

export default function MotionContainer({
  children,
  addClasses,
  direction = "y",
}: {
  children: ReactNode;
  addClasses?: string;
  direction?: "x" | "y" | "-x" | "-y";
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
    hidden: { opacity: 0, [direction]: 50 },
    show: {
      opacity: 1,
      [direction]: 0,
      transition: {
        [direction]: {
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
      className={`MotionContainer flex gap-2 pt-8 sm:gap-6 ${addClasses}`}
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
