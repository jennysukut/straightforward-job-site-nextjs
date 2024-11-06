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
import InfoBox from "@/components/infoBox";
import SiteLabel from "@/components/siteLabel";
import AvatarModal from "@/components/modals/chooseAvatarModal";

import {
  getRandomColorArray,
  shuffleButtonColors,
} from "@/utils/getRandomColorScheme";

import {
  ButtonColorOption,
  buttonColorOptions,
} from "@/lib/stylingData/buttonColors";
type CurrentSchemeType = ButtonColorOption;

const fellowSchema = z.object({
  firstName: z.string().min(2, { message: "Required" }),
  lastName: z.string().min(2, { message: "Required" }),
  email: z.string().email(),
  smallBio: z.string().min(5, { message: "Required" }),
  location: z.string().min(5, { message: "Required" }),
  skills: z.array(z.string()),
  jobTitles: z.array(z.string()),
});

type FormData = z.infer<typeof fellowSchema>;

export default function IndividualSignupPage1() {
  //grab the data from the previous form input via the server and use it to fill out the firstName, lastName, and email states
  const router = useRouter();
  const { showModal } = useModal();
  const { fellow, setFellow } = useFellow();

  const [disabledButton, setDisabledButton] = useState(false);
  const [firstName, setFirstName] = useState(fellow?.firstName);
  const [lastName, setLastName] = useState(fellow?.lastName);
  const [email, setEmail] = useState(fellow?.email);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [jobTitles, setJobTitles] = useState<string[]>([]);

  const [colorArray, setColorArray] = useState<CurrentSchemeType[]>([]);
  const [secondaryColorArray, setSecondaryColorArray] = useState<
    CurrentSchemeType[]
  >([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fellowSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      skills: skills,
      jobTitles: jobTitles,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    const formData = { ...data, skills, jobTitles }; // Add skills & jobTitles to the submitted data
    try {
      //set FellowContext details
      setFellow({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        smallBio: data.smallBio,
        location: data.location,
        skills: skills,
        jobTitles: jobTitles,
      });
      //then send details to the server
      console.log(formData);
      router.push("/individual-signup/step2");
    } catch (err) {
      showModal(<ErrorModal />);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "skill") {
      setNewSkill(value);
    } else if (name === "jobTitle") {
      setNewJobTitle(value);
    }
  };

  const addSkill = () => {
    if (newSkill !== "") {
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      setNewSkill("");
    }
  };

  const addJobTitle = () => {
    if (newJobTitle !== "") {
      setJobTitles((prevJobTitles) => [...prevJobTitles, newJobTitle]);
      setNewJobTitle("");
    }
  };

  const deleteSkill = (skillToDelete: string) => {
    setSkills((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillToDelete),
    );
  };

  const deleteJobTitle = (jobTitleToDelete: string) => {
    setJobTitles((prevJobTitles) =>
      prevJobTitles.filter((jobTitle) => jobTitle !== jobTitleToDelete),
    );
  };

  useEffect(() => {
    const colors = getRandomColorArray(36);
    setColorArray(colors);
    const secondaryColors = shuffleButtonColors(36);
    setSecondaryColorArray(secondaryColors);
  }, []);

  console.log(fellow);

  return (
    <div className="IndividualSignupPage flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center justify-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="IndividualSignupContainer flex w-[84%] max-w-[1600px] justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="IndividualSignupLeft flex w-[35vw] flex-col">
          <form
            className="IndividualSignupForm xs:pt-8 flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* first name input */}
            <InfoBox variant="hollow" size="extraSmall" aria="firstName">
              <input
                type="text"
                value={firstName}
                placeholder="Your First Name"
                className="text-md w-full bg-transparent text-midnight placeholder:text-jade/50 focus:outline-none"
                onChange={(e) => {
                  const value = e.target.value;
                  setFirstName(value);
                  setValue("firstName", value);
                }}
              />
            </InfoBox>
            {errors.firstName?.message && (
              <p className="m-0 -mt-4 p-0 text-xs font-medium text-orange">
                {errors.firstName.message.toString()}
              </p>
            )}

            {/* last name input */}
            <InfoBox variant="hollow" size="extraSmall" aria="lastName">
              <input
                type="text"
                value={lastName}
                placeholder="Your Last Name"
                className="text-md w-full bg-transparent text-midnight placeholder:text-jade/50 focus:outline-none"
                onChange={(e) => {
                  const value = e.target.value;
                  setLastName(value);
                  setValue("lastName", value);
                }}
              />
            </InfoBox>
            {errors.lastName?.message && (
              <p className="m-0 -mt-4 p-0 text-xs font-medium text-orange">
                {errors.lastName.message.toString()}
              </p>
            )}

            {/* email input */}
            <InfoBox variant="hollow" size="extraSmall" aria="email">
              <input
                type="email"
                value={email}
                placeholder="Fantasticemail@emailexample.com"
                className="text-md w-full bg-transparent text-midnight placeholder:text-jade/50 focus:outline-none"
                onChange={(e) => {
                  const value = e.target.value;
                  setEmail(value);
                  setValue("email", value);
                }}
              />
            </InfoBox>
            {errors.email?.message && (
              <p className="m-0 -mt-4 p-0 text-xs font-medium text-orange">
                {errors.email.message.toString()}
              </p>
            )}

            {/* smallBio input */}
            <InfoBox variant="hollow" size="extraSmall" aria="firstName">
              <input
                type="text"
                placeholder="Your Small Bio"
                className="text-md w-full bg-transparent text-midnight placeholder:text-jade/50 focus:outline-none"
                {...register("smallBio", {
                  required: "A Small Bio is required",
                })}
              />
            </InfoBox>
            {errors.smallBio?.message && (
              <p className="m-0 -mt-4 p-0 text-xs font-medium text-orange">
                {errors.smallBio.message.toString()}
              </p>
            )}

            {/* location input */}
            <InfoBox variant="hollow" size="extraSmall" aria="firstName">
              <input
                type="text"
                placeholder="Your Location"
                className="text-md w-full bg-transparent text-midnight placeholder:text-jade/50 focus:outline-none"
                {...register("location", {
                  required: "Your Location is required",
                })}
              />
            </InfoBox>
            {errors.location?.message && (
              <p className="m-0 -mt-4 p-0 text-xs font-medium text-orange">
                {errors.location.message.toString()}
              </p>
            )}
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

          <div className="SkillsAndJobTitlesContainer flex flex-col gap-8">
            {/* skills input & generator */}
            <InfoBox
              variant="hollow"
              size="extraSmall"
              aria="skills"
              canAdd
              addClasses="flex"
              addClick={() => {
                addSkill();
              }}
            >
              <input
                type="skills"
                placeholder="Your Skills"
                value={newSkill}
                name="skill"
                className="text-md w-[98%] self-start bg-transparent text-midnight placeholder:text-jade/50 focus:outline-none"
                onChange={handleInputChange}
              />
            </InfoBox>
            {errors.skills?.message && (
              <p className="m-0 -mt-4 p-0 text-xs font-medium text-orange">
                {errors.skills.message.toString()}
              </p>
            )}
            {skills.length >= 1 ? (
              <div className="SkillsContainer flex flex-wrap gap-2">
                {skills.map((skill, index) => {
                  return (
                    <SiteLabel
                      aria={skill}
                      variant="functional"
                      key={index}
                      colorScheme={colorArray[index % colorArray.length]}
                      handleDelete={() => deleteSkill(skill)}
                    >
                      {skill}
                    </SiteLabel>
                  );
                })}
              </div>
            ) : (
              ""
            )}

            {/* job titles generator */}
            <InfoBox
              variant="hollow"
              size="extraSmall"
              aria="job titles"
              canAdd
              addClasses="flex"
              addClick={() => {
                addJobTitle();
              }}
            >
              <input
                type="jobTitle"
                placeholder="Job Titles For You"
                value={newJobTitle}
                name="jobTitle"
                className="text-md w-[98%] self-start bg-transparent text-midnight placeholder:text-jade/50 focus:outline-none"
                onChange={handleInputChange}
              />
            </InfoBox>
            {errors.jobTitles?.message && (
              <p className="m-0 -mt-4 p-0 text-xs font-medium text-orange">
                {errors.jobTitles.message.toString()}
              </p>
            )}
            {jobTitles.length >= 1 ? (
              <div className="SkillsContainer flex flex-wrap gap-2">
                {jobTitles.map((jobTitle, index) => {
                  return (
                    <SiteLabel
                      aria={jobTitle}
                      variant="functional"
                      key={index}
                      colorScheme={
                        secondaryColorArray[index % secondaryColorArray.length]
                      }
                      handleDelete={() => deleteJobTitle(jobTitle)}
                    >
                      {jobTitle}
                    </SiteLabel>
                  );
                })}
              </div>
            ) : (
              ""
            )}
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
