"use server";
import { api } from "~/trpc/server";
import { Database } from "@/utils/supabase/types";

export async function getIntent() {
  const { error, paymentIntent } =
    await api.stripe.payments.createDirectPayment({
      stripeCustomerId: "",
      amountInCent: 0,
      artistStripeID: "string",
      maxApplicationFeeInCent: 0,
      applicationFeePercentage: 0,
    });
  if (error) {
    return undefined;
  }
  return paymentIntent;
}
