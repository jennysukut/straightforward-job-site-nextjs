"use client";

import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
  fillColor: string;
  width?: string;
  fillOpacity?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  fillColor,
  width,
  fillOpacity,
}) => {
  const percentage = Math.min(Math.max((current / total) * 99 + 1, 1), 100);

  return (
    <div
      className={`ProgressBar flex h-3 ${width} rounded-full border-2 border-jade bg-cream drop-shadow-smJade`}
    >
      <div
        className={`Progress rounded-l-full ${fillColor} ${fillOpacity}`}
        style={{
          width: `${percentage}%`,
          minWidth: "0.5rem",
          borderTopRightRadius: percentage > 95 ? "9999px" : "0",
          borderBottomRightRadius: percentage > 95 ? "9999px" : "0",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
