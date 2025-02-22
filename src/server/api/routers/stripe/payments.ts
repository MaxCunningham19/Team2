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
});

function min(x: number, y: number): number {
  if (x > y) {
    return y;
  }
  return x;
}
