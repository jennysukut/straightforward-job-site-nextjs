"use client";

import clsx from "clsx";
import {
  smallShadowColors,
  SmallShadowColorOption,
} from "@/lib/stylingData/smallShadowColors";
import { getRandomColorScheme } from "@/utils/getRandomColorScheme";
import Image from "next/image";

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "display" | "functional";
  colorScheme?: SmallShadowColorOption;
  aria: string;
  type?: string;
  addClasses?: string;
  textSize?: "medium" | "large";
  handleDelete?: React.MouseEventHandler<HTMLButtonElement>;
  canAdd?: boolean;
  handleAdd?: any;
}

const SiteLabel: React.FC<LabelProps> = ({
  type = "label",
  aria,
  variant,
  colorScheme = getRandomColorScheme("a1"),
  children,
  addClasses,
  textSize,
  canAdd,
  handleAdd,
  handleDelete,
  ...props
}) => {
  const labelClasses = clsx(
    `Label w-fit py-2 flex relative z-[1] rounded-full font-medium transition-all duration-200 ${smallShadowColors[colorScheme]} text-eggshell py-1 tracking-widest m-1`,
    {
      // variant
      "px-4": variant === "display",
      "pr-3 pl-4": variant === "functional",

      //textSize
      "text-xs": !textSize,
      "text-sm": textSize === "medium",
      "text-md": textSize === "large",
    },
    addClasses,
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
      {canAdd && (
        <button
          className="CloseButton ml-5 opacity-100 hover:opacity-50"
          onClick={handleAdd}
        >
          <Image
            src="/labelAddButton.svg"
            alt="closebutton"
            width={12}
            height={12}
          ></Image>
        </button>
      )}
    </div>
  );
};

export default SiteLabel;
