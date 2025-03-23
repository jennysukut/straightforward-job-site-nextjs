import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetFellowProfile($id: ID!) {
    fellowProfile(id: $id) {
      smallBio
      location
      country
      languages
      skills
      jobTitles
    }
  }
`;
