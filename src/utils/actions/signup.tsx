import { z } from "zod";

const fellowSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2)
    .max(25, { message: "first name must be more than 2 characters" }),
  lastName: z
    .string()
    .trim()
    .min(2)
    .max(25, { message: "last name must be more than 2 characters" }),
  email: z.string().email({ message: "please enter a valid email address" }),
});

const validatedFields = fellowSchema.safeParse({
  firstName: "jenny",
  lastName: "sukut",
  email: "jennysukut@gmail.com",
});

if (!validatedFields.success) {
  console.log(validatedFields.error);
  // handle error then return
  validatedFields.error;
} else {
  console.log(validatedFields);
  // do something
  validatedFields.data;
}

export function signupFellow({ fellow }: any): any {
  const { firstName, lastName, email } = fellow;

  const validatedFields = fellowSchema.safeParse({
    firstName: firstName,
    lastName: lastName,
    email: email,
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    // handle error then return
    validatedFields.error;
  } else {
    console.log(validatedFields);
    // do something
    validatedFields.data;
  }
  // console.log(fellow + "signed up");
}

// if (!validatedFields.success) {
//   return {
//     ...prevState,
//     zodErrors: validatedFields.error.flatten().fieldErrors,
//     message: "Missing Fields. Error Here",
//   };
// }
