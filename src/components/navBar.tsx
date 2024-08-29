import Image from "next/image";
import SiteButton from "./siteButton";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="NavBar mt-[50px] flex h-20 w-full justify-between px-16">
      <Link href={"/"}>
        <Image
          className="Logo cursor-pointer transition-transform duration-300 hover:scale-105"
          src="/sfjs-logo.svg"
          width={229}
          height={75}
          alt="Straightforward Job Site logo"
        />
      </Link>
      <div className="TEMPORARYBUTTON">
        <Link href={"/temporaryTestPage"}>
          <SiteButton variant="hollow" aria="About us">
            temporary button to test page
          </SiteButton>
        </Link>
      </div>
      <div className="NavButtonContainer flex gap-6">
        <SiteButton variant="filled" colorScheme="c8" aria="About us">
          about
        </SiteButton>
        <SiteButton
          variant="filled"
          colorScheme="b6"
          aria="Login to your account"
        >
          login
        </SiteButton>
        <SiteButton
          variant="filled"
          colorScheme="f10"
          aria="Create a new account"
        >
          signup
        </SiteButton>
      </div>
    </div>
  );
}
