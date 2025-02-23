"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import { api } from "~/trpc/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Login error:", error);
  }

  return { nextpage: "/", error };
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const userInfo = await supabase.auth.signUp(data);

  if (userInfo.error) {
    console.error("Signup error:", userInfo.error);
    redirect("/error");
  }

  const user = userInfo.data.user;

  let artistId = null;
  if (formData.get("accountType") === "artist") {
    const accountData = await api.stripe.account.account();
    if (!accountData) {
      console.error("Artist account creation error: No account data");
      redirect("/error");
    }

    const { error } = await supabase.from("artists").insert({
      user_id: user?.id,
      display_name: formData.get("fullName") as string,
      stripe_connected_account_id: accountData.account,
    });

    if (error) {
      console.error("Artist account creation error:", error);
      redirect("/error");
    }

    artistId = await supabase.from("artists").select("id").eq("user_id", user?.id).single();
  }

  const customerData = await api.stripe.customer.create_customer({
    email: data.email,
    phone: "",
  });

  const { error } = await supabase.from("users").upsert({
    id: user?.id,
    full_name: formData.get("fullName") as string,
    artist_id: artistId,
    stripe_customer_id: customerData.customerID,
  });

  revalidatePath("/", "layout");
  return { nextpage: "/", error };
}
