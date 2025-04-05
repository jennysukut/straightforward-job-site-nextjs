"use server";

import { cookies } from "next/headers";

export async function removeCookie(cookieName: any) {
  cookies().set(cookieName, "", { maxAge: 0 });
}
