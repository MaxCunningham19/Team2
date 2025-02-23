import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// stripeSetup.ts

import { TRPCError } from "@trpc/server";
import { stripe } from "./stripe";
import Stripe from "stripe";
import { createClient } from "~/utils/supabase/server";
import { Artist } from "~/utils/supabase/types";

export const paymentsRouter = createTRPCRouter({
  createPayout: publicProcedure // direct payment to purchase artwork
    .input(
      z.object({
        artistId: z.string(),
        payoutAmountInCent: z.number(),
        applicationMaxFeeInCent: z.number(),
        applicationPercentageFee: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("artists")
        .select("*")
        .eq("id", input.artistId)
        .single();

      if (!!error || data == null) {
        return { error: error };
      }

      const artist = data as Artist;
      try {
        const transfer = await stripe.transfers.create({
          amount: input.payoutAmountInCent,
          currency: "eur",
          destination: artist.stripe_connected_account_id,
        });

        return { transfer };
      } catch (error) {
        console.error(
          "An error occurred when calling the Stripe API to create an account link:",
          error,
        );
        return { error };
      }
    }),
});

const min = function (x: number, y: number) {
  if (x < y) {
    return x;
  }
  return y;
};
