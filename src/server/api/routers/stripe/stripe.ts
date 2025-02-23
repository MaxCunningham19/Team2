import { z } from "zod";
import { createTRPCRouter } from "~/server/api/trpc";

// stripeSetup.ts

import Stripe from "stripe";
import { accountRouter } from "./account";
import { customerRouter } from "./customer";
import { paymentsRouter } from "./payments";

// Initialize Stripe with your secret key
export const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY ?? "", {});

export const stripeRouter = createTRPCRouter({
  account: accountRouter,
  customer: customerRouter,
  payments: paymentsRouter,
});
