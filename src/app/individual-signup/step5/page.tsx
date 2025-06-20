"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useFellow } from "@/contexts/FellowContext";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useMutation } from "@apollo/client";
import { SAVE_PROFILE_PAGE_5_MUTATION } from "@/graphql/mutations";
import { usePageContext } from "@/contexts/PageContext";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import PopulateDisplayField from "@/components/informationDisplayComponents/populateDisplayField";
import AddHobbyModal from "@/components/modals/profilePopulationModals/addHobbyModal";
import AddBookOrQuoteModal from "@/components/modals/profilePopulationModals/addBookOrQuoteModal";
import InputComponent from "@/components/inputComponents/inputComponent";
import Avatar from "@/components/avatarComponent";
import DeleteHandler from "@/components/handlers/deleteHandler";
import UpdateHandler from "@/components/handlers/updateHandler";
import AddHandler from "@/components/handlers/addHandler";
import ButtonOptionsComponent from "@/components/buttonsAndLabels/buttonOptionsComponent";

const fellowSchema = z.object({
  hobbies: z.array(z.string()).optional(),
  bookOrQuote: z.array(z.string()).optional(),
  petDetails: z.string().optional(),
});

type FormData = z.infer<typeof fellowSchema>;

export default function IndividualSignupPage5() {
  const { fellow, setFellow } = useFellow();
  const { textColor } = useColorOptions();
  const { setCurrentPage } = usePageContext();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [hobbies, setHobbies] = useState<any[]>([]);
  const [bookOrQuote, setBookOrQuote] = useState<any[]>([]);
  const [petDetails, setPetDetails] = useState(
    fellow?.profile?.petDetails || "",
  );
  const [hobbyCounter, setHobbyCounter] = useState(1);
  const [bookOrQuoteCounter, setBookOrQuoteCounter] = useState(1);
  const [saveFellowProfilePage5, { loading, error }] = useMutation(
    SAVE_PROFILE_PAGE_5_MUTATION,
  );

  const {
    handleSubmit,
    setValue,
    register,
    clearErrors,
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
      hasId: { hobby: true, bookOrQuote: true },
      counterFunctions: {
        hobby: setHobbyCounter,
        bookOrQuote: setBookOrQuoteCounter,
      },
      counterDetails: {
        hobby: hobbyCounter,
        bookOrQuote: bookOrQuoteCounter,
      },
      setValue,
      clearErrors,
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
      hasId: { hobby: true, bookOrQuote: true },
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    try {
      const response = await saveFellowProfilePage5({
        variables: {
          hobbies: hobbies,
          bookOrQuote: bookOrQuote,
          petDetails: data.petDetails,
        },
      });
      console.log(
        "Details saved successfully, Details:",
        response.data.saveFellowProfilePage5,
      );

      setFellow({
        ...fellow,
        profile: {
          ...fellow?.profile,
          // profileIsBeingEdited: false,
          hobbies: hobbies,
          bookOrQuote: bookOrQuote,
          petDetails: data.petDetails,
        },
      });
      // if (fellow?.profileIsBeingEdited) {
      //   router.push("/profile");
      // } else {
      router.push("/individual-signup/step6");
      // }
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  // Setting Details on page from fellowContext
  useEffect(() => {
    setCurrentPage("5");

    setHobbies(
      Array.isArray(fellow?.profile?.hobbies) ? fellow.profile?.hobbies : [],
    );
    setBookOrQuote(
      Array.isArray(fellow?.profile?.bookOrQuote)
        ? fellow.profile?.bookOrQuote
        : [],
    );
  }, []);

  return (
    <div
      className={`IndividualSignupPage4 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8 ${textColor}`}
    >
      <div className="PopulateProfileContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="HeaderContainer flex justify-between">
          <h2 className="OptionalTitle text-lg">optional: human details</h2>
          <div className="AvatarContainer self-end pr-6">
            <Avatar
              addClasses="self-end -mt-14"
              avatarType="Fellow"
              avatar={fellow?.profile?.avatar}
            />
          </div>
        </div>

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

        {/* pet details input */}
        <InputComponent
          type="text"
          placeholderText="Are you a cat person or a dog person? Do you have any pets?"
          errors={errors.petDetails}
          register={register}
          registerValue="petDetails"
          defaultValue={fellow?.profile?.petDetails}
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
            {/* {disabledButton && fellow?.profileIsBeingEdited === true
              ? "Returning To Profile..."
              : !disabledButton && fellow?.profileIsBeingEdited === true
                ? "update"
                : disabledButton && fellow?.profileIsBeingEdited === false
                  ? "Saving Information.."
                  : "continue"} */}

            {disabledButton ? "Saving Information..." : "continue"}
          </SiteButton>
        </div>
      </div>
    </div>
  );
}
