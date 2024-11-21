"use client";

import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFellow } from "@/contexts/FellowContext";

import Image from "next/image";
import SiteButton from "@/components/siteButton";
import ErrorModal from "@/components/modals/errorModal";
import AvatarModal from "@/components/modals/chooseAvatarModal";
import InputComponent from "@/components/inputComponent";
import LabelGeneratorAndDisplayComp from "@/components/labelGenAndDisplayComponent";

import {
  getRandomColorArray,
  shuffleButtonColors,
} from "@/utils/getRandomColorScheme";

import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
type CurrentSchemeType = ButtonColorOption;

const fellowSchema = z.object({
  name: z.string().min(2, { message: "Your name is Required" }),
  email: z.string().email({ message: "test" }),
  smallBio: z
    .string()
    .min(5, { message: "Your Small Bio must be more than 5 Letters" }),
  location: z
    .string()
    .min(5, { message: "Your Location must be more than 5 Letters in Length" }),
  skills: z.array(z.string()).min(1),
  jobTitles: z.array(z.string()).min(1),
});

type FormData = z.infer<typeof fellowSchema>;

export default function IndividualSignupPage1() {
  const router = useRouter();
  const { fellow, setFellow } = useFellow();
  const { showModal } = useModal();

  const [disabledButton, setDisabledButton] = useState(false);
  const [name, setName] = useState(fellow?.name);
  const [email, setEmail] = useState(fellow?.email);
  const [smallBio, setSmallBio] = useState(fellow?.smallBio);
  const [location, setLocation] = useState(fellow?.location);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [jobTitles, setJobTitles] = useState<string[]>([]);

  const [colorArray, setColorArray] = useState<CurrentSchemeType[]>([]);
  const [secondaryColorArray, setSecondaryColorArray] = useState<
    CurrentSchemeType[]
  >([]);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fellowSchema),
    defaultValues: {
      name: name,
      email: email,
      skills: skills,
      jobTitles: jobTitles,
      smallBio: smallBio,
      location: location,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    setFellow({
      ...fellow,
      name: data.name,
      email: data.email,
      smallBio: data.smallBio,
      location: data.location,
      skills: skills,
      jobTitles: jobTitles,
    });
    router.push("/individual-signup/step2");

    // const formData = { ...data, skills, jobTitles }; // Add skills & jobTitles to the submitted data
    // try {
    //   //then send details to the server
    //   console.log(formData);
    //   router.push("/individual-signup/step2");
    // } catch (err) {
    //   showModal(<ErrorModal />);
    // }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log("trying to add a skill");
    console.log(name, value);
    if (name === "skill") {
      setNewSkill(value);
    } else if (name === "jobTitle") {
      setNewJobTitle(value);
    }
  };

  // handlers for adding, updating, and deleting skills & job titles
  const handleAdd = (type: "skill" | "jobTitle") => {
    if (type === "skill" && newSkill !== "") {
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      setNewSkill("");
    } else if (type === "jobTitle" && newJobTitle !== "") {
      setJobTitles((prevJobTitles) => [...prevJobTitles, newJobTitle]);
      setNewJobTitle("");
    }
  };

  const handleDelete = (type: "skill" | "jobTitle", item: any) => {
    if (type === "skill") {
      setSkills((prevSkills) => prevSkills.filter((skill) => skill !== item));
    } else if (type === "jobTitle") {
      setJobTitles((prevJobTitles) =>
        prevJobTitles.filter((jobTitle) => jobTitle !== item),
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
    setName(fellow?.name);
    setEmail(fellow?.email);
    setSkills(Array.isArray(fellow?.skills) ? fellow.skills : []);
    setJobTitles(Array.isArray(fellow?.jobTitles) ? fellow.jobTitles : []);
  }, []);

  return (
    <div className="IndividualSignupPage flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center justify-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="IndividualSignupContainer flex w-[84%] max-w-[1600px] justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="IndividualSignupLeft flex w-[35vw] flex-col">
          <form
            className="IndividualSignupForm xs:pt-8 flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* These input components take the details and display error messages beneath them if the validation throws errors */}
            {/* It's not currently showing errors with the wording I've got typed out in the zod schema message, so I'll see if I can fix that */}

            {/* name input */}
            <InputComponent
              type="text"
              value={name}
              placeholderText="First & Last Name"
              errors={errors}
              onChange={(e: any) => {
                const value = e.target.value;
                setName(value);
                setValue("name", value);
              }}
            />

            {/* email input */}
            <InputComponent
              type="email"
              value={email}
              placeholderText="Fantasticemail@emailexample.com"
              errors={errors}
              onChange={(e: any) => {
                const value = e.target.value;
                setEmail(value);
                setValue("email", value);
              }}
            />

            {/* smallBio input */}
            <InputComponent
              type="text"
              value={smallBio}
              placeholderText="Your Small Bio"
              errors={errors}
              onChange={(e: any) => {
                const value = e.target.value;
                setSmallBio(value);
                setValue("smallBio", value);
              }}
            />

            {/* location input */}
            <InputComponent
              type="text"
              value={location}
              placeholderText="Your Location"
              errors={errors}
              onChange={(e: any) => {
                const value = e.target.value;
                setLocation(value);
                setValue("location", value);
              }}
            />
          </form>
        </div>
        <div className="IndividualSignupRight flex w-[35vw] flex-col">
          <Image
            className="AvatarImage -mt-14 justify-end self-end drop-shadow-lime"
            src="/avatars/orange-floral.svg"
            width={75}
            height={75}
            alt="avatar"
          />
          <button
            className="py-4 text-right text-xs opacity-80 hover:opacity-100"
            onClick={() => showModal(<AvatarModal />)}
          >
            choose your avatar
          </button>

          {/* make a label generator component that you can plug in here and elsewhere */}
          <div className="SkillsAndJobTitlesContainer flex flex-col gap-8">
            {/* skills input & generator */}
            <LabelGeneratorAndDisplayComp
              handleAdd={handleAdd}
              value={newSkill}
              handleInputChange={handleInputChange}
              errors={errors}
              selectedArray={skills}
              handleDelete={handleDelete}
              placeholder="Your Skills"
              colorArray={colorArray}
              name="skill"
              variant="functional"
            />

            {/* job titles generator */}
            <LabelGeneratorAndDisplayComp
              handleAdd={handleAdd}
              value={newJobTitle}
              handleInputChange={handleInputChange}
              errors={errors}
              selectedArray={jobTitles}
              handleDelete={handleDelete}
              placeholder="Job Titles For You"
              colorArray={secondaryColorArray}
              name="jobTitle"
              variant="functional"
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
