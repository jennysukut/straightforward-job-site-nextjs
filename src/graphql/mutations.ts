import { gql } from "@apollo/client";

// NEW MUTATIONS:
// do these signup mutations return success & message or simply an Id?

// LOGIN AND SIGNUP MUTATIONS
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      roles
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
  ) {
    saveFellowProfilePage1(
      smallBio: $smallBio
      country: $country
      location: $location
      skills: $skills
      jobTitles: $jobTitles
      languages: $languages
    )
  }
`;

export const SAVE_PROFILE_PAGE_2_MUTATION = gql`
  mutation saveFellowProfilePage2(
    $experience: [Experience!]!
    $education: [Education!]!
  ) {
    saveFellowProfilePage2(experience: $experience, education: $education)
  }
`;

// JOB LISTING CREATION MUTATIONS

export const CREATE_JOB_LISTING_MUTATION = gql`
  mutation createJobListing($jobTitle: String!, $positionType: String!) {
    createJobListing(jobTitle: $jobTitle, positionType: $positionType)
  }
`;

export const ADD_JOB_LISTING_DETAILS_1_MUTATION = gql`
  mutation addJobListingDetailsStep1(
    $id: ID!
    $positionSummary: String!
    $nonNegParams: [String!]!
  ) {
    addJobListingDetailsStep1(
      id: $id
      positionSummary: $positionSummary
      nonNegParams: $nonNegParams
    )
  }
`;

// APPLICATION MUTATIONS

export const APPLY_TO_JOB = gql`
  mutation applyToJob($jobId: ID!, $message: String!) {
    applyToJob(jobId: $jobId, message: $message)
  }
`;

export const KEEP_NOTES = gql`
  mutation keepNotes($jobApplicationId: ID!, $notes: [String!]!) {
    keepNotes(jobApplicationId: $jobApplicationId, notes: $notes)
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

// OTHER MUTATIONS

export const SAVE_JOB = gql`
  mutation saveJobListing($jobId: ID!) {
    saveJobListing(jobId: $jobId)
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
