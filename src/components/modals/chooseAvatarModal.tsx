import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";

export default function AvatarModal() {
  return (
    <div className="AvatarOptionsModal flex max-w-[35rem] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full pb-4 text-center text-xl font-bold">
        {`choose your avatar`}
      </Dialog.Title>
      <div className="AvatarOptions flex flex-wrap gap-4">
        <Image
          className="AvatarImage -mt-14 justify-end self-end drop-shadow-jade"
          src="/tape-avatar.svg"
          width={30}
          height={30}
          alt="avatar"
        />
        <Image
          className="AvatarImage -mt-14 justify-end self-end drop-shadow-jade"
          src="/tape-avatar.svg"
          width={30}
          height={30}
          alt="avatar"
        />
        <Image
          className="AvatarImage -mt-14 justify-end self-end drop-shadow-jade"
          src="/tape-avatar.svg"
          width={30}
          height={30}
          alt="avatar"
        />
      </div>
    </div>
  );
}
