import Image from "next/image";
import { useColors } from "@/contexts/ColorContext";
import {
  avatarOptions,
  placeholderAvatar,
} from "@/lib/stylingData/avatarOptions";

export default function Avatar({
  addClasses,
  business,
  avatarType,
  avatar,
}: any) {
  const { colorOption } = useColors();

  let avatarDetails;
  if (avatarType === "Business") {
    avatarDetails =
      avatarOptions.find(
        (option) => option.title === business?.businessProfile.avatar,
      ) || placeholderAvatar;
  } else if (avatarType === "Fellow") {
    avatarDetails =
      avatarOptions.find((option) => option.title === avatar) ||
      placeholderAvatar;
  }

  return (
    <div className="Avatar">
      {avatarType === "Fellow" && (
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
      {avatarType === "Business" && (
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
    </div>
  );
}
