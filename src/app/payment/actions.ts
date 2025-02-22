"use server";
import { api } from "~/trpc/server";

export async function getIntent() {
  const { paymentIntent } = await api.stripe.payments.createDirectPayment({
    stripeCustomerId: "",
    amountInCent: 0,
    artistStripeID: "string",
    maxApplicationFeeInCent: 0,
    applicationFeePercentage: 0,
  });

  return paymentIntent;
}
