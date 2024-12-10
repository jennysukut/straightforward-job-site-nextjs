"use client";

import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBusiness } from "@/contexts/BusinessContext";

import SiteButton from "@/components/siteButton";
import AvatarModal from "@/components/modals/chooseAvatarModal";
import InputComponent from "@/components/inputComponent";
import InputComponentWithLabelOptions from "@/components/inputComponentWithLabelOptions";
import AddHandler from "@/components/addHandler";
import ShuffleIdealButtonPattern from "@/components/shuffleIdealButtonPattern";

import { countries } from "@/lib/countriesList";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
type CurrentSchemeType = ButtonColorOption;

const businessSchema = z.object({
  smallBio: z
    .string()
    .min(5, { message: "Your Small Bio Must Be More Than 5 Letters" }),
  country: z.string().min(3, { message: "Your Country is Required" }),
  location: z
    .string()
    .min(3, { message: "Your Specific Location is Required" }),
  website: z.string().url(),
});

type FormData = z.infer<typeof businessSchema>;

export default function BusinessSignupPage1() {
  const router = useRouter();
  const { business, setBusiness } = useBusiness();
  const { showModal } = useModal();

  const [disabledButton, setDisabledButton] = useState(false);
  const [colorArray, setColorArray] = useState<CurrentSchemeType[]>([]);
  const [avatarOptions, setAvatarOptions] = useState({
    url: business?.avatar,
    shadow: business?.shadow,
    colorScheme: business?.colorScheme,
    buttonShadow: business?.shadow,
    buttonImg: business?.buttonImg,
  });

  const {
    handleSubmit,
    setValue,
    register,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      country: business?.country,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    setBusiness({
      ...business,
      country: data.country,
      location: data.location,
      smallBio: data.smallBio,
      website: data.website,
      avatar: avatarOptions.url,
      shadow: avatarOptions.shadow,
      colorScheme: avatarOptions.colorScheme,
      buttonShadow: avatarOptions.shadow,
      buttonImg: avatarOptions.buttonImg,
      profileIsBeingEdited: false,
    });
    if (business?.profileIsBeingEdited) {
      router.push("/profile");
    } else {
      router.push("/business-signup/step2");
    }
  };

  // handlers for adding, updating, and deleting information tied to States
  const handleAdd = (type: "country" | "languages", item: any) => {
    AddHandler({
      item,
      type,
      setValue,
      clearErrors,
    });
  };

  // generating two separate random color arrays to loop through for our labels
  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
  }, []);

  return (
    <div className="BusinessSignupPage flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center justify-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="BusinessSignupContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="NameAvatarContainer -mb-6 flex justify-between">
          <h1 className="BusinessName ml-8 self-end pb-4 tracking-superwide">
            {business?.businessName || "Test BusinessName"}
          </h1>
          <div className="AvatarButtonContainer -mt-14 flex flex-col items-end self-end">
            <div className="AvatarContainer self-end">
              <SiteButton
                variant="avatar"
                colorScheme={avatarOptions.colorScheme as ButtonColorOption}
                size="largeCircle"
                aria="avatar"
                addImage={`${avatarOptions.buttonImg}`}
                addClasses="self-end"
                onClick={() =>
                  showModal(<AvatarModal setAvatarOptions={setAvatarOptions} />)
                }
              />
            </div>
            <button
              className="max-w-[60%] self-end py-4 text-right text-xs opacity-80 hover:opacity-100"
              onClick={() =>
                showModal(<AvatarModal setAvatarOptions={setAvatarOptions} />)
              }
            >
              {`choose your avatar & colors`}
            </button>
          </div>
        </div>
        <form
          className="IndividualSignupForm xs:pt-8 flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* country input */}
          <InputComponentWithLabelOptions
            handleAdd={handleAdd}
            errors={errors.country}
            placeholder="Your Country"
            name="country"
            searchData={countries}
            colorArray={colorArray}
            options
            defaultValue={business?.country}
            width="full"
            required
          />

          {/* location input */}
          <InputComponent
            type="text"
            placeholderText="State / Province / Region / District"
            errors={errors.location}
            register={register}
            registerValue="location"
            defaultValue={business?.location}
            addClasses="-mt-2"
            width="full"
            required
          />

          {/* smallBio input */}
          <InputComponent
            type="text"
            placeholderText="A Small Bio of Your Business"
            errors={errors.smallBio}
            register={register}
            registerValue="smallBio"
            defaultValue={business?.smallBio}
            width="full"
            required
          />

          {/* website link input */}
          <InputComponent
            type="url"
            placeholderText="Your Website Link"
            errors={errors.website}
            register={register}
            registerValue="website"
            defaultValue={business?.website}
            width="full"
            required
          />
        </form>

        <div className="ButtonContainer -mb-6 mt-6 flex justify-end gap-4 self-end">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={disabledButton}
          >
            {disabledButton && business?.profileIsBeingEdited === true
              ? "Returning To Profile..."
              : !disabledButton && business?.profileIsBeingEdited === true
                ? "update"
                : disabledButton && business?.profileIsBeingEdited === false
                  ? "Saving Information.."
                  : "continue"}{" "}
          </SiteButton>
        </div>
      </div>
    </div>
  );
}
