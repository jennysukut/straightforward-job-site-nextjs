"use client";

import { useState } from "react";
import SiteLabel from "./siteLabel";

interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  addClasses?: string;
  message?: string;
}

const Notification: React.FC<NotificationProps> = ({
  addClasses,
  message,
  ...props
}) => {
  const [onHover, setOnHover] = useState(false);

  const hoverIn = () => {
    setTimeout(() => {
      setOnHover(true);
    }, 300);
  };

  const hoverOut = () => {
    setOnHover(false);
  };

  return (
    <div className="NotificationContainer flex flex-col">
      <SiteLabel
        variant="notification"
        colorScheme="f1"
        size="notification"
        aria="notification"
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      />
      {onHover && (
        <SiteLabel
          variant="display"
          aria="notificationDetails"
          size="notificationDetails"
          absolute
          addClasses="mt-6 right-14"
        >
          <p className="NotificationDetails">{message}</p>
        </SiteLabel>
      )}
    </div>
  );
};

export default Notification;
