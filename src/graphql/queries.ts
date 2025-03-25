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
      experience {
        id
        title
        companyName
        yearDetails
        details
      }
      education {
        id
        degree
        school
        fieldOfStudy
      }
      awards {
        id
        awardTitle
        givenBy
        awardDetails
      }

      experienceLevels {
        id
        experienceLevel
        expLevelSkill
        skillYears
      }
      accomplishments {
        id
        accTitle
        accDetails
      }
      passions
      lookingFor
      locationOptions
      hobbies {
        id
        hobbyTitle
        howLong
      }
      bookOrQuote {
        id
        bookOrQuote
        author
      }
      petDetails
      links {
        id
        linkType
        link
      }
      aboutMe
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
