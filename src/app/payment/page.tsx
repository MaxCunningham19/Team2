"use client";
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "~/trpc/react";
import { redirect } from "next/navigation";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe with your public key

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLIC_KEY ?? "",
);

export default function PaymentPage(props: {
  artistID: string;
  return_url: string;
  amount_in_cent: number;
  title: string;
}) {
  const return_url = "http://localhost:3000/";
  const amount_in_cent = 100;
  const title = "the thing";
  const res = api.stripe.payments.createCheckoutSession.useQuery({
    return_url: return_url,
    work_amount: amount_in_cent,
    work_title: title,
  });
  if (!res.isSuccess) {
    return <></>;
  }
  const sessionData = res.data;
  if (sessionData?.sessionId == null) {
    redirect("/error");
    return null;
  }

  if (sessionData.session_client_secret != null) {
    return (
      <Elements stripe={stripePromise}>
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret: sessionData.session_client_secret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </Elements>
    );
  } else {
    return null;
  }
}
