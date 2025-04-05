import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"; // Import for cookie handling

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const accessToken = cookies().get("accessToken")?.value;
    console.log(accessToken);
    const response = await fetch(process.env.API_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.API_KEY as string,
        Authorization: accessToken as string,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const nextResponse = NextResponse.json(data);

    const authHeader = response.headers.get("authorization");
    if (authHeader) {
      // Set the access token as an HTTP-only cookie
      cookies().set("accessToken", authHeader, {
        httpOnly: true,
        maxAge: 24 * 60 * 60, // Cookie expiration time
        sameSite: "strict",
      });
    }

    return nextResponse;
  } catch (error) {
    console.error("Error in GraphQL proxy:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// export async function logout(setIsLoggedIn: any) {
//   // Clear the access token cookie
//   cookies().set("accessToken", "", {
//     httpOnly: true,
//     maxAge: 0,
//     sameSite: "strict",
//   });

//   setIsLoggedIn(false);

//   return NextResponse.json({ message: "Logged out successfully" });
// }

export async function PATCH() {
  // Clear the access token cookie
  cookies().set("accessToken", "", {
    httpOnly: true,
    maxAge: 0,
    sameSite: "strict",
  });

  return NextResponse.json({ message: "Logged out successfully" });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
