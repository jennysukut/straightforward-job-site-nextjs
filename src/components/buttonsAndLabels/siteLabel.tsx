"use client";

import clsx from "clsx";
import {
  smallShadowColors,
  SmallShadowColorOption,
} from "@/lib/stylingData/smallShadowColors";
import { getRandomColorScheme } from "@/utils/getRandomColorScheme";
import Image from "next/image";
import { useColors } from "@/contexts/ColorContext";

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "display" | "functional" | "hollow";
  colorScheme?: SmallShadowColorOption;
  aria: string;
  type?: string;
  addClasses?: string;
  textSize?: "medium" | "large";
  handleDelete?: React.MouseEventHandler<HTMLButtonElement>;
  canAdd?: boolean;
  handleAdd?: any;
  size?: "medium" | "small";
}

const SiteLabel: React.FC<LabelProps> = ({
  type = "label",
  aria,
  variant,
  colorScheme = getRandomColorScheme("a1"),
  children,
  addClasses,
  textSize,
  size = "standard",
  canAdd,
  handleAdd,
  handleDelete,
  ...props
}) => {
  const { colorOption } = useColors();

  const labelColors =
    colorOption === "highContrast"
      ? "bg-pine drop-shadow-smForest text-eggshell"
      : variant === "hollow"
        ? "bg-cream drop-shadow-smJade text-jade border-jade border-[2px]"
        : `${smallShadowColors[colorScheme]}`;

  const labelClasses = clsx(
    `Label w-fit  flex relative z-[1] rounded-full font-medium transition-all duration-200 ${labelColors} text-eggshell tracking-widest m-1`,
    {
      // size
      "py-2 px-6": size === "standard",
      "py-3 px-8": size === "medium",
      "py-1.5 px-4": size === "small",

      // variant
      "py-2 px-4": variant === "display",
      "py-2 pr-3 pl-4": variant === "functional",

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
            src="/label-close-button.svg"
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
