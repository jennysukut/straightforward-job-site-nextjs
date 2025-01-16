"use client";

import SiteButton from "./buttonsAndLabels/siteButton";
import SiteLabel from "./buttonsAndLabels/siteLabel";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useColors } from "@/contexts/ColorContext";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";

export default function Footer() {
  const { secondaryTextColor } = useColorOptions();
  const { colorOption } = useColors();
  const { accountType } = usePageContext();
  const { fellow } = useFellow();

  const variant = colorOption === "highContrast" ? "hollow" : "filled";
  return (
    <div className="Footer flex flex-col items-end justify-between gap-6 px-8 py-8 sm:h-24 sm:w-full sm:flex-row">
      <div className="FooterButtonContainer flex flex-row flex-wrap gap-4">
        <SiteButton variant={variant} colorScheme="b2" aria="contact us">
          contact
        </SiteButton>
        <SiteButton variant={variant} colorScheme="d4" aria="our makers">
          our makers
        </SiteButton>
        <SiteButton variant={variant} colorScheme="f3" aria="our supporters">
          our supporters
        </SiteButton>
        <SiteButton variant={variant} colorScheme="e6" aria="about">
          about
        </SiteButton>
        <SiteButton variant={variant} colorScheme="b4" aria="About us">
          resources
        </SiteButton>
      </div>
      <div className="FooterInfo">
        <p className={`Copywrite ${secondaryTextColor} -mb-4 text-xs`}>
          ©2024, Straightforward Job Site - adding something to the footer so I
          can merge?
        </p>
      </div>
    </div>
  );
}
