"use client";

import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFellow } from "@/contexts/FellowContext";
import { skillsList } from "@/lib/skillsList";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useColors } from "@/contexts/ColorContext";
import { useMutation } from "@apollo/client";
import { SAVE_PROFILE_PAGE_1_MUTATION } from "@/graphql/mutations";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import AvatarModal from "@/components/modals/chooseAvatarModal";
import InputComponent from "@/components/inputComponents/inputComponent";
import LabelGeneratorAndDisplayComp from "@/components/buttonsAndLabels/labelGenAndDisplayComponent";
import InputComponentWithLabelOptions from "@/components/inputComponents/inputComponentWithLabelOptions";
import AddHandler from "@/components/handlers/addHandler";
import DeleteHandler from "@/components/handlers/deleteHandler";

import { countries } from "@/lib/countriesList";
import { languageOptions } from "@/lib/languageOptions";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { getRandomColorArray } from "@/utils/getRandomColorScheme";
import { avatarOptions } from "@/lib/stylingData/avatarOptions";
type CurrentSchemeType = ButtonColorOption;

const fellowSchema = z.object({
  smallBio: z
    .string()
    .min(5, { message: "Your Small Bio Must Be More Than 5 Letters" }),
  country: z.string().min(3, { message: "Your Country is Required" }),
  location: z
    .string()
    .min(3, { message: "Your Specific Location is Required" }),
  skills: z
    .array(z.string())
    .min(1, { message: "You Must Have At Least 1 Skill Listed" }),
  languages: z
    .array(z.string())
    .min(1, { message: "You Must Have At Least 1 Language Listed" }),
  jobTitles: z
    .array(z.string())
    .min(1, { message: "You Must Have At Least 1 Job Title Listed" }),
});

type FormData = z.infer<typeof fellowSchema>;

