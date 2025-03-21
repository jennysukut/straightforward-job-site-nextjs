import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetFellowProfile {
    fellowProfile {
      smallBio
      location
      country
      languages
      skills
      jobTitles
    }
  }
`;
