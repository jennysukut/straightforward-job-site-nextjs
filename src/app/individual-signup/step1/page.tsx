"use client";

import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFellow } from "@/contexts/FellowContext";
import { skillsList } from "@/lib/skillsList";

import Image from "next/image";
import SiteButton from "@/components/siteButton";
import ErrorModal from "@/components/modals/errorModal";
import AvatarModal from "@/components/modals/chooseAvatarModal";
import InputComponent from "@/components/inputComponent";
import LabelGeneratorAndDisplayComp from "@/components/labelGenAndDisplayComponent";
import InputComponentWithLabelOptions from "@/components/inputComponentWithLabelOptions";
import ButtonOptionsComponent from "@/components/buttonOptionsComponent";
import AddHandler from "@/components/addHandler";

import { countries } from "@/lib/countriesList";
import { languageOptions } from "@/lib/languageOptions";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import {
  getRandomColorArray,
  shuffleButtonColors,
} from "@/utils/getRandomColorScheme";
type CurrentSchemeType = ButtonColorOption;

const fellowSchema = z.object({
  name: z.string().min(2, { message: "Your Name is Required" }),
  email: z.string().email({ message: "Your Email is Required" }),
  smallBio: z
    .string()
    .min(5, { message: "Your Small Bio Must Be More Than 5 Letters" }),
  country: z.string().min(3, { message: "Your Country is Required" }),
  location: z
    .string()
    .min(3, { message: "Your Specific Location is Required" }),
  locationOptions: z
    .array(z.string())
    .min(1, { message: "You Must Have At Least 1 Location Type Selected" }),
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
// I set the necessary number of skills and jobTitles to 1, but it gives me issues when I only add one item?

type FormData = z.infer<typeof fellowSchema>;

export default function IndividualSignupPage1() {
  const router = useRouter();
  const { fellow, setFellow } = useFellow();
  const { showModal } = useModal();

  const [disabledButton, setDisabledButton] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [colorArray, setColorArray] = useState<CurrentSchemeType[]>([]);
  const [secondaryColorArray, setSecondaryColorArray] = useState<
    CurrentSchemeType[]
  >([]);
  const [avatarOptions, setAvatarOptions] = useState({
    url: fellow?.avatar,
    shadow: fellow?.shadow,
    colorScheme: fellow?.colorScheme,
  });

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
      locationOptions: locationOptions,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    console.log(data);
    setFellow({
      ...fellow,
      name: data.name,
      email: data.email,
      smallBio: data.smallBio,
      country: data.country,
      location: data.location,
      locationOptions: locationOptions,
      skills: skills,
      jobTitles: jobTitles,
      avatar: avatarOptions.url,
      shadow: avatarOptions.shadow,
      colorScheme: avatarOptions.colorScheme,
    });
    router.push("/individual-signup/step2");
  };

  // handlers for adding, updating, and deleting skills & job titles
  const handleAdd = (
    type: "skill" | "jobTitle" | "country" | "locationOption" | "language",
    item: any,
  ) => {
    AddHandler({
      item,
      type,
      setFunctions: {
        skill: setSkills,
        jobTitle: setJobTitles,
        locationOption: setLocationOptions,
        language: setLanguages,
      },
      setValue,
      clearErrors,
    });

    // if (type === "skill") {
    //   setSkills((prevSkills) => {
    //     const updatedSkills = [...prevSkills, item];
    //     setValue("skills", updatedSkills);
    //     clearErrors("skills");
    //     return updatedSkills;
    //   });
    // } else if (type === "jobTitle") {
    //   // AddHandler({
    //   //   item,
    //   //   type,
    //   //   setFunction: setJobTitles,
    //   //   setValue,
    //   //   clearErrors,
    //   // });
    //   setJobTitles((prevJobTitles) => {
    //     const updatedJobTitles = [...prevJobTitles, item];
    //     setValue("jobTitles", updatedJobTitles);
    //     clearErrors("jobTitles");
    //     return updatedJobTitles;
    //   });
    // } else if (type === "country") {
    //   setValue("country", item);
    //   clearErrors("country");
    // } else if (type === "language") {
    //   setLanguages((prevLang) => {
    //     const updatedLanguages = [...prevLang, item];
    //     setValue("languages", updatedLanguages);
    //     clearErrors("languages");
    //     return updatedLanguages;
    //   });
    // } else if (type === "locationOption") {
    //   setLocationOptions((prevLocationOptions) => {
    //     if (prevLocationOptions.includes(item)) {
    //       const updatedLocation = prevLocationOptions.filter(
    //         (opt) => opt !== item,
    //       );
    //       setValue("locationOptions", updatedLocation);
    //       clearErrors("locationOptions");
    //       return updatedLocation;
    //     } else {
    //       const updatedLocation = [...prevLocationOptions, item];
    //       setValue("locationOptions", updatedLocation);
    //       clearErrors("locationOptions");
    //       return updatedLocation;
    //     }
    //   });
    // }
  };

  const handleDelete = (type: "skill" | "jobTitle" | "language", item: any) => {
    if (type === "skill") {
      setSkills((prevSkills) => prevSkills.filter((skill) => skill !== item));
    } else if (type === "jobTitle") {
      setJobTitles((prevJobTitles) =>
        prevJobTitles.filter((jobTitle) => jobTitle !== item),
      );
    } else if (type === "language") {
      setLanguages((prevLang) =>
        prevLang.filter((prevLang) => prevLang !== item),
      );
    }
  };

  // generating two separate random color arrays to loop through for our labels
  useEffect(() => {
    const colors = getRandomColorArray(36);
    setColorArray(colors);
    const secondaryColors = shuffleButtonColors(36);
    setSecondaryColorArray(secondaryColors);
  }, []);

  // Setting Details on page from fellowContext
  useEffect(() => {
    setSkills(Array.isArray(fellow?.skills) ? fellow.skills : []);
    setJobTitles(Array.isArray(fellow?.jobTitles) ? fellow.jobTitles : []);
    setLocationOptions(
      Array.isArray(fellow?.locationOptions) ? fellow.locationOptions : [],
    );

    // Update default values for the form
    setValue("skills", fellow?.skills || []);
    setValue("jobTitles", fellow?.jobTitles || []);
    setValue("locationOptions", fellow?.locationOptions || []);
  }, [fellow, setValue]);

  return (
    <div className="IndividualSignupPage flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center justify-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="IndividualSignupContainer flex w-[84%] max-w-[1600px] justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="IndividualSignupLeft flex w-[35vw] flex-col">
          <form
            className="IndividualSignupForm xs:pt-8 flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* name input */}
            <InputComponent
              type="text"
              placeholderText="First & Last Name"
              errors={errors.name}
              register={register}
              registerValue="name"
              defaultValue={fellow?.name}
              required
            />

            {/* email input */}
            <InputComponent
              type="email"
              placeholderText="Fantasticemail@emailexample.com"
              errors={errors.email}
              register={register}
              registerValue="email"
              defaultValue={fellow?.email}
              required
            />

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

            <ButtonOptionsComponent
              type="locationOption"
              title="location options:"
              buttons={["remote", "on-site", "hybrid"]}
              selectedArray={locationOptions}
              handleAdd={handleAdd}
              errors={errors.locationOptions}
              required
            />
          </form>
        </div>
        <div className="IndividualSignupRight flex w-[35vw] flex-col">
          <Image
            className={`AvatarImage -mt-14 justify-end self-end ${avatarOptions.shadow}`}
            src={avatarOptions.url}
            width={75}
            height={75}
            alt="avatar"
            onClick={() =>
              showModal(<AvatarModal setAvatarOptions={setAvatarOptions} />)
            }
          />
          <button
            className="py-4 text-right text-xs opacity-80 hover:opacity-100"
            onClick={() =>
              showModal(<AvatarModal setAvatarOptions={setAvatarOptions} />)
            }
          >
            choose your avatar
          </button>

          <div className="SkillsAndJobTitlesContainer flex flex-col gap-8">
            {/* skills input & generator */}
            <LabelGeneratorAndDisplayComp
              handleAdd={handleAdd}
              errors={errors.skills}
              selectedArray={skills}
              handleDelete={handleDelete}
              placeholder="Your Skills"
              colorArray={colorArray}
              name="skill"
              variant="functional"
              options
              searchData={skillsList}
              required
            />

            {/* job titles generator */}
            <LabelGeneratorAndDisplayComp
              handleAdd={handleAdd}
              errors={errors.jobTitles}
              selectedArray={jobTitles}
              handleDelete={handleDelete}
              placeholder="Job Titles For You"
              colorArray={secondaryColorArray}
              name="jobTitle"
              variant="functional"
              required
            />

            {/* language input & generator */}
            <LabelGeneratorAndDisplayComp
              handleAdd={handleAdd}
              errors={errors.languages}
              selectedArray={languages}
              handleDelete={handleDelete}
              placeholder="Your Spoken Language(s)"
              colorArray={colorArray}
              name="language"
              variant="functional"
              options
              searchData={languageOptions}
              required
            />
          </div>
          <div className="ButtonContainer -mb-6 mt-6 flex justify-end self-end">
            <SiteButton
              variant="hollow"
              colorScheme="f1"
              aria="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={disabledButton}
            >
              {disabledButton ? "Saving Information..." : "continue"}
            </SiteButton>
          </div>
        </div>
      </div>
    </div>
  );
}
