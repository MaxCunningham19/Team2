import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createClient } from "@/utils/supabase/client";
import {
  Commission,
  type Milestone,
  type MilestoneUpdate,
} from "src/utils/supabase/types";

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

      return { milestoneID: milestoneID.id as string };
    }),

  approveMilestone: publicProcedure
    .input(
      z.object({
        milestone_id: z.string(),
      }),
    )
    .query(async ({ input: { milestone_id } }) => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user == null) {
        return;
      }

      const { milestoneData, error } = await supabase
        .from("milestones")
        .select("*")
        .eq("id", milestone_id)
        .single();

      if (!!error) {
        return { error: error };
      }

      let milestone = milestoneData as Milestone;
      const { commissionData, error: commissionError } = await supabase
        .from("commissions")
        .select("*")
        .eq("id", milestone.commission_id)
        .single();

      if (!!commissionError) {
        return { error: commissionError };
      }
      const commission = commissionData as Commission;

      if (commission.user_id == user.id && milestone.completed) {
        milestone.approved = true;
      } else if (commission.artist_id == user.id) {
        milestone.completed = true;
      }

      const { data, error: seterror } = await supabase
        .from("milestones")
        .update([milestone])
        .eq("id", milestone.id)
        .select("*")
        .single();

      if (!seterror) {
        milestone = data as Milestone;
      }
    }),
});
