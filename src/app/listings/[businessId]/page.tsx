"use client";

import { useEffect, useState } from "react";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useFellow } from "@/contexts/FellowContext";
import { useModal } from "@/contexts/ModalContext";
import { usePageContext } from "@/contexts/PageContext";
import { useQuery } from "@apollo/client";
import { GET_JOB_LISTINGS } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import { SAVE_JOB } from "@/graphql/mutations";

import Link from "next/link";
import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
import JobPost from "@/components/jobBoardComponents/jobPostComponent";
import BouncingDotsLoader from "@/components/loader";

export default function IndividualBusinessListings({ params }: any) {
  const { fellow, setFellow } = useFellow();
  const { textColor } = useColorOptions();
  const { hideModal } = useModal();
  const { setCurrentPage } = usePageContext();

  const [colorArray, setColorArray] = useState<[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [businessName, setBusinessName] = useState("");
  const [saveJob, { loading, error }] = useMutation(SAVE_JOB);

  const {
    loading: queryLoading,
    error: queryError,
    data: { jobListings: jobListingsArray = [] } = {},
  } = useQuery(GET_JOB_LISTINGS, {
    variables: { businessId: params.businessId },
    onCompleted: (data) => {
      setLoadingData(false);
      setBusinessName(data.jobListings[0].business.name);
    },
  });

  // make this saveClick function call the like-job thing
  const saveClick = async (id: any) => {
    try {
      const result = await saveJob({ variables: { jobId: id } });

      // console.log(result);
    } catch (err) {
      // console.log(err);
    }
    // if (fellow?.savedJobs?.includes(jobId)) {
    //   setFellow({
    //     ...fellow,
    //     savedJobs: fellow.savedJobs.filter((id) => id !== jobId),
    //   });
    // } else {
    //   setFellow({
    //     ...fellow,
    //     savedJobs: [...(fellow?.savedJobs || []), jobId],
    //   });
    // }
    // hideModal();
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
    setCurrentPage("saved");
  }, [setCurrentPage]);

  return (
    <div
      className={`SavedJobsPage flex flex-grow flex-col items-center gap-8 md:pb-12 ${textColor} w-[84%] max-w-[1600px] gap-8 self-center`}
    >
      {loadingData ? (
        //make loading screen design here
        <div className="LoadingScreen flex h-[80vh] justify-center align-middle">
          <BouncingDotsLoader />
          {/* <div className="LoadingText text-center text-olive">Loading...</div> */}
        </div>
      ) : (
        <div className="SavedJobsContainer flex w-full flex-col">
          <h1 className="SavedJobsTitle mb-2 mr-20 self-start">
            {`${businessName}'s` || `This Business's`} Open Jobs:
          </h1>
          <div className="JobListings mt-8 flex flex-wrap items-center justify-center gap-8 self-center align-middle">
            {jobListingsArray.length === 0 && (
              <div className="noSavedJobsContainer mt-24 max-w-[50vw] text-center italic text-olive">
                <h2 className="NoSavedJobs">
                  {`This business doesn't have any open jobs at the moment.`}
                </h2>
              </div>
            )}

            {jobListingsArray?.map((job: any, index: number) => (
              <JobPost
                job={job}
                index={index}
                colorArray={colorArray}
                key={job.id}
                saveClick={() => saveClick(job.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
