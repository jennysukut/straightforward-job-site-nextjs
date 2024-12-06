import * as Dialog from "@radix-ui/react-dialog";
import SiteButton from "../siteButton";
import { avatarOptions } from "@/lib/stylingData/avatarOptions";
import { useModal } from "@/contexts/ModalContext";

export default function AvatarModal({ setAvatarOptions }: any) {
  const { hideModal } = useModal();
  const handleClick = (option: any) => {
    setAvatarOptions({
      url: option.url,
      shadow: option.dropShadow,
      colorScheme: option.colorScheme,
      buttonShadow: option.shadow,
      buttonImg: option.img,
    });
    hideModal();
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
      <div className="AvatarOptions flex max-h-[55vh] max-w-[50vw] flex-wrap items-center justify-center gap-6 overflow-y-scroll">
        {renderAvatarOptions()}
      </div>
    </div>
  );
}
