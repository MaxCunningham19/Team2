import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// stripeSetup.ts

import { TRPCError } from "@trpc/server";
import { stripe } from "./stripe";

export const paymentsRouter = createTRPCRouter({
  createDirectPayment: publicProcedure // direct payment to purchase artwork
    .input(
      z.object({
        stripeCustomerId: z.string(),
        amountInCent: z.number(),
        artistStripeID: z.string(),
        maxApplicationFeeInCent: z.number(),
        applicationFeePercentage: z.number(),
      }),
    )
    .query(async ({ input }) => {
      // TODO (max): add in error handling for invaid numbers
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: input.amountInCent,
          currency: "eur",
          customer: input.stripeCustomerId,
          application_fee_amount: min(
            input.maxApplicationFeeInCent,
            input.amountInCent * input.applicationFeePercentage,
          ),
          transfer_data: {
            destination: input.artistStripeID,
          },
        });
        return { paymentIntent };
      } catch (error) {
        console.error(
          "An error occurred when calling the Stripe API to create an account link:",
          error,
        );
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Error when creating Link",
          cause: error,
        });
      }
    }),
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        return_url: z.string(),
        work_title: z.string(),
        work_amount: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: input.work_title,
              },
              unit_amount: input.work_amount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        ui_mode: "embedded",
        // The URL of your payment completion page
        return_url: input.return_url,
      });

      if (session == null) {
        return { sessionId: null };
      }

      return {
        sessionId: session?.id,
        session_client_secret: session.client_secret,
      };
    }),
});

function min(x: number, y: number): number {
  if (x > y) {
    return y;
  }
  return x;
}
