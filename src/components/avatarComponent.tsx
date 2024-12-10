import Image from "next/image";
import { useFellow } from "@/contexts/FellowContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { usePageContext } from "@/contexts/PageContext";

export default function Avatar({ addClasses }: any) {
  const { fellow } = useFellow();
  const { business } = useBusiness();
  const { accountType } = usePageContext();

  return (
    <div className="Avatar">
      {accountType === "Fellow" && (
        <Image
          className={`AvatarImage ${fellow?.shadow} ${addClasses}`}
          src={fellow?.avatar}
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
