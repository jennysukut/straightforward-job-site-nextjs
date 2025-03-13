"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { SchemaLink } from "@apollo/client/link/schema";
import { addMocksToSchema, MockList } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

// Define your GraphQL schema
const typeDefs = `
type Query {
  currentDonations: String
  metrics: Metrics
  fellowProfile: Profile
}

type Mutation {
  saveJobListing(requestBody: JobListingInput): JobListing
  signupFellow(requestBody: FellowInput) : ID
  acceptFellowDonation(donation: FellowDonationInput) : Payment
  signupBusiness(requestBody: BusinessInput) : ID
  acceptBusinessDonation(donation: BusinessDonationInput) : Payment
  completePayment(input: PaymentResultInput): PaymentResult
  saveProfile(requestBody: ProfileInput): Profile
  generateResetPasswordToken(email: String): Result
  resetPassword(email: String, password: String, token: String): Result
  login(email: String, password: String): Result
  saveBusinessProfile(requestBody: BusinessProfileInput): BusinessProfile
  saveJobApplication(requestBody: JobApplicationInput): JobApplication
  saveJobApplicationNote(jobApplicationId: ID, requestBody: JobApplicationNoteInput): ID
}

scalar Long
scalar Url

type Metrics {
  fellowMetrics: FellowMetrics
  businessMetrics: BusinessMetrics
  donationMetrics: DonationMetrics
}

type FellowMetrics {
  signups: Long
  collaborators: Long
  betaTesters: Long
  referralPartners: Long
}

type BusinessMetrics {
  signups: Long
  betaTesters: Long
}

type DonationMetrics {
  totalDonations: String
  fellowDonations: String
  businessDonations: String
}

input JobListingInput {
  jobId : String
  jobTitle : String
  businessName : String
  applicationLimit : String
  numberOfApps : String
  positionType : String
  positionSummary : String
  nonNegParams : [String]
  locationOption : String
  payDetails : PayDetailsInput
  hybridDetails : HybridDetailsInput
  experienceLevel : [String]
  preferredSkills : [String]
  moreAboutPosition : String
  responsibilities : [String]
  perks : [String]
  interviewProcess : [InterviewProcessInput]
  location : String
  country : String
  jobIsBeingEdited : Boolean
  roundNumber : String
}

input PayDetailsInput {
  payScaleMin: Float
  payScaleMax: Float
  payOption: String
}

input HybridDetailsInput {
  daysInOffice: String
  daysRemote: String
}

input InterviewProcessInput {
  stage: String
  step: String
  details: String
  id: ID
}

type JobListing {
  jobId : String
  jobTitle : String
  businessName : String
  applicationLimit : String
  numberOfApps : String
  positionType : String
  positionSummary : String
  nonNegParams : [String]
  locationOption : String
  payDetails : PayDetails
  hybridDetails : HybridDetails
  experienceLevel : [String]
  preferredSkills : [String]
  moreAboutPosition : String
  responsibilities : [String]
  perks : [String]
  interviewProcess : [InterviewProcess]
  location : String
  country : String
  jobIsBeingEdited : Boolean
  roundNumber : String
}

type PayDetails {
  payScaleMin: Float
  payScaleMax: Float
  payOption: String
}

type HybridDetails {
  daysInOffice: String
  daysRemote: String
}

type InterviewProcess {
  stage: String
  step: String
  details: String
  id: ID
}

input FellowInput {
  name: String
  email: String
  password: String
  betaTester: Boolean
  collaborator: Boolean
  message: String
  referralPartner: Boolean
  referralCode: String
}

input FellowDonationInput {
  name: String
  amount: String
  email: String
}

type Result {
  success: Boolean
  message: String
}

input BusinessInput {
  businessName: String
  email: String
  password: String
  earlySignup: Boolean
  betaTester: Boolean
}

input BusinessDonationInput {
  businessName: String
  contactName: String
  email: String
  amount: String
  referral: String
}

type Payment {
  id: ID
  checkoutToken: String
  status: String
}

input PaymentResultInput {
  hash: String
  data: TransactionDataInput
  paymentId: ID
}

input TransactionDataInput {
  transactionId: String
  dateCreated: String
  cardBatchId: String
  status: String
  type: String
  amount: String
  currency: String
  avsResponse: String
  cvvResponse: String
  approvalCode: String
  cardToken: String
  cardNumber: String
  cardHolderName: String
  customerCode: String
  invoiceNumber: String
  warning: String
}

# Assuming you have a type to represent the result of the transaction
type PaymentResult {
  # Define fields for the result
  success: Boolean
  message: String
  # Add any other fields you need for the result
  payment: Payment
}

input ProfileInput {
  # __typename: String
  objectId: ID
  name: String
  email: String
  avatar: Avatar
  buttonShadow: String
  colorScheme: String
  profileIsBeingEdited: Boolean
  shadow: String
  smallBio: String
  country: String
  location: String
  locationOptions: [String]
  skills: [String]
  jobTitles: [String]
  languages: [String]
  experience: [ExperienceInput]
  education: [EducationInput]
  awards: [AwardInput]
  experienceLevels: [ExperienceLevelInput]
  accomplishments: [AccomplishmentInput]
  links: [LinkInput]
#  personalWebsite: Url
#  portfolioWebsite: Url
#  socialMediaLinks: [Url]
#  otherLink: Url
# personalDetails:: String
  passions: String
  lookingFor: String
  hobbies: [HobbyInput]
  documents: String
  bookOrQuote: [BookOrQuoteInput]
  aboutMe: String
  petDetails: String
# subscriptionDetails: SubscriptionDetails
    # Current Subscription Amount: String
    # Date of Subscription Renewal?: String
# Application List: String
    # Daily Application Counter: String
# Messaging Information?: String
  addMoreInfo: Boolean
}

input LinkInput {
  # The frontend has its own id that the backend ignores
  id: ID
  # The backend has its id that only the backend knows about
  objectId: ID
  link: Url
  linkType: String
  # __typename: String
}

input BookOrQuoteInput {
  # The frontend has its own id that the backend ignores
  id: ID
  # The backend has its id that only the backend knows about
  objectId: ID
  author: String
  bookOrQuote: String
  # __typename: String
}

input HobbyInput {
  # The frontend has its own id that the backend ignores
  id: ID
  # The backend has its id that only the backend knows about
  objectId: ID
  hobbyTitle: String
  howLong: String
  # __typename: String
}

input ExperienceInput {
  # The frontend has its own id that the backend ignores
  id: ID
  # The backend has its id that only the backend knows about
  objectId: ID
  title: String
  companyName: String
  yearDetails: String
  details: String
  # __typename: String
}

input EducationInput {
  # The frontend has its own id that the backend ignores
  id: ID
  # The backend has its id that only the backend knows about
  objectId: ID
  degree: String
  school: String
  fieldOfStudy: String
  # __typename: String
}

input AwardInput {
  # The frontend has its own id that the backend ignores
  id: ID
  # The backend has its id that only the backend knows about
  objectId: ID
  awardTitle: String
  givenBy: String
  awardDetails: String
  # __typename: String
}

input ExperienceLevelInput {
  # The frontend has its own id that the backend ignores
  id: ID
  # The backend has its id that only the backend knows about
  objectId: ID
  experienceLevel: String
  expLevelSkill: String
  skillYears: String
  # __typename: String
}

input AccomplishmentInput {
  # The frontend has its own id that the backend ignores
  id: ID
  # The backend has its id that only the backend knows about
  objectId: ID
  accTitle: String
  accDetails: String
  # __typename: String
}

type Profile {
  objectId: ID
  avatar: Avatar
  smallBio: String
  country: String
  location: String
  locationOptions: [String]
  skills: [String]
  jobTitles: [String]
  languages: [String]
  experience: [Experience]
  education: [Education]
  awards: [Award]
  experienceLevels: [ExperienceLevel]
  accomplishments: [Accomplishment]
  links: [Link]
#  personalWebsite: Url
#  portfolioWebsite: Url
#  socialMediaLinks: [Url]
#  otherLink: Url
# personalDetails:: String
  passions: String
  lookingFor: String
  hobbies: [Hobby]
  documents: String
  bookOrQuote: [BookOrQuote]
  aboutMe: String
  petDetails: String
# subscriptionDetails: SubscriptionDetails
    # Current Subscription Amount: String
    # Date of Subscription Renewal?: String
# Application List: String
    # Daily Application Counter: String
# Messaging Information?: String

}

type Link {
  objectId: ID
  link: Url
  linkType: String
}

type BookOrQuote {
  objectId: ID
  author: String
  bookOrQuote: String
}

type Hobby {
  objectId: ID
  hobbyTitle: String
  howLong: String
}

type Experience {
  objectId: ID
  title: String
  companyName: String
  yearDetails: String
  details: String
}

type Education {
  objectId: ID
  degree: String
  school: String
  fieldOfStudy: String
}

type Award {
  objectId: ID
  awardTitle: String
  givenBy: String
  awardDetails: String
}

type ExperienceLevel {
  objectId: ID
  experienceLevel: String
  expLevelSkill: String
  skillYears: String
}

type Accomplishment {
  objectId: ID
  accTitle: String
  accDetails: String
}

input BusinessProfileInput {
  smallBio: String
  country: String
  location: String
  website: Url
  businessField: String
  missionVision: String
  moreAboutBusiness: String
  billingDetails: String
  amountDue: String
}

type BusinessProfile {
  smallBio: String
  country: String
  location: String
  website: Url
  businessField: String
  missionVision: String
  moreAboutBusiness: String
  billingDetails: String
  amountDue: String
}

input JobApplicationInput {
  message: String
  jobListingId: ID
}

type JobApplication {
  message: String
  applicant: ID
  jobListingId: ID
  business: String
  businessId: ID
  dateOfApp: String
  appStatus: String
  businessNote: [String]
  fellowNote: [String]
  appointments: [InterviewAppointment]
}

type InterviewAppointment {
  # The frontend has its own id that the backend ignores
  id: ID
  # The backend has its id that only the backend knows about
  objectId: ID
  interviewStep: String
  interviewDateAndTime: String
  note: String
}

input JobApplicationNoteInput {
  text: String
  businessNote: Boolean
  fellowNote: Boolean
}

type Avatar {
avatar: Avatar
}
`;

// Create a schema with mocks
const schema = makeExecutableSchema({ typeDefs });

const mocks = {
  Url: () => "https://example.com",
  String: () => "String Here",
  // Add other custom mocks here if needed
  CustomType: () => ({
    // Mock implementation for the custom type
    id: "1",
    name: "Custom Name",
    description: "This is a custom description.",
  }),
  Avatar: () => "checks",
};

const schemaWithMocks = addMocksToSchema({
  schema,
  mocks,
  preserveResolvers: true,
});

// const mockLink = new SchemaLink({ schema: schemaWithMocks });

const httpLink = createHttpLink({
  uri: "/api/graphql",
});

// Use mockLink for local testing, productionLink for production
// const link = process.env.NODE_ENV === "development" ? mockLink : httpLink;

const link = httpLink;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export default function ApolloWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
