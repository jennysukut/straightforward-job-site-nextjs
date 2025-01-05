"use client";

import clsx from "clsx";
import {
  LargeShadowColorOption,
  largeShadowColors,
} from "@/lib/stylingData/largeShadowColors";
import { smallShadowColors } from "@/lib/stylingData/smallShadowColors";
import Image from "next/image";
import { useColors } from "@/contexts/ColorContext";

interface InfoBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "hollow" | "filled";
  colorScheme?: LargeShadowColorOption;
  aria: string;
  type?: string;
  title?: string;
  textSize?: "small" | "medium" | "large";
  addClasses?: string;
  size?:
    | "tiny"
    | "extraSmall"
    | "small"
    | "standard"
    | "large"
    | "tall"
    | "medium"
    | "profile"
    | "jobPost"
    | "thin"
    | "jobListing";
  width?:
    | "extraSmall"
    | "small"
    | "medium"
    | "large"
    | "extraWide"
    | "full"
    | null;
  shadowSize?: "small";
  canCollapse?: boolean;
  collapseClick?: Function;
  canAdd?: boolean;
  addClick?: Function;
  canEdit?: boolean;
  editClick?: Function;
  height?: "tall" | null;
  canSearch?: boolean;
  searchClick?: Function;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  type = "information",
  size = "standard",
  aria,
  variant,
  colorScheme = "d6",
  children,
  title,
  addClasses,
  textSize = "large",
  width = "standard",
  shadowSize = "standard",
  canCollapse,
  collapseClick,
  canAdd,
  addClick,
  canEdit,
  editClick,
  height = "standard",
  canSearch,
  searchClick,
  ...props
}) => {
  const { colorOption } = useColors();
  const varOpt =
    colorOption === "highContrast"
      ? "hollow"
      : variant === "hollow"
        ? "hollow"
        : "filled";

  const boxOptions =
    colorOption === "highContrast"
      ? "border-pine drop-shadow-pine text-pine"
      : "border-jade drop-shadow-jade text-jade";

  const boxClasses = clsx(
    "InfoBox max-w-[95vw] relative z-[1] font-semibold leading-5 transition-all duration-200 tracking-superwide ",
    {
      // colors and borders
      [`bg-cream ${boxOptions} font-semibold border-[3px]`]:
        varOpt === "hollow" && size !== "tiny",
      [`bg-cream ${boxOptions} font-semibold border-[2px]`]:
        varOpt === "hollow" && size === "tiny",
      [`text-eggshell ${largeShadowColors[colorScheme]}`]:
        varOpt === "filled" &&
        shadowSize === "standard" &&
        colorOption === "standard",
      [`text-eggshell ${smallShadowColors[colorScheme]}`]:
        varOpt === "filled" &&
        shadowSize === "small" &&
        colorOption === "standard",

      //textSize
      "text-[0.6rem] sm:text-xs": textSize === "small",
      "text-xs sm:text-sm": textSize === "medium",
      "text-md sm:text-md": textSize === "large",

      // size
      "py-2 px-4 sm:py-2 sm:px-4 rounded-full sm:rounded-full": size === "tiny",
      "py-2 px-4 sm:py-3 sm:px-6 rounded-full sm:rounded-full":
        size === "extraSmall",
      "py-4 px-8 sm:py-6 sm:px-10 md:py-14 md:px-16 rounded-2xl sm:rounded-3xl":
        size === "standard",
      "py-4 px-10 sm:py-6 sm:px-14 rounded-2xl sm:rounded-3xl":
        size === "small",
      "py-8 px-8 xs:px-10 sm:py-8 sm:px-12 md:py-14 md:px-16 rounded-3xl":
        size === "large",
      "py-4 px-4 sm:py-6 sm:px-6 rounded-3xl h-[200px]": size === "tall",
      "py-4 px-4 sm:py-6 sm:px-6 rounded-3xl h-[100px]": size === "medium",
      "py-6 px-4 sm:py-10 sm:px-8 md:py-10 md:px-8 rounded-2xl sm:rounded-3xl":
        size === "profile",
      "py-6 px-2 sm:py-10 sm:px-6 md:py-10 md:px-6 rounded-2xl sm:rounded-3xl":
        size === "thin",
      "py-6 px-4 sm:py-10 sm:px-8 md:py-10 md:px-8 rounded-2xl sm:rounded-3xl w-[300px] max-h-[450px]":
        size === "jobPost",
      "py-6 px-4 sm:py-10 sm:px-8 md:py-10 md:px-8 rounded-2xl sm:rounded-3xl w-[25rem] min-h-[300px] max-h-[500px]":
        size === "jobListing",

      //width
      "max-w-screen-sm": width === "standard",
      "w-full": width === "full",
      "w-[84%] max-w-[1600px] ": width === "extraWide",
      "w-[15vw]": width === "extraSmall",
      "w-[30vw]": width === "small",
      "w-[40vw]": width === "medium",
      "w-[70vw]": width === "large",
    },
    addClasses,
  );

  return (
    <div className={`${boxClasses}`}>
      {/* profile edit button */}
      {canEdit && (size === "profile" || size === "thin") && (
        <button
          type="button"
          className="EditButton absolute right-0 -mt-6 mr-4 opacity-100 hover:opacity-50"
          onClick={editClick as React.MouseEventHandler<HTMLButtonElement>}
        >
          {colorOption === "highContrast" && (
            <Image
              src="/hc-edit-icon.svg"
              alt="editButton"
              width={16}
              height={16}
            ></Image>
          )}
          {colorOption === "standard" && (
            <Image
              src="/edit-icon.svg"
              alt="editButton"
              width={16}
              height={16}
            ></Image>
          )}
        </button>
      )}

      {title && (
        <h3 className="Title max-w-[95%] overflow-hidden truncate text-nowrap">
          {title}
        </h3>
      )}

      {children}

      {/* collapse button */}
      {canCollapse && (
        <button
          type="button"
          className="CollapseButton opacity-100 hover:opacity-50"
          onClick={collapseClick as React.MouseEventHandler<HTMLButtonElement>}
        >
          <Image
            src="/jade-collapse-button.svg"
            alt="collapseButton"
            width={16}
            height={16}
          ></Image>
        </button>
      )}

      {/* add button */}
      {canAdd && (
        <button
          type="button"
          className="AddButton right-0 opacity-75 hover:opacity-100"
          onClick={addClick as React.MouseEventHandler<HTMLButtonElement>}
        >
          {colorOption === "highContrast" && (
            <Image
              src="/hc-add-icon.svg"
              alt="addButton"
              width={16}
              height={16}
            ></Image>
          )}
          {colorOption === "standard" && (
            <Image
              src="/add-icon.svg"
              alt="addButton"
              width={16}
              height={16}
            ></Image>
          )}
        </button>
      )}

      {/* search button */}
      {canSearch && (
        <button
          type="button"
          className="SearchButton right-0 opacity-75 hover:opacity-100"
          onClick={
            searchClick
              ? (searchClick as React.MouseEventHandler<HTMLButtonElement>)
              : () => {}
          }
        >
          {colorOption === "highContrast" && (
            <Image
              src="/hc-magnifying-glass.svg"
              alt="searchButton"
              width={18}
              height={18}
            ></Image>
          )}
          {colorOption === "standard" && (
            <Image
              src="/search.svg"
              alt="searchButton"
              width={18}
              height={18}
            ></Image>
          )}
        </button>
      )}

      {/* edit button */}
      {canEdit && size !== "profile" && size !== "thin" && (
        <button
          type="button"
          className="EditButton self-end opacity-100 hover:opacity-50"
          onClick={editClick as React.MouseEventHandler<HTMLButtonElement>}
        >
          {colorOption === "highContrast" && (
            <Image
              src="/hc-edit-icon.svg"
              alt="editButton"
              width={16}
              height={16}
            ></Image>
          )}
          {colorOption === "standard" && (
            <Image
              src="/edit-icon.svg"
              alt="editButton"
              width={16}
              height={16}
            ></Image>
          )}
        </button>
      )}
    </div>
  );
};

export default InfoBox;
