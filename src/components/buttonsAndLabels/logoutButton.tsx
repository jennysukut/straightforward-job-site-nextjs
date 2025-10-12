"use server";

import { cookies } from "next/headers";

export async function LOGOUT() {
  // console.log(`Attempting to remove cookie: "accessToken"`);

  cookies().set("accessToken", "", {
    httpOnly: true,
    maxAge: 0,
    sameSite: "strict",
  });
}
