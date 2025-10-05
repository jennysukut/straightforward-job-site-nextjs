import React from "react";

const BouncingDotsLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className="h-4 w-4 animate-bounce rounded-full bg-jade drop-shadow-smPeach"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="h-4 w-4 animate-bounce rounded-full bg-watermelon drop-shadow-smLime"
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className="h-4 w-4 animate-bounce rounded-full bg-olive drop-shadow-smSky"
        style={{ animationDelay: "300ms" }}
      ></div>
      <div
        className="h-4 w-4 animate-bounce rounded-full bg-orange drop-shadow-smWatermelon"
        style={{ animationDelay: "450ms" }}
      ></div>
    </div>
  );
};

export default BouncingDotsLoader;
