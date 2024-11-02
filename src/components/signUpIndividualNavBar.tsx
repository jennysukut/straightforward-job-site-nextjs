"use client";

import Image from "next/image";
import Link from "next/link";

export default function IndividualSignupNavBar() {
  return (
    <div className="IndividualSignupNavBar mx-auto flex h-fit w-[95vw] justify-between px-8 py-12 sm:w-[98vw] sm:px-16">
      <Link href={"/"}>
        <Image
          className="Logo max-w-44 cursor-pointer transition-transform duration-300 hover:scale-105"
          src="/sfjs-logo.svg"
          width={229}
          height={75}
          alt="Straightforward Job Site logo"
        />
      </Link>
      <div className="TellUsAboutYou">
        <p className="TellAboutYouTitle">tell us more about you!</p>
      </div>
    </div>
  );
}
