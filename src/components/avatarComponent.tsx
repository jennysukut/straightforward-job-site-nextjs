import Image from "next/image";
import { useFellow } from "@/contexts/FellowContext";

export default function Avatar({ addClasses }: any) {
  const { fellow } = useFellow();

  return (
    <Image
      className={`AvatarImage ${fellow?.shadow} ${addClasses}`}
      src={fellow?.avatar}
      width={60}
      height={60}
      alt="avatar"
    />
  );
}
