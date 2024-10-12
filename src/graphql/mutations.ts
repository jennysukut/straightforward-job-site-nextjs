import { gql } from "@apollo/client";

//we'd need to update this to submit a single request body to be in line with the other requests
export const SIGNUP_MUTATION = gql`
  mutation SignUp($name: String!, $email: String!, $betaTester: Boolean!) {
    signUp(name: $name, email: $email, betaTester: $betaTester) {
      success
      message
    }
  }
`;

export const FELLOW_SIGNUP_MUTATION = gql`
  mutation FellowSignUp($requestBody: FellowInput!) {
    signupFellow(requestBody: $requestBody)
  }
`;

export const BUSINESS_SIGNUP_MUTATION = gql`
  mutation BusinessSignUp($requestBody: BusinessInput!) {
    signupBusiness(requestBody: $requestBody)
  }
`;

export const ACCEPT_FELLOW_DONATION = gql`
  mutation AcceptFellowDonation($donation: FellowDonationInput!) {
    acceptFellowDonation(donation: $donation) {
      id
      checkoutToken
    }
  }
`;

export const ACCEPT_BUSINESS_DONATION = gql`
  mutation AcceptFellowDonation($donation: FellowDonationInput!) {
    acceptFellowDonation(donation: $donation) {
      id
      checkoutToken
    }
  }
`;

export const COMPLETE_PAYMENT = gql`
  mutation CompletePayment($input: PaymentResultInput!) {
    completePayment(input: $input) {
      success
      message
      payment {
        id
        status
      }
    }
  }
`;

export const GET_CURRENT_AMOUNT = gql`
  query GetCurrentDonations {
    currentDonations
  }
`;
