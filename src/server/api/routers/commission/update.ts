import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createClient } from "@/utils/supabase/client";
import { type Milestone, type MilestoneUpdate } from "src/utils/supabase/types";

export const updateRouter = createTRPCRouter({
  milestone: publicProcedure
    .input(z.custom<MilestoneUpdate>())
    .query(async ({ input }) => {
      const supabase = createClient();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data: milestoneData, error: milesoneError } = await supabase
        .from("milestones")
        .select("*")
        .eq("id", input.id)
        .single();

      if (milestoneData == null || !!milesoneError) {
        return { error: milesoneError };
      }

      const milestone = milestoneData as Milestone;
      if (input.order_id != null && input.order_id != milestone.order_id) {
        // todo move milestones around
      }

      const { data: milestoneID, error: errr } = await supabase
        .from("milestones")
        .update([input])
        .eq("id", input.id)
        .select("id")
        .single();

      if (milestoneID == null || !!errr) {
        return { error: errr };
      }

      return { milestoneID: milestoneID.id };
    }),
});
