import { gql } from "@apollo/client";

// NEW MUTATIONS:
// do these signup mutations return success & message or simply an Id?

// LOGIN AND SIGNUP MUTATIONS
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

export const FELLOW_SIGNUP_MUTATION = gql`
  mutation signupFellow(
    $email: String!
    $password: String!
    $name: String!
    $isBetaTester: Boolean!
    $isCollaborator: Boolean!
    $message: String!
    $referralCode: String!
    $isReferralPartner: Boolean!
  ) {
    signupFellow(
      email: $email
      password: $password
      name: $name
      isBetaTester: $isBetaTester
      isCollaborator: $isCollaborator
      message: $message
      referralCode: $referralCode
      isReferralPartner: $isReferralPartner
    )
  }
`;

export const BUSINESS_SIGNUP_MUTATION = gql`
  mutation signupBusiness(
    $email: String!
    $password: String!
    $name: String!
    $isBetaTester: Boolean!
    $contactName: String!
    $isEarlySignup: Boolean
    $referral: String!
  ) {
    signupBusiness(
      email: $email
      password: $password
      name: $name
      isBetaTester: $isBetaTester
      contactName: $contactName
      isEarlySignup: $isEarlySignup
      referral: $referral
    )
  }
`;

// Here, we'll need to have the avatar sent to the database as well
export const SAVE_PROFILE_PAGE_1_MUTATION = gql`
  mutation saveFellowProfilePage1(
    $smallBio: String!
    $country: String!
    $location: String!
    $skills: [String!]!
    $jobTitles: [String!]!
    $languages: [String!]!
    $avatar: String!
  ) {
    saveFellowProfilePage1(
      smallBio: $smallBio
      country: $country
      location: $location
      skills: $skills
      jobTitles: $jobTitles
      languages: $languages
      avatar: $avatar
    )
  }
`;

export const SAVE_PROFILE_PAGE_2_MUTATION = gql`
  mutation saveFellowProfilePage2(
    $experience: [ExperienceInput!]!
    $education: [EducationInput!]!
  ) {
    saveFellowProfilePage2(experience: $experience, education: $education)
  }
`;

export const SAVE_PROFILE_PAGE_3_MUTATION = gql`
  mutation saveFellowProfilePage3(
    $awards: [AwardInput!]!
    $experienceLevels: [ExperienceLevelInput!]!
    $accomplishments: [AccomplishmentInput!]!
  ) {
    saveFellowProfilePage3(
      awards: $awards
      experienceLevels: $experienceLevels
      accomplishments: $accomplishments
    )
  }
`;

export const SAVE_PROFILE_PAGE_4_MUTATION = gql`
  mutation saveFellowProfilePage4(
    $passions: String
    $lookingFor: String
    $locationOptions: [String!]!
  ) {
    saveFellowProfilePage4(
      passions: $passions
      lookingFor: $lookingFor
      locationOptions: $locationOptions
    )
  }
`;

export const SAVE_PROFILE_PAGE_5_MUTATION = gql`
  mutation saveFellowProfilePage5(
    $hobbies: [HobbyInput!]!
    $bookOrQuote: [BookOrQuoteInput!]!
    $petDetails: String
  ) {
    saveFellowProfilePage5(
      hobbies: $hobbies
      bookOrQuote: $bookOrQuote
      petDetails: $petDetails
    )
  }
`;

export const SAVE_PROFILE_PAGE_6_MUTATION = gql`
  mutation saveFellowProfilePage6($links: [LinkInput!]!, $aboutMe: String) {
    saveFellowProfilePage6(links: $links, aboutMe: $aboutMe)
  }
`;

// BUSINESS PROFILE MUTATIONS

export const SAVE_BUSINESS_PROFILE_PAGE_1_MUTATION = gql`
  mutation saveBusinessProfilePage1(
    $smallBio: String!
    $country: String!
    $location: String!
    $website: Url!
    $avatar: String
  ) {
    saveBusinessProfilePage1(
      smallBio: $smallBio
      country: $country
      location: $location
      website: $website
      avatar: $avatar
    )
  }
`;

export const SAVE_BUSINESS_PROFILE_PAGE_2_MUTATION = gql`
  mutation saveBusinessProfilePage2(
    $businessField: String!
    $missionVision: String!
    $moreAboutBusiness: String!
  ) {
    saveBusinessProfilePage2(
      businessField: $businessField
      missionVision: $missionVision
      moreAboutBusiness: $moreAboutBusiness
    )
  }
`;

// JOB LISTING CREATION MUTATIONS

export const CREATE_JOB_LISTING_MUTATION = gql`
  mutation createJobListing(
    $jobTitle: String!
    $positionType: String!
    $beingEdited: Boolean
    $published: Boolean
    $completed: String
  ) {
    createJobListing(
      jobTitle: $jobTitle
      positionType: $positionType
      beingEdited: $beingEdited
      published: $published
      completed: $completed
    )
  }
`;

