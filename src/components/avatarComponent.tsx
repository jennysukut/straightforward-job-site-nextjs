import Image from "next/image";
import { useFellow } from "@/contexts/FellowContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { usePageContext } from "@/contexts/PageContext";
import { useColors } from "@/contexts/ColorContext";
import { avatarOptions } from "@/lib/stylingData/avatarOptions";

export default function Avatar({ addClasses }: any) {
  const { fellow } = useFellow();
  const { business } = useBusiness();
  const { accountType } = usePageContext();
  const { colorOption } = useColors();

  const avatarDetails = avatarOptions.find(
    (option) => option.title === fellow?.avatar,
  );

  return (
    <div className="Avatar">
      {accountType === "Fellow" && (
        <Image
          className={`AvatarImage ${colorOption === "highContrast" ? avatarDetails?.dropShadow.highContrast : ""} ${colorOption === "standard" ? avatarDetails?.dropShadow.standard : ""} ${addClasses}`}
          src={
            colorOption === "highContrast"
              ? avatarDetails?.url.highContrast || "/default-avatar.png"
              : avatarDetails?.url.standard || "/default-avatar.png"
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
