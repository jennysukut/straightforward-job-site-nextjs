import Image from "next/image";
import SiteButton from "./siteButton";

export default function Footer() {
  return (
    <div className="Footer relative bottom-0 flex h-24 w-full items-center justify-between px-16">
      <div className="FooterButtonContainer flex gap-6">
        <SiteButton variant="filled" colorScheme="b6" aria="contact us">
          contact
        </SiteButton>
        <SiteButton variant="filled" colorScheme="c8" aria="About us">
          about
        </SiteButton>
        <SiteButton variant="filled" colorScheme="f10" aria="our policies">
          transparency
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
