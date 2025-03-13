import { gql } from "@apollo/client";

// NEW MUTATIONS:
// do these signup mutations return success & message or simply an Id?

// removed the ID response?
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
    signupFellow(
      email: $email
      password: $password
      name: $name
      isBetaTester: $isBetaTester
      contactName: $contactName
      isEarlySignup: $isEarlySignup
      referral: $referral
    ) {
      ID
    }
  }
`;

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
    ) {
      success
      message
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

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
    }
  }
`;

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
