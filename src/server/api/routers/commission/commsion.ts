import { createTRPCRouter } from "~/server/api/trpc";

import { createRouter } from "./create";
import { updateRouter } from "./update";

export const commissionRouter = createTRPCRouter({
  create: createRouter,
  milestones: updateRouter,
});
