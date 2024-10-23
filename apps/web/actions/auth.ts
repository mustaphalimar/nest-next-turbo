"use server";
import { BACKEND_URL } from "@/lib/constants";
import { FormState, LoginFormSchema, SignupFormSchema } from "@/lib/types";
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

export async function signIn(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (res.ok) {
    const result = await res.json();
    // create the session for authenticated user
    console.log(result);
  } else {
    return {
      message: res.status === 401 ? "Invalid credentials" : res.statusText,
    };
  }
}
