"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useFellow } from "@/contexts/FellowContext";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import Image from "next/image";
import SiteButton from "@/components/siteButton";
import InfoBox from "@/components/infoBox";
import PopulateDisplayField from "@/components/populateDisplayField";
import AddHobbyModal from "@/components/modals/profilePopulationModals/addHobbyModal";
import AddBookOrQuoteModal from "@/components/modals/profilePopulationModals/addBookOrQuoteModal";

const fellowSchema = z.object({
  passions: z.string().min(2).optional(),
  lookingFor: z.string().min(2).optional(),
  hobbies: z.array(z.string()).optional(),
  bookOrQuote: z.array(z.string()).optional(),
  petDetails: z.string().optional(),
});

type FormData = z.infer<typeof fellowSchema>;

export default function IndividualSignupPage4() {
  const { fellow, setFellow } = useFellow();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [passions, setPassions] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [hobbies, setHobbies] = useState<any[]>([]);
  const [bookOrQuote, setBookOrQuote] = useState<any[]>([]);
  const [petDetails, setPetDetails] = useState("");
  const [hobbyCounter, setHobbyCounter] = useState(1);
  const [bookOrQuoteCounter, setBookOrQuoteCounter] = useState(1);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fellowSchema),
    defaultValues: {},
  });

  // handlers for adding, updating, and deleting details
  const handleAdd = (type: "hobby" | "bookOrQuote", data: any) => {
    const newData = {
      ...data,
      id: type === "hobby" ? hobbyCounter : bookOrQuoteCounter,
    };
    if (type === "hobby") {
      setHobbyCounter((prev) => prev + 1);
      setHobbies((prevHobbies) => [...prevHobbies, newData]);
    } else {
      setBookOrQuoteCounter((prev) => prev + 1);
      setBookOrQuote((prevBookOrQuote) => [...prevBookOrQuote, newData]);
    }
  };

  const handleUpdate = (
    type: "hobby" | "bookOrQuote",
    updatedData: any,
    id: any,
  ) => {
    if (type === "hobby") {
      setHobbies((prevHobbies) =>
        prevHobbies.map((hobby) =>
          hobby.id === id ? { ...hobby, ...updatedData } : hobby,
        ),
      );
    } else if (type === "bookOrQuote") {
      setBookOrQuote((prevBookOrQuote) =>
        prevBookOrQuote.map((bookOrQuote) =>
          bookOrQuote.id === id
            ? { ...bookOrQuote, ...updatedData }
            : bookOrQuote,
        ),
      );
    }
  };

  const handleDelete = (type: "hobby" | "bookOrQuote", id: any) => {
    if (type === "hobby") {
      setHobbies((prevHobbies) =>
        prevHobbies.filter((hobby) => hobby.id !== id),
      );
    } else if (type === "bookOrQuote") {
      setBookOrQuote((prevBookOrQuote) =>
        prevBookOrQuote.filter((bookOrQuote) => bookOrQuote.id !== id),
      );
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    setFellow({
      ...fellow,
      passions: passions,
      lookingFor: lookingFor,
      hobbies: hobbies,
      bookOrQuote: bookOrQuote,
      petDetails: petDetails,
    });
    router.push("/individual-signup/step5");
  };

  // Setting Details on page from fellowContext
  useEffect(() => {
    setPassions(fellow?.passions || "");
    setLookingFor(fellow?.lookingFor || "");
    setHobbies(Array.isArray(fellow?.hobbies) ? fellow.hobbies : []);
    setBookOrQuote(
      Array.isArray(fellow?.bookOrQuote) ? fellow.bookOrQuote : [],
    );
    setPetDetails(fellow?.petDetails || "");
  }, []);

  return (
    <div className="IndividualSignupPage4 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="PopulateProfileContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="HeaderContainer flex justify-between">
          <h2 className="OptionalTitle text-lg text-jade">
            optional: personal + human details
          </h2>
          <Image
            className="AvatarImage -mt-14 justify-end self-end drop-shadow-lime"
            src="/avatars/orange-floral.svg"
            width={75}
            height={75}
            alt="avatar"
          />
        </div>

        {/*  passionate about input */}
        <InfoBox
          variant="hollow"
          size="extraSmall"
          width="extraWide"
          aria="passionateAbout"
          addClasses="w-full"
        >
          <input
            type="text"
            value={passions}
            placeholder="What are you passionate about?"
            className="text-md w-full bg-transparent text-midnight placeholder:text-jade focus:outline-none"
            onChange={(e) => {
              const value = e.target.value;
              setPassions(value);
              setValue("passions", value);
            }}
          />
        </InfoBox>
        {errors.passions?.message && (
          <p className="m-0 -mt-4 p-0 text-xs font-medium text-orange">
            {errors.passions.message.toString()}
          </p>
        )}

        {/*  looking for input */}
        <InfoBox
          variant="hollow"
          size="extraSmall"
          width="extraWide"
          aria="lookingFor"
          addClasses="w-full"
        >
          <input
            type="text"
            value={lookingFor}
            placeholder="What are you looking for in a job / company?"
            className="text-md w-full bg-transparent text-midnight placeholder:text-jade focus:outline-none"
            onChange={(e) => {
              const value = e.target.value;
              setLookingFor(value);
              setValue("lookingFor", value);
            }}
          />
        </InfoBox>
        {errors.lookingFor?.message && (
          <p className="m-0 -mt-4 p-0 text-xs font-medium text-orange">
            {errors.lookingFor.message.toString()}
          </p>
        )}

        {/* Add + Display Hobbies */}
        <PopulateDisplayField
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          title={`Your Hobbies`}
          aria="hobbiesInfo"
          addModal={<AddHobbyModal />}
          selectedArray={hobbies}
          displayOption1="hobbyTitle"
        />

        {/* Add + Display Book or Quote */}
        <PopulateDisplayField
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          title={`Your Favorite Books / Quotes`}
          aria="bookOrQuote"
          addModal={<AddBookOrQuoteModal />}
          selectedArray={bookOrQuote}
          displayOption1="bookOrQuote"
          displayOption2="author"
          displayPunct=" - "
        />

        {/*  pet details  input */}
        <InfoBox
          variant="hollow"
          size="extraSmall"
          width="extraWide"
          aria="petDetails"
          addClasses="w-full"
        >
          <input
            type="text"
            value={petDetails}
            placeholder="Are you a cat person or a dog person? Do you have any pets?"
            className="text-md w-full bg-transparent text-midnight placeholder:text-jade focus:outline-none"
            onChange={(e) => {
              const value = e.target.value;
              setPetDetails(value);
              setValue("petDetails", value);
            }}
          />
        </InfoBox>
        {errors.petDetails?.message && (
          <p className="m-0 -mt-4 p-0 text-xs font-medium text-orange">
            {errors.petDetails.message.toString()}
          </p>
        )}

        <div className="ButtonContainer -mb-6 mt-6 flex justify-end self-end">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={disabledButton}
          >
            {disabledButton ? "Continuing..." : "continue"}
          </SiteButton>
        </div>
      </div>
    </div>
  );
}
