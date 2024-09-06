"use client";

import clsx from "clsx";
import { colorStyle } from "@/lib/colorStyles";
import getRandomLabelColors from "@/utils/getRandomLabelColors";

interface LabelProps extends React.HTMLAttributes<HTMLDivElement>{
    variant: "display" | "functional";
    colorScheme?: string;
    aria: string;
    type?: string;
  }

  const SiteLabel: React.FC<LabelProps> = ({
    type = "label",
    aria,
    variant,
    colorScheme = getRandomLabelColors(),
    children,
    ...props
  }) => { 

function handleRemove() {
    console.log("remove button clicked");
    // tie this into the data to update list of labels at it's source
}


// I want to add the labelCloseButton.svg to here - I have it stored in the public folder 
// but I haven't been able to get it to integrate with this button, so I put the letter X as a placeholder for now
const removeButton = <button className="CloseButton ml-5 bg-[url('/utils/labelCloseButton.svg')]" onClick={handleRemove}>X</button>

const labelClasses = clsx(
    `Label relative z-[1] rounded-full font-semibold transition-all duration-200 hover:saturate-[120%] ${colorStyle[colorScheme]} text-eggshell text-xs py-1 tracking-widest m-1`,
    {
      // variant
      "px-4" : variant === "display",
      "pr-3 pl-4": variant === "functional",
    },
  );

return (
      <div
        {...props}
        className={labelClasses}
        aria-label={aria}
      >
        {children}
        {variant === "functional" ? removeButton : ""}
      </div>
  );
  }

  export default SiteLabel;