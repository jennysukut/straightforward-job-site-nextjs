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
      {onHover && message && (
        <SiteLabel
          variant="display"
          aria="notificationDetails"
          size="notificationDetails"
          absolute
          addClasses="mt-8 right-14"
        >
          <p className="NotificationDetails">{message}</p>
        </SiteLabel>
      )}
    </div>
  );
};

const JobAMSNotificationButton: any = ({ colorScheme, message }: any) => {
  const [onHover, setOnHover] = useState(false);

  const hoverIn = () => {
    setTimeout(() => {
      setOnHover(true);
    }, 100);
  };

  const hoverOut = () => {
    setOnHover(false);
  };

  return (
    <div className="NotificationButton -mr-2">
      {onHover && message && (
        <p className="NotificationDetails absolute right-14 mt-1 text-xs">
          {message}
        </p>
      )}
      <SiteLabel
        variant="notification"
        size="notification"
        colorScheme={colorScheme}
        aria="notification"
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
        addClasses="bg-[url('/notification-icon.svg')]"
      />
    </div>
  );
};

export { Notification, JobAMSNotificationButton };
