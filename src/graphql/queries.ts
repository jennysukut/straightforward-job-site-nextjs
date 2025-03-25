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

// OTHER FIELDS WE NEED FOR PROFILE

// avatar
// experience
// education
// awards
// experienceLevels
// accomplishments
// passions
// lookingFor
// locationOptions
// hobbies
// bookOrQuote
// petDetails
// links
// aboutMe
