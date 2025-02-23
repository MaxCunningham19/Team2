import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// stripeSetup.ts

import { TRPCError } from "@trpc/server";
import { stripe } from "./stripe";

export const accountRouter = createTRPCRouter({
  account_link: publicProcedure // create a link to a stripe onboarding url
    .input(z.object({ url: z.string(), account: z.string() }))
    .query(async ({ input }) => {
      try {
        const account = input.account;
        const url = input.url;
        const accountLink = await stripe.accountLinks.create({
          account: account,
          return_url: `${url}/${account}`,
          refresh_url: `${url}/`,
          type: "account_onboarding",
        });
        return { accountLink };
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
  account: publicProcedure // create a new stripe account
    .query(async ({}) => {
      try {
        const account = await stripe.accounts.create({
          controller: {
            stripe_dashboard: {
              type: "express",
            },
            fees: {
              payer: "application",
            },
            losses: {
              payments: "application",
            },
          },
        });

        return {
          account: account.id,
        };
      } catch (error) {
        console.error(
          "An error occurred when calling the Stripe API to create an account link:",
          error,
        );
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Error when creating Account",
          cause: error,
        });
      }
    }),
});
