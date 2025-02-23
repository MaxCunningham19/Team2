import { z } from "zod";
import { createTRPCRouter } from "~/server/api/trpc";

// stripeSetup.ts

import { stripe } from "../stripe/stripe";

import { createRouter } from "./create";
import { updateRouter } from "./update";

export const commissionRouter = createTRPCRouter({
  create: createRouter,
  milestones: updateRouter,
});