export const ADD_JOB_LISTING_DETAILS_1_MUTATION = gql`
  mutation addJobListingDetailsStep1(
    $id: ID!
    $positionSummary: String!
    $nonNegParams: [String!]!
    $completed: String
  ) {
    addJobListingDetailsStep1(
      id: $id
      positionSummary: $positionSummary
      nonNegParams: $nonNegParams
      completed: $completed
    )
  }
`;

export const ADD_JOB_LISTING_DETAILS_2_MUTATION = gql`
  mutation addJobListingDetailsStep2(
    $id: ID!
    $payscaleMin: Float!
    $payscaleMax: Float!
    $payOption: String!
    $locationOption: String!
    $idealCandidate: String!
    $daysInOffice: String!
    $daysRemote: String!
    $city: String
    $state: String
    $completed: String
  ) {
    addJobListingDetailsStep2(
      id: $id
      payscaleMin: $payscaleMin
      payscaleMax: $payscaleMax
      payOption: $payOption
      locationOption: $locationOption
      idealCandidate: $idealCandidate
      daysInOffice: $daysInOffice
      daysRemote: $daysRemote
      city: $city
      state: $state
      completed: $completed
    )
  }
`;

export const ADD_JOB_LISTING_DETAILS_3_MUTATION = gql`
  mutation addJobListingDetailsStep3(
    $id: ID!
    $experienceLevel: [String!]!
    $preferredSkills: [String!]!
    $moreAboutPosition: String
    $completed: String
  ) {
    addJobListingDetailsStep3(
      id: $id
      experienceLevel: $experienceLevel
      preferredSkills: $preferredSkills
      moreAboutPosition: $moreAboutPosition
      completed: $completed
    )
  }
`;

export const ADD_JOB_LISTING_DETAILS_4_MUTATION = gql`
  mutation addJobListingDetailsStep4(
    $id: ID!
    $responsibilities: [String!]!
    $perks: [String!]!
    $completed: String
  ) {
    addJobListingDetailsStep4(
      id: $id
      responsibilities: $responsibilities
      perks: $perks
      completed: $completed
    )
  }
`;

export const ADD_JOB_LISTING_DETAILS_5_MUTATION = gql`
  mutation addJobListingDetailsStep5(
    $id: ID!
    $interviewProcess: [InterviewProcessInput!]!
    $completed: String
  ) {
    addJobListingDetailsStep5(
      id: $id
      interviewProcess: $interviewProcess
      completed: $completed
    )
  }
`;

export const CREATE_JOB_LISTING_ROUND = gql`
  mutation createJobListingRound(
    $id: ID!
    $applicationLimit: Int
    $roundNumber: Int
    $completed: String
  ) {
    createJobListingRound(
      id: $id
      applicationLimit: $applicationLimit
      roundNumber: $roundNumber
      completed: $completed
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
      saved
      published
      beingEdited
    }
  }
`;

export const EDIT_JOB_LISTING = gql`
  mutation starOrStopEditingJobListing(
    $id: ID!
    $beingEdited: Boolean!
    $completed: String
  ) {
    starOrStopEditingJobListing(
      id: $id
      beingEdited: $beingEdited
      completed: $completed
    )
  }
`;

export const PUBLISH_JOB_LISTING = gql`
  mutation publishJobListing($id: ID!, $completed: String) {
    publishJobListing(id: $id, completed: $completed)
  }
`;

export const DELETE_JOB_LISTING = gql`
  mutation deleteJobListing($id: ID!) {
    deleteJobListing(id: $id)
  }
`;

// APPLICATION MUTATIONS

export const APPLY_TO_JOB = gql`
  mutation applyToJob($jobId: ID!, $message: String) {
    applyToJob(jobId: $jobId, message: $message)
  }
`;

export const KEEP_NOTES = gql`
  mutation keepNotes($jobApplicationId: ID!, $notes: [String!]!) {
    keepNotes(jobApplicationId: $jobApplicationId, notes: $notes)
  }
`;

export const EDIT_NOTE = gql`
  mutation editNote($noteId: ID!, $note: String!) {
    editNote(noteId: $noteId, note: $note) {
      id
      note
      madeByBusiness
      madeByFellow
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation deleteNote($noteId: ID!) {
    deleteNote(noteId: $noteId)
  }
`;

export const SCHEDULE_APPOINTMENTS = gql`
  mutation scheduleAppointments(
    $jobApplicationId: ID!
    $appointments: [JobInterviewAppointmentInput!]!
  ) {
    scheduleAppointments(
      jobApplicationId: $jobApplicationId
      appointments: $appointments
    )
  }
`;

