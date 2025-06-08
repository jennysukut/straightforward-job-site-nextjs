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
        jobApplications {
          id
          message
          status
          createdAt
          jobListing {
            id
            jobTitle
            positionType
            positionSummary
            nonNegParams
            payscaleMin
            payscaleMax
            payOption
            locationOption
            city
            state
            experienceLevel
            business {
              id
              name
            }
          }
        }
        dailyApplications {
          id
          message
          status
        }
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
        createdAt
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
    $isPublished: Boolean
    $searchbar: String
  ) {
    jobListings(
      businessId: $businessId
      isSaved: $isSaved
      experienceLevel: $experienceLevel
      locationOption: $locationOption
      positionType: $positionType
      country: $country
      isPublished: $isPublished
      searchbar: $searchbar
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
      completed
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
      published
      beingEdited
      completed
      city
      state
      applications {
        id
        createdAt
        message
        status
        fellow {
          id
          name
        }
        conversation {
          id
          messages {
            id
            text
            createdAt
            deliveredAt
            seenAt
          }
        }
      }
      applicationLimit
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
      completed
      published
      city
      state
      applicationLimit
      applications {
        id
        createdAt
        message
        status
        notes {
          id
          note
          madeByBusiness
          madeByFellow
        }
        fellow {
          id
          name
          profile {
            smallBio
          }
        }
        appIsBeingRejected
        rejectionMessage
        rejectionDetails
        highlighted
        jobOfferBeingSent
      }
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

export const GET_APPLICATION_BY_ID = gql`
  query getApplication($id: ID!) {
    getApplication(id: $id) {
      id
      createdAt
      message
      status
      jobListing {
        id
        jobTitle
      }

      notes {
        id
        note
        madeByBusiness
        madeByFellow
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
      }
      appIsBeingRejected
      rejectionMessage
      rejectionDetails
      highlighted
      jobOfferBeingSent
      conversation {
        id
      }
    }
  }
`;

export const GET_CONVERSATION_BY_ID = gql`
  query getConversation($id: ID!) {
    getConversation(id: $id) {
      id
      messages {
        id
        createdAt
        deliveredAt
        seenAt
        text
        fromBusiness
      }
      jobApplication {
        id
        status
        createdAt
        fellow {
          id
          name
        }
        jobListing {
          id
          jobTitle
          business {
            id
            name
          }
        }
      }
    }
  }
`;
