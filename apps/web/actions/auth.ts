"use server";
import { BACKEND_URL } from "@/lib/constants";
import { FormState, SignupFormSchema } from "@/lib/types";
import { redirect } from "next/navigation";

export async function signUp(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });

  if (res.ok) {
    redirect("/auth/signin");
  } else {
    return {
      message: res.status == 409 ? "Email already exists." : res.statusText,
    };
  }
}
