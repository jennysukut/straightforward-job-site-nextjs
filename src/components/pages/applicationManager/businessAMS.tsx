"use client";

import { useEffect, useState } from "react";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useModal } from "@/contexts/ModalContext";
import { Job } from "@/contexts/JobContext";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/contexts/BusinessContext";
import { JobListing, useJobListings } from "@/contexts/JobListingsContext";
import { useQuery } from "@apollo/client";
import { GET_JOB_LISTINGS } from "@/graphql/queries";

import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
import PostedJobComponent from "@/components/amsComponents/postedJobComponent";

export default function BusinessAMS() {
  const { textColor } = useColorOptions();
  const { business } = useBusiness();

  const [loadingData, setLoadingData] = useState(true);
  const [colorArray, setColorArray] = useState<[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<string[]>([]);
  const [jobListings, setJobListings] = useState<[]>([]);

  const {
    loading: queryLoading,
    error: queryError,
    data: { jobListings: jobListingsArray = [] } = {},
  } = useQuery(GET_JOB_LISTINGS, {
    variables: { businessId: business?.id },
    skip: loadingData === false,
    onCompleted: (data) => {
      console.log(JSON.stringify(data));
      console.log("calling a query -", data);
      setJobListings(data.jobListings);
      setLoadingData(false);
    },
  });

  const renderJobs = () => {
    if (jobListings.length >= 1) {
      return jobListings?.map((job: any, index: number) => (
        <PostedJobComponent
          key={job.id}
          id={job.id}
          colorArray={colorArray}
          index={index}
          job={job}
        />
      ));
    }
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
  }, []);

  return (
    <div
      className={`FellowAMSPage flex w-[84%] gap-8 self-center ${textColor} max-w-[1600px]`}
    >
      {queryLoading ? (
        <div className="LoadingScreen flex h-[80vh] justify-center align-middle">
          <div className="LoadingText text-center text-olive">Loading...</div>
        </div>
      ) : (
        <div className="ApplicationList flex w-full flex-col gap-4">
          <div className="TitleDetails -mb-2 mr-14 text-right">
            <h1 className="AMSTitle">Your Job Listings</h1>
            <p className="Details font-semibold italic text-olive">
              Total Active Jobs: {jobListings.length}
            </p>
          </div>
          <div className="JobListings m-4 flex w-full flex-wrap items-center justify-center gap-14">
            {renderJobs()}
          </div>
        </div>
      )}
    </div>
  );
}

// "use client";

// import { useEffect, useState, useMemo } from "react";
// import { useColorOptions } from "@/lib/stylingData/colorOptions";
// import { useBusiness } from "@/contexts/BusinessContext";
// import { useQuery } from "@apollo/client";
// import { GET_JOB_LISTINGS } from "@/graphql/queries";

// import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
// import PostedJobComponent from "@/components/amsComponents/postedJobComponent";

// export default function BusinessAMS() {
//   const { textColor } = useColorOptions();
//   const { business } = useBusiness();

//   const [colorArray, setColorArray] = useState<[]>([]);
//   const [jobListings, setJobListings] = useState<[]>([]); // Local state

//   // Fetch once and then use local state
//   const { data, loading, error } = useQuery(GET_JOB_LISTINGS, {
//     variables: { businessId: business?.id },
//     skip: !business?.id,
//     fetchPolicy: "cache-first", // Load from cache first
//   });

//   // Initialize local state once when data arrives
//   useEffect(() => {
//     if (data?.jobListings) {
//       setJobListings(data.jobListings);
//     }
//   }, [data?.jobListings]);

//   // Shuffle colors once on mount
//   useEffect(() => {
//     ShuffleIdealButtonPattern(setColorArray);
//   }, []);

//   // Memoize colorArray
//   const memoizedColorArray = useMemo(() => colorArray, [colorArray]);

//   if (loading) {
//     return <div className="LoadingScreen">Loading...</div>;
//   }

//   if (error) {
//     return <div className="ErrorMessage">Error: {error.message}</div>;
//   }

//   return (
//     <div
//       className={`FellowAMSPage flex w-[84%] gap-8 self-center ${textColor}`}
//     >
//       <div className="ApplicationList flex w-full flex-col gap-4">
//         <div className="TitleDetails">
//           <h1>Your Job Listings</h1>
//           <p>Total Active Jobs: {jobListings.length}</p>
//         </div>
//         <div className="JobListings">
//           {jobListings.map((job: any, index: number) => (
//             <PostedJobComponent
//               key={job.id}
//               id={job.id}
//               colorArray={memoizedColorArray}
//               index={index}
//               job={job}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
