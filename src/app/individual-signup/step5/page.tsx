"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useFellow } from "@/contexts/FellowContext";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import Image from "next/image";
import InfoBox from "@/components/infoBox";
import SiteButton from "@/components/siteButton";
import PopulateDisplayField from "@/components/populateDisplayField";
import AddLinkModal from "@/components/modals/profilePopulationModals/addLinkModal";

const fellowSchema = z.object({
  links: z.array(z.string()).optional(),
  aboutMe: z.string().optional(),
});

type FormData = z.infer<typeof fellowSchema>;

export default function IndividualSignupPage4() {
  const { showModal } = useModal();
  const { fellow, setFellow } = useFellow();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [links, setLinks] = useState<any[]>([]);
  const [linkCounter, setLinkCounter] = useState(1);
  const [aboutMe, setAboutMe] = useState("");

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fellowSchema),
  });

  // handlers for adding, updating, and deleting details
  const handleAdd = (data: any) => {
    const newData = {
      ...data,
      id: linkCounter,
    };
    setLinkCounter((prev) => prev + 1);
    setLinks((prevLinks) => [...prevLinks, newData]);
  };

  const handleUpdate = (updatedData: any, id: any) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, ...updatedData } : link,
      ),
    );
  };

  const handleDelete = (id: any) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    setFellow({
      ...fellow,
      links: links,
      aboutMe: aboutMe,
    });
    router.push("/individual-signup/step4");
  };

  // Setting Details on page from fellowContext
  useEffect(() => {
    setLinks(Array.isArray(fellow?.links) ? fellow.links : []);
    setAboutMe(fellow?.aboutMe || "");
  }, []);

  return (
    <div className="IndividualSignupPage5 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="PopulateProfileContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="HeaderContainer flex justify-between">
          <h2 className="OptionalTitle text-lg text-jade">
            optional: links + more about you
          </h2>
          <Image
            className="AvatarImage -mt-14 justify-end self-end drop-shadow-lime"
            src="/avatars/orange-floral.svg"
            width={75}
            height={75}
            alt="avatar"
          />
        </div>

        {/* Add + Display Links */}
        <PopulateDisplayField
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          title={`Your Portfolio / Website / Social Media Links`}
          aria="linksInfo"
          addModal={<AddLinkModal />}
          selectedArray={links}
          displayOption1="linkType"
          displayOption2="link"
          displayPunct=":"
        />

        {/*  more about me input */}
        <InfoBox
          variant="hollow"
          size="extraSmall"
          width="extraWide"
          aria="moreAboutMe"
          addClasses="w-full"
        >
          <input
            type="text"
            value={aboutMe}
            placeholder="More about you..."
            className="text-md w-full text-wrap bg-transparent text-midnight placeholder:text-jade focus:outline-none"
            onChange={(e) => {
              const value = e.target.value;
              setAboutMe(value);
              setValue("aboutMe", value);
            }}
          />
        </InfoBox>
        {errors.aboutMe?.message && (
          <p className="m-0 -mt-4 p-0 text-xs font-medium text-orange">
            {errors.aboutMe.message.toString()}
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
