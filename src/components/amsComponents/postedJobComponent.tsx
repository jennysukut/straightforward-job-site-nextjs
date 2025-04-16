"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { capitalizeFirstLetter } from "@/utils/textUtils";
import { JobAMSNotificationButton } from "../buttonsAndLabels/notificationButton";
import SiteButton from "../buttonsAndLabels/siteButton";
import InfoBox from "../informationDisplayComponents/infoBox";
import Image from "next/image";

interface PostedJobComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  colorArray: Array<string>;
  index: any;
  job: any;
}

const PostedJobComponent = React.memo(
  ({ id, colorArray, index, job }: PostedJobComponentProps) => {
    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);
    const [notification, setNotification] = useState("");

    const isUnpublished = job.published === false;

    // Memoize the job properties
    const selectedJob = useMemo(() => job, [job]);
    const appNumbers = useMemo(
      () => (job?.applications === null ? 0 : job?.applications?.length || 0),
      [job?.applications],
    );

    // Callback for button click
    const buttonClick = useCallback(() => {
      setIsClicked(!isClicked);
      const route = isUnpublished ? `/listing/${id}` : `/ams/${id}`;
      router.push(route);
    }, [isClicked, isUnpublished, id, router]);

    // Process applications and set notifications
    useEffect(() => {
      let newNotification = "";
      let viewedApplicationsCount = 0;
      let interviewCount = 0;

      if (job?.applications) {
        job.applications.forEach((app: any) => {
          if (app.status !== "submitted") {
            viewedApplicationsCount++;
          } else {
            newNotification = "unopened applications";
          }

          if (app?.appointments?.length > 0) {
            interviewCount = app.appointments.length;
            newNotification = "new appointment";
          }
        });
      }

      if (isUnpublished) {
        newNotification = "this listing is unpublished";
      }

      setNotification(newNotification);
    }, [job, isUnpublished]);

    const memoizedButtonColorScheme = useMemo(
      () => colorArray[index % colorArray.length] as ButtonColorOption,
      [colorArray, index],
    );

    return (
      <div className="PostedJob flex flex-col gap-4" key={id}>
        <InfoBox
          aria="JobListing"
          variant="filled"
          colorScheme={memoizedButtonColorScheme}
          size="jobListing"
        >
          <div className="AppInfo mb-4 flex flex-col justify-between gap-2 text-center">
            <div className="AppLimitInfo -mt-4 ml-2 flex items-start justify-between pb-8">
              <div className="AppLimit -ml-4 text-xs font-medium italic">
                {appNumbers}/{selectedJob?.applicationLimit || "?"} apps
              </div>
              {notification !== "" && (
                <JobAMSNotificationButton
                  colorScheme={memoizedButtonColorScheme}
                  message={notification}
                />
              )}
            </div>
            <h1 className="Title">{`${selectedJob?.jobTitle}`}</h1>
            <p className="ExperienceLevel text-md font-normal italic">
              {capitalizeFirstLetter(
                selectedJob?.experienceLevel?.[0] || "junior",
              )}{" "}
              {selectedJob?.experienceLevel?.[0] !== "entry-level"
                ? "Level"
                : ""}
            </p>
            {/* divider */}
            <Image
              src="/listing-divider.svg"
              alt="listingDivider"
              width={300}
              height={0}
              className="my-8 self-center opacity-80"
            />
            <div className="OtherDetails flex flex-col gap-2 align-middle">
              <p className="ApplicationDetails self-center text-sm">
                {appNumbers} applications
              </p>
              <p className="ReviewDetails text-sm">
                {selectedJob?.applications?.filter(
                  (app: any) => app.status !== "submitted",
                ).length || 0}{" "}
                reviewed |{" "}
                {selectedJob?.applications?.reduce(
                  (count: number, app: any) =>
                    count + (app?.appointments?.length || 0),
                  0,
                ) || ""}{" "}
                {(selectedJob?.applications?.reduce(
                  (count: number, app: any) =>
                    count + (app?.appointments?.length || 0),
                  0,
                ) ?? 0) > 1
                  ? "interviews"
                  : (selectedJob?.applications?.reduce(
                        (count: number, app: any) =>
                          count + (app?.appointments?.length || 0),
                        0,
                      ) ?? 0) < 1
                    ? "no interview"
                    : "interview"}{" "}
                set
              </p>
            </div>
          </div>
        </InfoBox>
        <div className="ManageButton mt-1 flex w-[100%] justify-end">
          <SiteButton
            aria="manageListing"
            variant="filled"
            colorScheme={memoizedButtonColorScheme}
            onClick={buttonClick}
            addClasses="px-8 py-3"
            isSelected={isClicked}
          >
            {isUnpublished
              ? "finish listing | manage job post"
              : "view applications | manage listing"}
          </SiteButton>
        </div>
      </div>
    );
  },
);

// Add display name for better debugging
PostedJobComponent.displayName = "PostedJobComponent";

export default PostedJobComponent;
