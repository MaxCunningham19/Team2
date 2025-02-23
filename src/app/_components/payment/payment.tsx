/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { api } from "~/trpc/react";
import { redirect } from "next/navigation";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripe = loadStripe(process.env.STRIPE_TEST_PUBLIC_KEY ?? "");

export default function PaymentPage(props: {
  artistID: string;
  return_url: string;
  amount_in_cent: number;
  title: string;
}) {
  const { data: sessionData } =
    api.stripe.payments.createCheckoutSession.useQuery({
      return_url: props.return_url,
      work_amount: props.amount_in_cent,
      work_title: props.title,
    });

  try {
    const stripe = useStripe();

    if (sessionData?.sessionId == null || stripe == null) {
      redirect("/error");
    }

    if (sessionData.session_client_secret != null) {
      return (
        <EmbeddedCheckoutProvider
          stripe={stripe}
          options={{ clientSecret: sessionData.session_client_secret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      );
    } else {
      return null;
    }
  } catch {
    redirect("/error");
  }
}
