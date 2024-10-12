export const sendFellowSignupEmail = async (
  email: string,
  name: string,
  betaTester: boolean,
) => {
  const firstName = name.split(" ")[0];
  await fetch("/api/emails/signupEmails/fellowSignupEmail", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      firstName: firstName,
      betaTester: betaTester,
    }),
  }).catch((err) => {
    console.log(err);
  });
};

export const sendBusinessSignupEmail = async (
  email: string,
  business: string,
  betaTester: boolean,
) => {
  await fetch("/api/emails/signupEmails/businessSignupEmail", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      businessName: business,
      betaTester: betaTester,
    }),
  }).catch((err) => {
    console.log(err);
  });
};

export const sendCollaboratorSignupEmail = async (
  email: string,
  name: string,
  betaTester: boolean,
  referralPartner: boolean,
  referralCode: string,
) => {
  const firstName = name.split(" ")[0];
  await fetch("/api/emails/signupEmails/collaboratorSignupEmail", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      firstName: firstName,
      betaTester: betaTester,
      referralPartner: referralPartner,
      referralCode: referralCode,
    }),
  }).catch((err) => {
    console.log(err);
  });
};

// referralEmails
export const sendReferralEmail = async (
  email: string,
  name: string,
  referralCode: string,
) => {
  const firstName = name.split(" ")[0];
  await fetch("/api/emails/referralEmails/referralFellowEmail", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      firstName: firstName,
      referralCode: referralCode,
    }),
  }).catch((err) => {
    console.log(err);
  });
};
export const sendReferralManagementEmail = async (
  email: string,
  name: string,
  referralCode: string,
  message: string,
) => {
  await fetch("/api/emails/referralEmails/referralManagementEmail", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      name: name,
      referralCode: referralCode,
      message: message,
    }),
  }).catch((err) => {
    console.log(err);
  });
};

// donation emails
export const sendFellowDonationEmail = async (
  email: string,
  name: string,
  amount: string,
) => {
  const firstName = name.split(" ")[0];
  await fetch("/api/emails/donationEmails/fellowDonationEmail", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      firstName: firstName,
      amount: amount,
    }),
  }).catch((err) => {
    console.log(err);
  });
};

export const sendBusinessDonationEmail = async (
  email: string,
  name: string,
  amount: string,
) => {
  await fetch("/api/emails/donationEmails/businessDonationEmail", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      businessName: name,
      amount: amount,
    }),
  }).catch((err) => {
    console.log(err);
  });
};
