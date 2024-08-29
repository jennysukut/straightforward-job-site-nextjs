import Image from "next/image";
import SiteButton from "./siteButton";

export default function Footer() {
  return (
    <div className="Footer relative bottom-0 flex h-24 w-full items-end justify-between p-6">
      <div className="FooterButtonContainer flex gap-6">
        <SiteButton variant="filled" colorScheme="b2" aria="contact us">
          contact
        </SiteButton>
        <SiteButton variant="filled" colorScheme="c5" aria="our makers">
          our makers
        </SiteButton>
        <SiteButton variant="filled" colorScheme="f1" aria="our sponsors">
          our sponsors
        </SiteButton>
      </div>
      <div className="FooterInfo">
        <p className="Copywrite text-xs text-olive">
          ©2024, Straightforward Job Site
        </p>
      </div>
    </div>
  );
}