export default function IndividualSignupPage1() {
  const router = useRouter();
  const { fellow, setFellow } = useFellow();
  const { showModal } = useModal();
  const { titleColor, textColor } = useColorOptions();
  const { colorOption } = useColors();
  const avatarDetails = avatarOptions.find(
    (option) => option.title === fellow?.avatar,
  );
  const [disabledButton, setDisabledButton] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [colorArray, setColorArray] = useState<CurrentSchemeType[]>([]);
  const [avatar, setAvatar] = useState(avatarDetails);
  const [saveFellowProfilePage1, { loading, error }] = useMutation(
    SAVE_PROFILE_PAGE_1_MUTATION,
  );

  const {
    handleSubmit,
    setValue,
    register,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fellowSchema),
    defaultValues: {
      skills: skills,
      jobTitles: jobTitles,
      country: fellow?.country,
      languages: languages,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    try {
      const response = await saveFellowProfilePage1({
        variables: {
          smallBio: data.smallBio,
          country: data.country,
          location: data.location,
          skills: skills,
          jobTitles: jobTitles,
          avatar: avatar?.title,
          languages: languages,
          profileIsBeingEdited: false,
        },
      });
      // when successful, set the Fellow and push to the next signup page
      console.log(
        "Details saved successfully, Details:",
        response.data.saveFellowProfilePage1,
      ); // Adjust based on your mutation response
      setFellow({
        ...fellow,
        smallBio: data.smallBio,
        country: data.country,
        location: data.location,
        skills: skills,
        jobTitles: jobTitles,
        avatar: avatar?.title,
        languages: languages,
        profileIsBeingEdited: false,
      });
      if (fellow?.profileIsBeingEdited) {
        router.push("/profile");
      } else {
        router.push("/individual-signup/step2");
      }
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  //   setFellow({
  //     ...fellow,
  //     smallBio: data.smallBio,
  //     country: data.country,
  //     location: data.location,
  //     skills: skills,
  //     jobTitles: jobTitles,
  //     avatar: avatar?.title,
  //     languages: languages,
  //     profileIsBeingEdited: false,
  //   });
  //   if (fellow?.profileIsBeingEdited) {
  //     router.push("/profile");
  //   } else {
  //     router.push("/individual-signup/step2");
  //   }
  // };

  // handlers for adding, updating, and deleting information tied to States
  const handleAdd = (
    type: "skills" | "jobTitles" | "country" | "languages",
    item: any,
  ) => {
    AddHandler({
      item,
      type,
      setFunctions: {
        skills: setSkills,
        jobTitles: setJobTitles,
        languages: setLanguages,
      },
      setValue,
      clearErrors,
    });
  };

  const handleDelete = (
    type: "skills" | "jobTitles" | "languages",
    item: any,
  ) => {
    DeleteHandler({
      item,
      type,
      setFunctions: {
        skills: setSkills,
        jobTitles: setJobTitles,
        languages: setLanguages,
      },
    });
  };

  // generating two separate random color arrays to loop through for our labels
  useEffect(() => {
    const colors = getRandomColorArray(36);
    setColorArray(colors);
  }, []);

  // Setting Details on page from fellowContext
  useEffect(() => {
    setSkills(Array.isArray(fellow?.skills) ? fellow.skills : []);
    setJobTitles(Array.isArray(fellow?.jobTitles) ? fellow.jobTitles : []);
    setLanguages(Array.isArray(fellow?.languages) ? fellow.languages : []);

    // Update default values for the form
    setValue("skills", fellow?.skills || []);
    setValue("jobTitles", fellow?.jobTitles || []);
    setValue("languages", fellow?.languages || []);
  }, [fellow, setValue]);

  return (
    <div className="IndividualSignupPage flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center justify-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="IndividualSignupContainer flex w-[84%] max-w-[1600px] justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="IndividualSignupLeft mb-8 flex w-[35vw] flex-col">
          <form
            className="IndividualSignupForm xs:pt-8 flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1
              className={`FellowName -mb-4 ml-8 tracking-superwide ${titleColor}`}
            >
              {fellow?.name || "Test Name"}
            </h1>

            {/* smallBio input */}
            <InputComponent
              type="text"
              placeholderText="Your Small Bio"
              errors={errors.smallBio}
              register={register}
              registerValue="smallBio"
              defaultValue={fellow?.smallBio}
              required
            />

            {/* country input */}
            <InputComponentWithLabelOptions
              handleAdd={handleAdd}
              errors={errors.country}
              placeholder="Your Country"
              name="country"
              searchData={countries}
              colorArray={colorArray}
              options
              defaultValue={fellow?.country}
              required
            />

            {/* location input */}
            <InputComponent
              type="text"
              placeholderText="State / Province / Region / District"
              errors={errors.location}
              register={register}
              registerValue="location"
              defaultValue={fellow?.location}
              addClasses="-mt-2"
              required
            />

            {/* language input & generator */}
            <LabelGeneratorAndDisplayComp
              handleAdd={handleAdd}
              errors={errors.languages}
              selectedArray={languages}
              handleDelete={handleDelete}
              placeholder="Your Spoken Language(s)"
              name="languages"
              variant="functional"
              options
              searchData={languageOptions}
              required
            />
          </form>
        </div>
        <div className="IndividualSignupRight flex w-[35vw] flex-col">
          <div className="AvatarButtonContainer -mt-14 items-end self-end">
            <SiteButton
              variant="avatar"
              colorScheme={avatar?.colorScheme as ButtonColorOption}
              size="largeCircle"
              aria="avatar"
              addImage={`${colorOption === "standard" ? avatar?.img.standard : avatar?.img.highContrast}`}
              onClick={() => showModal(<AvatarModal setAvatar={setAvatar} />)}
            />
          </div>
          <button
            className={`max-w-[30%] self-end py-4 text-right text-xs opacity-80 hover:opacity-100 ${textColor}`}
            onClick={() => showModal(<AvatarModal setAvatar={setAvatar} />)}
          >
            {`choose your avatar & colors`}
          </button>
          <div className="SkillsAndJobTitlesContainer flex flex-col gap-8">
            {/* job titles generator */}
            <LabelGeneratorAndDisplayComp
              handleAdd={handleAdd}
              errors={errors.jobTitles}
              selectedArray={jobTitles}
              handleDelete={handleDelete}
              placeholder="Job Titles For You"
              name="jobTitles"
              variant="functional"
              required
            />

            {/* skills input & generator */}
            <LabelGeneratorAndDisplayComp
              handleAdd={handleAdd}
              errors={errors.skills}
              selectedArray={skills}
              handleDelete={handleDelete}
              placeholder="Your Skills"
              name="skills"
              variant="functional"
              options
              searchData={skillsList}
              required
            />
          </div>
          <div className="ButtonContainer -mb-6 mt-6 flex justify-end gap-4 self-end">
            <SiteButton
              variant="hollow"
              colorScheme="f1"
              aria="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={disabledButton}
            >
              {disabledButton && fellow?.profileIsBeingEdited === true
                ? "Returning To Profile..."
                : !disabledButton && fellow?.profileIsBeingEdited === true
                  ? "update"
                  : disabledButton && fellow?.profileIsBeingEdited === false
                    ? "Saving Information.."
                    : "continue"}{" "}
            </SiteButton>
          </div>
        </div>
      </div>
    </div>
  );
}
