"use server";

// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth"; // عدّل المسار حسب مشروعك

// export async function getUserToken(): Promise<string | null> {
//   try {
//     const session = await getServerSession(authOptions);

//     // هنا accessToken موجود في session بعد التعديل
//     return (session)?.accessToken ?? null;
//   } catch {
//     return null;
//   }
// }

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const x = (await cookies()).get("next-auth.session-token")?.value;
  const TokenUse = await decode({
    token: x,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return TokenUse?.token
}
