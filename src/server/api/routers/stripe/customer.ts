import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { TRPCError } from "@trpc/server";
import { stripe } from "./stripe";

export const customerRouter = createTRPCRouter({
  create_customer: publicProcedure // create a new customer
    .input(
      z.object({
        email: z.string(),
      }),
    ) // TODO(max): add in address collection possibilities
    .query(async ({ input }) => {
      try {
        const customer = await stripe.customers.create({
          email: input.email,
        });
        return { customerID: customer.id };
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
  get_customer: publicProcedure // get an existing customer
    .input(
      z.object({
        stripeCustomerId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const customer = await stripe.customers.retrieve(
          input.stripeCustomerId,
        );
        if (customer.deleted) {
          return { customer: null };
        }
        return { customer: customer };
      } catch (error) {
        console.error("An error occurred when calling the Stripe API", error);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Error when getting customer",
          cause: error,
        });
      }
    }),
});
