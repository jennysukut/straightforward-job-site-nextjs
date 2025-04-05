"use server";

import { cookies } from "next/headers";

export async function removeCookie(cookieName: any) {
  cookies().set(cookieName, "", { maxAge: 0 });
  // Or
  // cookies().set(cookieName, '', { expires: new Date(0) });
}
