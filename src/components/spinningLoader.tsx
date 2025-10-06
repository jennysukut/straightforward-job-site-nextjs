import React from "react";

const DotSpinnerLoader: React.FC = () => {
  return (
    <div className="relative h-12 w-12">
      <style>{`
        @keyframes spin-dot {
          0% { transform: rotate(0deg) translateY(-8px); }
          100% { transform: rotate(360deg) translateY(-8px); }
        }
        .dot-spinner {
          animation: spin-dot 1s linear infinite;
        }
      `}</style>
      <div className="dot-spinner absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-orange"></div>
      <div
        className="dot-spinner absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-olive"
        style={{ animationDelay: "-0.75s" }}
      ></div>
      <div
        className="dot-spinner absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-watermelon"
        style={{ animationDelay: "-0.5s" }}
      ></div>
      <div
        className="dot-spinner absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-jade"
        style={{ animationDelay: "-0.25s" }}
      ></div>
    </div>
  );
};

export default DotSpinnerLoader;
