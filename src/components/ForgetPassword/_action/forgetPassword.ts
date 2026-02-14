"use server";

export default async function forgetPassword(email: string) {
  if (!process.env.URL_API) {
    throw new Error("URL_API is not defined in environment variables");
  }

  const response = await fetch(`${process.env.URL_API}/auth/forgotPasswords`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to send request");
  }

  const data = await response.json();
  return data;
}
