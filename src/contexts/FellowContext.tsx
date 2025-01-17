"use client";

import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  useState,
} from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_FELLOW_PROFILE, SAVE_PROFILE_MUTATION } from "@/graphql/mutations";

export interface Fellow {
  id?: string;
  name?: string;
  email?: string;
  smallBio?: string;
  country?: string;
  location?: string;
  skills?: Array<string>;
  jobTitles?: Array<string>;
  experience?: Record<string, any>;
  education?: Record<string, any>;
  awards?: Record<string, any>;
  experienceLevels?: Record<string, any>;
  accomplishments?: Record<string, any>;
  passions?: string;
  lookingFor?: string;
  hobbies?: Array<any>;
  bookOrQuote?: Array<any>;
  petDetails?: string;
  links?: Array<any>;
  aboutMe?: string;
  avatar?: any;
  shadow?: any;
  locationOptions?: Array<string>;
  colorScheme?: string;
  languages?: Array<string>;
  buttonShadow?: any;
  buttonImg?: any;
  profileIsBeingEdited?: boolean;
  addMoreInfo?: boolean;
  subscriptionAmount?: any;
  savedJobs?: Array<any>;
  dailyApplications?: Record<string, any>;
}

interface FellowContextType {
  fellow: Fellow | null;
  loading: boolean;
  error: any;
  setFellow: (fellow: Fellow) => void;
  dailyLimit: DailyLimit | null;
  setDailyLimit: (type: any) => void;
}

//DATA FOR HANDLING DAILY APPLICATION LIMIT
interface DailyLimit {
  count: number;
  lastReset: string;
}

const shouldResetDaily = (lastResetDate: string): boolean => {
  const lastReset = new Date(lastResetDate);
  const now = new Date();
  // Reset if it's a different day
  return lastReset.toDateString() !== now.toDateString();
};

const handleDailyLimit = (currentLimit: DailyLimit): DailyLimit => {
  if (shouldResetDaily(currentLimit.lastReset)) {
    // It's a new day, reset the count
    return {
      count: 0,
      lastReset: new Date().toISOString(),
    };
  }
  return currentLimit;
};

const FellowContext = createContext<FellowContextType | undefined>(undefined);

export const FellowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const localFellowRef = useRef<Fellow | null>({});

  const [dailyLimit, setDailyLimit] = useState<DailyLimit>({
    count: 0,
    lastReset: new Date().toISOString(),
  });

  // Fetch fellow data using Apollo's useQuery hook
  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_FELLOW_PROFILE, {
    onCompleted: (data) => {
      localFellowRef.current = data.fellowProfile;
      console.log(JSON.stringify(localFellowRef.current));
    },
  });

  // Mutation for updating fellow data
  const [
    updateFellow,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(SAVE_PROFILE_MUTATION, {
    onCompleted: (data) => {
      localFellowRef.current = data.saveProfile;
      console.log(JSON.stringify(localFellowRef.current));
    },
    ignoreResults: false,
  });

  // Set fellow function to trigger mutation
  const setFellow = (fellow: Fellow) => {
    localFellowRef.current = fellow;
    updateFellow({
      variables: { requestBody: fellow },
      update: (cache) => {
        cache.writeQuery({
          query: GET_FELLOW_PROFILE,
          data: { fellow },
        });
      },
    });
  };

  const getFellow = () =>
    localFellowRef.current ||
    mutationData?.saveProfile ||
    queryData?.fellowProfile ||
    null;

  return (
    <FellowContext.Provider
      value={{
        fellow: getFellow(),
        loading: mutationLoading || queryLoading,
        error: mutationError || queryError,
        setFellow,
        dailyLimit,
        setDailyLimit,
      }}
    >
      {children}
    </FellowContext.Provider>
  );
};

export const useFellow = () => {
  const context = useContext(FellowContext);
  if (!context) {
    throw new Error("useFellow must be used within a FellowProvider");
  }
  return context;
};