export const REJECT_APPLICATION = gql`
  mutation rejectApp(
    $appId: ID!
    $rejectionMessage: String
    $rejectionDetails: String
  ) {
    rejectApp(
      appId: $appId
      rejectionMessage: $rejectionMessage
      rejectionDetails: $rejectionDetails
    )
  }
`;

export const HIGHLIGHT_APP = gql`
  mutation highlightApp($appId: ID!) {
    highlightApp(appId: $appId)
  }
`;

export const UPDATE_STATUS = gql`
  mutation updateStatus($appId: ID!, $status: String!) {
    updateStatus(appId: $appId, status: $status) {
      id
      message
      status
      highlighted
    }
  }
`;

export const SEND_OFFER = gql`
  mutation sendJobOffer($appId: ID!) {
    sendJobOffer(appId: $appId)
  }
`;

// OTHER MUTATIONS

export const SAVE_JOB = gql`
  mutation saveJobListing($jobId: ID!) {
    saveJobListing(jobId: $jobId)
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($conversationId: ID!, $text: String) {
    sendMessage(conversationId: $conversationId, text: $text) {
      id
      deliveredAt
      seenAt
      text
      fromBusiness
    }
  }
`;

// GET & UPDATE PROFILE MUTATIONS - OLDER
export const GET_FELLOW_PROFILE = gql`
  query GetFellowProfile {
    fellowProfile {
      objectId
      smallBio
      location
      skills
      jobTitles
      experience {
        objectId
        title
        companyName
        yearDetails
        details
      }
      education {
        objectId
        degree
        school
        fieldOfStudy
      }
      awards {
        objectId
        awardTitle
        givenBy
        awardDetails
      }
      experienceLevels {
        objectId
        experienceLevel
        expLevelSkill
        skillYears
      }
      accomplishments {
        objectId
        accTitle
        accDetails
      }
      passions
      lookingFor
      hobbies {
        objectId
        hobbyTitle
        howLong
      }
      documents
      country
      languages
      locationOptions
      petDetails
      bookOrQuote {
        objectId
        author
        bookOrQuote
      }
      aboutMe
      links {
        objectId
        link
        linkType
      }
    }
  }
`;

export const SAVE_PROFILE_MUTATION = gql`
  mutation SaveProfile($requestBody: ProfileInput!) {
    saveProfile(requestBody: $requestBody) {
      objectId
      smallBio
      location
      skills
      jobTitles
      experience {
        objectId
        title
        companyName
        yearDetails
        details
      }
      education {
        objectId
        degree
        school
        fieldOfStudy
      }
      awards {
        objectId
        awardTitle
        givenBy
        awardDetails
      }
      experienceLevels {
        objectId
        experienceLevel
        expLevelSkill
        skillYears
      }
      accomplishments {
        objectId
        accTitle
        accDetails
      }
      passions
      lookingFor
      hobbies {
        objectId
        hobbyTitle
        howLong
      }
      documents
      country
      languages
      locationOptions
      petDetails
      bookOrQuote {
        objectId
        author
        bookOrQuote
      }
      aboutMe
      links {
        objectId
        link
        linkType
      }
    }
  }
`;

// ALL THESE MUTATIONS ARE OBSOLETE - NEW ONES NEED TO BE WRITTEN THAT MATCH THE BACKEND MUTATIONS ON MVP-MAIN

////we'd need to update this to submit a single request body to be in line with the other requests
// export const SIGNUP_MUTATION = gql`
//   mutation SignUp($name: String!, $email: String!, $betaTester: Boolean!) {
//     signUp(name: $name, email: $email, betaTester: $betaTester) {
//       success
//       message
//     }
//   }
// `;

// export const FELLOW_SIGNUP_MUTATION = gql`
//   mutation FellowSignUp($requestBody: FellowInput!) {
//     signupFellow(requestBody: $requestBody)
//   }
// `;

// export const BUSINESS_SIGNUP_MUTATION = gql`
//   mutation BusinessSignUp($requestBody: BusinessInput!) {
//     signupBusiness(requestBody: $requestBody)
//   }
// `;

// export const ACCEPT_FELLOW_DONATION = gql`
//   mutation AcceptFellowDonation($donation: FellowDonationInput!) {
//     acceptFellowDonation(donation: $donation) {
//       id
//       checkoutToken
//     }
//   }
// `;

// export const ACCEPT_BUSINESS_DONATION = gql`
//   mutation AcceptFellowDonation($donation: FellowDonationInput!) {
//     acceptFellowDonation(donation: $donation) {
//       id
//       checkoutToken
//     }
//   }
// `;

// export const COMPLETE_PAYMENT = gql`
//   mutation CompletePayment($input: PaymentResultInput!) {
//     completePayment(input: $input) {
//       success
//       message
//       payment {
//         id
//         status
//       }
//     }
//   }
// `;

// export const GET_CURRENT_AMOUNT = gql`
//   query GetCurrentDonations {
//     currentDonations
//   }
// `;
