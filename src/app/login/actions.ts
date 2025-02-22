"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

import { createClient } from "~/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Login error:", error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error("Signup error:", error);
    redirect("/error");
  }

  const customerId = await api.stripe.customer.create_customer({
    email: data.email,
  });

  revalidatePath("/", "layout");
  redirect("/");
}
