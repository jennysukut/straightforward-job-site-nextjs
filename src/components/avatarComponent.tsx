import Image from "next/image";
import { useFellow } from "@/contexts/FellowContext";

export default function Avatar() {
  const { fellow } = useFellow();

  return (
    <Image
      className={`AvatarImage -mt-14 justify-end self-end ${fellow?.shadow}`}
      src={fellow?.avatar}
      width={75}
      height={75}
      alt="avatar"
    />
  );
}
