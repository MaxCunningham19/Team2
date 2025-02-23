"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import { api } from "~/trpc/server";

const extractFormData = (formData: FormData) => ({
  email: formData.get("email") as string,
  password: formData.get("password") as string,
  fullName: formData.get("fullName") as string,
  accountType: formData.get("accountType") as string,
});

export async function login(formData: FormData) {
  const supabase = await createClient();
  const { email, password } = extractFormData(formData);

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error("Login error:", error);
  }

  return { nextpage: "/", error };
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const { email, password, fullName, accountType } = extractFormData(formData);

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    console.error("Signup error:", signUpError);
    redirect("/error");
  }

  const user = signUpData.user;
  let artistId = null;

  if (accountType === "artist") {
    const accountData = await api.stripe.account.account();
    if (!accountData) {
      console.error("Artist account creation error: No account data");
      // Optionally handle or redirect on error here.
    } else {
      const { error: artistInsertError } = await supabase
        .from("artists")
        .insert({
          display_name: fullName,
          stripe_connected_account_id: accountData.account,
        });

      if (artistInsertError) {
        console.error("Artist account creation error:", artistInsertError);
        // Optionally handle or redirect on error here.
      } else {
        const { data: artist, error: artistSelectError } = await supabase
          .from("artists")
          .select("id")
          .eq("stripe_connected_account_id", accountData.account)
          .single();

        if (artistSelectError) {
          console.error("Error fetching artist ID:", artistSelectError);
        } else {
          artistId = artist.id;
        }
      }
    }
  }

  const customerData = await api.stripe.customer.create_customer({
    email,
    phone: "",
  });

  const { error: userUpsertError } = await supabase.from("users").upsert({
    id: user?.id,
    full_name: fullName,
    artist_id: artistId,
    stripe_customer_id: customerData.customerID,
  });

  if (userUpsertError) {
    console.error("User upsert error:", userUpsertError);
  }

  revalidatePath("/", "layout");
  return { nextpage: "/", error: userUpsertError };
}