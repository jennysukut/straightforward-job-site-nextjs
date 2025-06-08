"use client";

import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBusiness } from "@/contexts/BusinessContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useColors } from "@/contexts/ColorContext";
import { useMutation } from "@apollo/client";
import { SAVE_BUSINESS_PROFILE_PAGE_1_MUTATION } from "@/graphql/mutations";
import { usePageContext } from "@/contexts/PageContext";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import AvatarModal from "@/components/modals/chooseAvatarModal";
import InputComponent from "@/components/inputComponents/inputComponent";
import InputComponentWithLabelOptions from "@/components/inputComponents/inputComponentWithLabelOptions";
import AddHandler from "@/components/handlers/addHandler";
import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";

import { countries } from "@/lib/countriesList";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import {
  avatarOptions,
  placeholderAvatar,
} from "@/lib/stylingData/avatarOptions";
type CurrentSchemeType = ButtonColorOption;

const businessSchema = z.object({
  smallBio: z
    .string()
    .min(5, { message: "Your Small Bio Must Be More Than 5 Letters" }),
  country: z.string(),
  location: z
    .string()
    .min(3, { message: "Your Specific Location is Required" }),
  website: z.string().url(),
});

type FormData = z.infer<typeof businessSchema>;

export default function BusinessSignupPage1() {
  const router = useRouter();
  const { business, setBusiness } = useBusiness();
  const { hideModal, showModal } = useModal();
  const { textColor, titleColor } = useColorOptions();
  const { colorOption } = useColors();
  const { setIsLoggedIn, setCurrentPage } = usePageContext();
  const [disabledButton, setDisabledButton] = useState(false);
  const [colorArray, setColorArray] = useState<CurrentSchemeType[]>([]);
  const avatarDetails =
    avatarOptions.find(
      (option) => option.title === business?.businessProfile?.avatar,
    ) || placeholderAvatar;
  const [avatar, setAvatar] = useState(avatarDetails);
  const [saveBusinessProfilePage1, { loading, error }] = useMutation(
    SAVE_BUSINESS_PROFILE_PAGE_1_MUTATION,
  );

  console.log("avatarDetails:", avatarDetails, business?.businessProfile);

  const {
    handleSubmit,
    setValue,
    register,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      country: business?.businessProfile?.country,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    try {
      const response = await saveBusinessProfilePage1({
        variables: {
          country: data.country,
          location: data.location,
          smallBio: data.smallBio,
          website: data.website,
          avatar: avatar?.title,
        },
      });

      console.log(
        "Details saved successfully, Details:",
        response.data.saveBusinessProfilePage1,
      ); // Adjust based on your mutation response
      setBusiness({
        ...business,
        profileIsBeingEdited: false,
        businessProfile: {
          country: data.country,
          location: data.location,
          smallBio: data.smallBio,
          website: data.website,
          avatar: avatar?.title,
        },
      });
      setIsLoggedIn(true);
      if (business?.profileIsBeingEdited) {
        router.push("/profile");
      } else {
        router.push("/business-signup/step2");
      }
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally, you can set an error state here to display to the user
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
    setCurrentPage("1");
    hideModal();
    ShuffleIdealButtonPattern(setColorArray);
  }, []);

  return (
    <div
      className={`BusinessSignupPage flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center ${textColor} justify-center gap-8 self-center pt-6 md:pb-8 md:pt-8`}
    >
      <div className="BusinessSignupContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="NameAvatarContainer -mb-6 flex justify-between">
          <h1 className="BusinessName ml-8 self-end pb-4 tracking-superwide">
            {business?.name || "Test BusinessName"}
          </h1>
          <div className="AvatarButtonContainer -mr-14 -mt-14 mb-2 flex flex-col items-end self-end">
            <div className="AvatarContainer flex items-baseline gap-4 self-end">
              <button
                className="max-w-[45%] self-end py-4 text-right text-xs opacity-80 hover:opacity-100"
                onClick={() => showModal(<AvatarModal setAvatar={setAvatar} />)}
              >
                {`choose your avatar & colors`}
              </button>
              <SiteButton
                variant="avatar"
                colorScheme={avatar?.colorScheme as ButtonColorOption}
                size="largeCircle"
                aria="avatar"
                addImage={`${colorOption === "standard" ? avatar?.img.standard : avatar?.img.highContrast}`}
                addClasses="self-end"
                onClick={() => showModal(<AvatarModal setAvatar={setAvatar} />)}
              />
            </div>
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
            defaultValue={business?.businessProfile?.country}
            width="full"
            register
            registerValue="country"
            required
          />

          {/* location input */}
          <InputComponent
            type="text"
            placeholderText="State / Province / Region / District"
            errors={errors.location}
            register={register}
            registerValue="location"
            defaultValue={business?.businessProfile?.location}
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
            defaultValue={business?.businessProfile?.smallBio}
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
            defaultValue={business?.businessProfile?.website}
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
