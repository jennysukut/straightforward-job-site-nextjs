import { gql } from "@apollo/client";

export const GET_MY_PROFILE = gql`
  query GetMyProfile {
    getMyProfile {
      id
      roles
      business {
        id
        name
        businessProfile {
          smallBio
          country
          location
          website
          avatar
          businessField
          missionVision
          moreAboutBusiness
        }
      }
      fellow {
        id
        name
        profile {
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
          avatar
          name
        }
        savedJobs {
          id
        }
        jobApplications {
          id
          message
          status
        }
        dailyApplications {
          id
          message
          status
        }
      }
    }
  }
`;

export const GET_PROFILE = gql`
  query GetFellowProfile($id: ID!) {
    fellow(id: $id) {
      id
      name
      profile {
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
        avatar
        name
      }
      savedJobs {
        id
      }
      jobApplications {
        id
        message
        status
      }
      dailyApplications {
        id
        message
        status
      }
    }
  }
`;

export const GET_BUSINESS_PROFILE = gql`
  query GetBusinessProfile($id: ID!) {
    business(id: $id) {
      id
      name
      businessProfile {
        smallBio
        country
        location
        website
        avatar
        businessField
        missionVision
        moreAboutBusiness
      }
    }
  }
`;

export const GET_JOB_LISTINGS = gql`
  query GetJobListings(
    $businessId: ID
    $isSaved: Boolean
    $experienceLevel: [String!]
    $locationOption: [String!]
    $positionType: [String!]
    $country: String
  ) {
    jobListings(
      businessId: $businessId
      isSaved: $isSaved
      experienceLevel: $experienceLevel
      locationOption: $locationOption
      positionType: $positionType
      country: $country
    ) {
      id
      jobTitle
      positionType
      positionSummary
      nonNegParams
      payscaleMin
      payscaleMax
      payOption
      locationOption
      idealCandidate
      daysInOffice
      daysRemote
      experienceLevel
      preferredSkills
      moreAboutPosition
      responsibilities
      perks
      saved
      interviewProcess {
        id
        stage
        step
        details
      }
      business {
        id
        name
        businessProfile {
          country
          location
        }
      }
    }
  }
`;

export const GET_JOB_LISTING_BY_ID = gql`
  query GetJobListingById($id: ID!) {
    jobListing(id: $id) {
      id
      jobTitle
      positionType
      positionSummary
      nonNegParams
      payscaleMin
      payscaleMax
      payOption
      locationOption
      idealCandidate
      daysInOffice
      daysRemote
      experienceLevel
      preferredSkills
      moreAboutPosition
      responsibilities
      perks
      saved
      interviewProcess {
        id
        stage
        step
        details
      }
      business {
        id
        name
        businessProfile {
          country
          location
        }
      }
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
