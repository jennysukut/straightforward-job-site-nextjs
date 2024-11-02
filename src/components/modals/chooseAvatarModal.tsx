import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import SiteButton from "../siteButton";
import { avatarOptions } from "@/lib/stylingData/avatarOptions";

export default function AvatarModal() {
  const handleClick = (option: any) => {
    console.log(`this avatar ${option.title} was clicked`);
  };

  const renderAvatarOptions = () => {
    return avatarOptions.map((option) => (
      <SiteButton
        key={option.title}
        variant="avatar"
        colorScheme="b1"
        size="largeCircle"
        aria={option.title}
        addClasses={`${option.shadow}`}
        addImage={`${option.img}`}
        onClick={() => handleClick(option)}
      />
    ));
  };

  return (
    <div className="AvatarOptionsModal flex max-w-[35rem] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full pb-4 text-center text-xl font-bold">
        {`choose your avatar`}
      </Dialog.Title>
      <div className="AvatarOptions flex flex-wrap gap-4">
        {renderAvatarOptions()}
      </div>
    </div>
  );
}
