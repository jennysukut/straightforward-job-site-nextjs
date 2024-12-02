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
import PopulateDisplayField from "@/components/populateDisplayField";
import AddHobbyModal from "@/components/modals/profilePopulationModals/addHobbyModal";
import AddBookOrQuoteModal from "@/components/modals/profilePopulationModals/addBookOrQuoteModal";
import InputComponent from "@/components/inputComponent";
import Avatar from "@/components/avatarComponent";
import DeleteHandler from "@/components/deleteHandler";
import UpdateHandler from "@/components/updateHandler";
import AddHandler from "@/components/addHandler";

const fellowSchema = z.object({
  passions: z.string().optional(),
  lookingFor: z.string().optional(),
  hobbies: z.array(z.string()).optional(),
  bookOrQuote: z.array(z.string()).optional(),
  petDetails: z.string().optional(),
});

type FormData = z.infer<typeof fellowSchema>;

export default function IndividualSignupPage4() {
  const { fellow, setFellow } = useFellow();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [passions, setPassions] = useState(fellow?.passions || "");
  const [lookingFor, setLookingFor] = useState(fellow?.lookingFor || "");
  const [hobbies, setHobbies] = useState<any[]>([]);
  const [bookOrQuote, setBookOrQuote] = useState<any[]>([]);
  const [petDetails, setPetDetails] = useState(fellow?.petDetails || "");
  const [hobbyCounter, setHobbyCounter] = useState(1);
  const [bookOrQuoteCounter, setBookOrQuoteCounter] = useState(1);

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fellowSchema),
    defaultValues: {},
  });

  // handlers for adding, updating, and deleting details
  const handleAdd = (type: "hobby" | "bookOrQuote", data: any) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        hobby: setHobbies,
        bookOrQuote: setBookOrQuote,
      },
      hasId: true,
      counterFunctions: {
        hobby: setHobbyCounter,
        bookOrQuote: setBookOrQuoteCounter,
      },
      counterDetails: {
        hobby: hobbyCounter,
        bookOrQuote: bookOrQuoteCounter,
      },
    });
  };

  const handleUpdate = (
    type: "hobby" | "bookOrQuote",
    updatedData: any,
    id: any,
  ) => {
    UpdateHandler({
      item: id,
      updatedData,
      type,
      setFunctions: {
        hobby: setHobbies,
        bookOrQuote: setBookOrQuote,
      },
    });
  };

  const handleDelete = (type: "hobby" | "bookOrQuote", id: any) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        hobby: setHobbies,
        bookOrQuote: setBookOrQuote,
      },
      hasId: true,
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    setFellow({
      ...fellow,
      passions: data.passions,
      lookingFor: data.lookingFor,
      hobbies: hobbies,
      bookOrQuote: bookOrQuote,
      petDetails: data.petDetails,
    });
    router.push("/individual-signup/step5");
  };

  // Setting Details on page from fellowContext
  useEffect(() => {
    setHobbies(Array.isArray(fellow?.hobbies) ? fellow.hobbies : []);
    setBookOrQuote(
      Array.isArray(fellow?.bookOrQuote) ? fellow.bookOrQuote : [],
    );
  }, []);

  return (
    <div className="IndividualSignupPage4 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="PopulateProfileContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="HeaderContainer flex justify-between">
          <h2 className="OptionalTitle text-lg text-jade">
            optional: personal + human details
          </h2>
          <Avatar />
        </div>

        {/*  looking for input */}
        <InputComponent
          type="text"
          placeholderText="What are you looking for in a job / company?"
          errors={errors.lookingFor}
          register={register}
          registerValue="lookingFor"
          defaultValue={fellow?.lookingFor}
          width="full"
          size="medium"
        />

        {/* Add + Display Hobbies */}
        <PopulateDisplayField
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          title={`Your Hobbies / Pastimes`}
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
          title={`Some Books / Quotes You Enjoy`}
          aria="bookOrQuote"
          addModal={<AddBookOrQuoteModal />}
          selectedArray={bookOrQuote}
          displayOption1="bookOrQuote"
          displayOption2="author"
          displayPunct=" - "
        />

        {/* passionate-about input */}
        <InputComponent
          type="text"
          placeholderText="What are you passionate about?"
          errors={errors.passions}
          register={register}
          registerValue="passions"
          defaultValue={fellow?.passions}
          size="medium"
          width="full"
        />

        {/* pet details input */}
        <InputComponent
          type="text"
          placeholderText="Are you a cat person or a dog person? Do you have any pets?"
          errors={errors.petDetails}
          register={register}
          registerValue="petDetails"
          defaultValue={fellow?.petDetails}
          width="full"
        />

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
