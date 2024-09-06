import Image from "next/image";
import SiteButton from "./siteButton";
import Link from "next/link";

export default function NavBar() {
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
          <SiteButton variant="hollow" colorScheme="a1" aria="About us">
            temporary button to test page
          </SiteButton>
        </Link>
      </div>
      <div className="NavButtonContainer flex gap-6">
        <SiteButton variant="filled" colorScheme="b4" aria="About us">
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
    </div>
  );
}
