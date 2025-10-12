import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";
import { useApplications } from "@/contexts/ApplicationsContext";
import { rejectionOptions } from "@/lib/rejectionOptions";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { REJECT_APPLICATION } from "@/graphql/mutations";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import RejectionOptionsModal from "./rejectionOptionsModal";
import { reject } from "lodash";

type RejectionOptionKey = keyof typeof rejectionOptions;

export default function RejectionStep1Modal({ application }: any) {
  const { showModal, goBack, hideModal } = useModal();
  const { applications, setApplications } = useApplications();
  const [applicantInfo, setApplicantInfo] = useState({
    firstName: "FirstName",
    jobTitle: "JobTitle",
    businessName: "BusinessName",
  });
  const [rejectApp, { loading, error }] = useMutation(REJECT_APPLICATION);

  const generateRejectionMessages = (
    optionKey: keyof typeof rejectionOptions,
    applicantInfo: {
      firstName: string;
      jobTitle: string;
      businessName: string;
    },
  ) => {
    const option = rejectionOptions[optionKey];
    return option.message({
      firstName: applicantInfo.firstName,
      jobTitle: applicantInfo.jobTitle,
      businessName: applicantInfo.businessName,
    });
  };

  const sendBasicRejection = async () => {
    //send a message from this business using the template text
    //update application to appStatus "closed"
    const rejectionMessage = generateRejectionMessages("basic", applicantInfo);

    try {
      const response = await rejectApp({
        variables: {
          appId: application.id,
          rejectionMessage: rejectionMessage,
          // rejectionDetails:
        },
      });

      // console.log(
      //   "Details updated successfully, Details:",
      //   response.data.rejectApp,
      // );

      // console.log(
      //   "sending a basic rejection message & closing app: ",
      //   application,
      // );

      // send the basic rejection message here?

      // const message = {
      //   id: 127836742634,
      //   text: rejectionMessage,
      //   sender: "business",
      //   date: `${new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit" })}`,
      //   timestamp: `${new Date().toLocaleTimeString([], {
      //     hour: "2-digit",
      //     minute: "2-digit",
      //   })}`,
      //   edited: false,
      //   read: false,
      // };

      // const index: number =
      //   applications?.findIndex((app: any) => app.id === application?.id) ?? -1;

      // setApplications(
      //   applications?.map((app) =>
      //     app.id === application.id
      //       ? {
      //           ...app,
      //           appStatus: "closed",
      //           appIsBeingRejected: true,
      //           rejectionMessage: "basic",
      //           mail: [...(applications?.[index]?.mail || []), message],
      //         }
      //       : app,
      //   ) || [],
      // );
      hideModal();
    } catch (error) {
      console.error("delete error:", error);
    }
  };

  useEffect(() => {
    //set applicationInfo here
    setApplicantInfo({
      firstName: "Jenny",
      jobTitle: "This Job",
      businessName: application.business,
    });
  }, []);

  return (
    <div className="SetAppStatusModal flex w-[350px] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {`Non-Specific Rejection`}
      </Dialog.Title>
      <p className="Details text-center text-sm text-olive">
        {`We have a few options for general rejections. Would you like us to send our favorite or would you like to take a look at some options? `}{" "}
      </p>
      <div className="Buttons mt-4 flex flex-col items-center gap-4">
        <SiteButton
          variant="hollow"
          addClasses="w-[250px]"
          colorScheme="d2"
          aria="basicMessage"
          onClick={sendBasicRejection}
        >
          send a basic message
        </SiteButton>
        <SiteButton
          variant="hollow"
          colorScheme="c6"
          aria="options"
          addClasses="w-[250px]"
          onClick={() =>
            showModal(<RejectionOptionsModal application={application} />)
          }
        >
          look at options{" "}
        </SiteButton>
      </div>
    </div>
  );
}
