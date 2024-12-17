import Image from "next/image";
import { useFellow } from "@/contexts/FellowContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { usePageContext } from "@/contexts/PageContext";
import { useColors } from "@/contexts/ColorContext";

export default function Avatar({ addClasses }: any) {
  const { fellow } = useFellow();
  const { business } = useBusiness();
  const { accountType } = usePageContext();
  const { colorOption } = useColors();

  return (
    <div className="Avatar">
      {accountType === "Fellow" && (
        <Image
          className={`AvatarImage ${colorOption === "highContrast" ? fellow?.shadow.highContrast : ""} ${colorOption === "standard" ? fellow?.shadow.standard : ""} ${colorOption === "seasonal" ? "drop-shadow-pine" : ""} ${addClasses}`}
          src={
            colorOption === "highContrast"
              ? fellow?.avatar.highContrast
              : fellow?.avatar.standard
          }
          width={60}
          height={60}
          alt="avatar"
        />
      )}
      {accountType === "Business" && (
        <Image
          className={`AvatarImage ${business?.shadow} ${addClasses}`}
          src={business?.avatar}
          width={60}
          height={60}
          alt="avatar"
        />
      )}
    </div>
  );
}
