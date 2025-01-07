"use client";

import { useState } from "react";
import { useColors } from "@/contexts/ColorContext";
import SiteButton from "./siteButton";
import InfoBox from "../informationDisplayComponents/infoBox";
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
  const { colorOption } = useColors();
  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <div className="NotificationContainer flex flex-col">
      {/* <SiteButton
        variant="filled"
        colorScheme="f1"
        aria="notificationButton"
        size="extraSmallCircle"
        onClick={() => setButtonClicked(!buttonClicked)}
      ></SiteButton> */}
      <SiteLabel
        variant="notification"
        colorScheme="f1"
        size="notification"
        aria="notification"
        onMouseEnter={() => setButtonClicked(true)}
        onMouseLeave={() => setButtonClicked(false)}
      />
      {buttonClicked && (
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
