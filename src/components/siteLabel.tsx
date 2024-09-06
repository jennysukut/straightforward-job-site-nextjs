"use client";

import clsx from "clsx";
import {
  smallShadowColors,
  SmallShadowColorOption,
} from "@/lib/smallShadowColors";
import getRandomColorScheme from "@/utils/getRandomColorScheme";
import Image from "next/image";

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "display" | "functional";
  colorScheme?: SmallShadowColorOption;
  aria: string;
  type?: string;
}

const SiteLabel: React.FC<LabelProps> = ({
  type = "label",
  aria,
  variant,
  colorScheme = getRandomColorScheme("a1"),
  children,
  ...props
}) => {
  function handleDelete() {
    console.log("delete button clicked");
    // tie this into the data to update list of labels at it's source
  }

  const labelClasses = clsx(
    `Label flex relative z-[1] rounded-full font-medium transition-all duration-200 ${smallShadowColors[colorScheme]} text-eggshell text-xs py-1 tracking-widest m-1`,
    {
      // variant
      "px-4": variant === "display",
      "pr-3 pl-4": variant === "functional",
    },
  );

  return (
    <div {...props} className={labelClasses} aria-label={aria}>
      {children}
      {variant === "functional" && (
        <button
          className="CloseButton ml-5 opacity-100 hover:opacity-50"
          onClick={handleDelete}
        >
          <Image
            src="/labelCloseButton.svg"
            alt="closebutton"
            width={10}
            height={10}
          ></Image>
        </button>
      )}
    </div>
  );
};

export default SiteLabel;
