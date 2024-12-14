import * as Dialog from "@radix-ui/react-dialog";
import SiteButton from "../siteButton";
import { avatarOptions } from "@/lib/stylingData/avatarOptions";
import { useModal } from "@/contexts/ModalContext";
import { useColors } from "@/contexts/ColorContext";

export default function AvatarModal({ setAvatarOptions }: any) {
  const { hideModal } = useModal();
  const { colorOption } = useColors();

  const handleClick = (option: any) => {
    setAvatarOptions({
      url: {
        standard: option.url.standard,
        highContrast: option.url.highContrast,
      },
      shadow: {
        standard: option.dropShadow.standard,
        highContrast: option.dropShadow.highContrast,
      },
      buttonShadow: {
        standard: option.shadow.standard,
        highContrast: option.shadow.highContrast,
      },
      buttonImg: {
        standard: option.img.standard,
        highContrast: option.img.highContrast,
      },
      colorScheme: option.colorScheme,
    });
    hideModal();
  };

  const renderAvatarOptions = () => {
    if (colorOption === "standard") {
      return avatarOptions.map((option) => (
        <SiteButton
          key={option.title}
          variant="avatar"
          colorScheme="b1"
          size="largeCircle"
          aria={option.title}
          addClasses={`${option.shadow.standard}`}
          addImage={`${option.img.standard}`}
          onClick={() => handleClick(option)}
        />
      ));
    } else if (colorOption === "highContrast") {
      return avatarOptions.map((option) => (
        <SiteButton
          key={option.title}
          variant="avatar"
          colorScheme="b1"
          size="largeCircle"
          aria={option.title}
          addClasses={`${option.shadow.highContrast}`}
          addImage={`${option.img.highContrast}`}
          onClick={() => handleClick(option)}
        />
      ));
    }
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
