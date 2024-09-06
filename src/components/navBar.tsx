"use client";

import Image from "next/image";
import SiteButton from "./siteButton";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [aboutClicked, setAboutClicked] = useState(false);

  function handleAboutClick() {
    if (aboutClicked === true) {
      setAboutClicked(false);
    } else {
      setAboutClicked(true);
    }
  }

  return (
    <div className="NavBar flex h-fit w-full justify-between px-16 pt-[50px]">
      <Link href={"/"}>
        <Image
          className="Logo max-w-48 cursor-pointer transition-transform duration-300 hover:scale-105"
          src="/sfjs-logo.svg"
          width={229}
          height={75}
          alt="Straightforward Job Site logo"
        />
      </Link>
      <div className="TEMPORARYBUTTON">
        <Link href={"/temporaryTestPage"}>
          <SiteButton variant="hollow" colorScheme="a1" aria="test button">
            temporary button to test page
          </SiteButton>
        </Link>
      </div>
      <div className="NavButtonContainer flex gap-6">
        <SiteButton
          variant="filled"
          colorScheme="b4"
          aria="About us"
          onClick={handleAboutClick}
        >
          about
        </SiteButton>
        <SiteButton
          variant="filled"
          colorScheme="e5"
          aria="Login to your account"
        >
          login
        </SiteButton>
        <SiteButton
          variant="filled"
          colorScheme="f3"
          aria="Create a new account"
        >
          signup
        </SiteButton>
      </div>
      {aboutClicked === true ? (
        <div className="AboutButtons relative flex flex-col items-start space-y-4">
          <SiteButton variant="filled" colorScheme="b3" aria="our why">
            our why
          </SiteButton>
          <SiteButton variant="filled" colorScheme="f1" aria="what we do">
            what we do
          </SiteButton>
          <SiteButton variant="filled" colorScheme="c1" aria="pricing">
            pricing
          </SiteButton>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
