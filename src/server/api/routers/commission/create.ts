import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// stripeSetup.ts
import { createClient } from "@/utils/supabase/client";
import {
  type MilestoneInsert,
  type CommissionInsert,
} from "~/utils/supabase/types";

export const createRouter = createTRPCRouter({
  commission: publicProcedure
    .input(
      z.object({
        commission: z.custom<CommissionInsert>(),
        milestones: z.array(z.custom<MilestoneInsert>()),
      }),
    )
    .query(async ({ input }) => {
      const supabase = createClient();

      const commissionkeys = new Map<string, unknown>();

      Object.keys(input.commission).forEach((key) => {
        commissionkeys.set(
          key,
          input.commission[key as keyof CommissionInsert],
        );
      });

      const { data: commissionID, error } = await supabase
        .from("commission")
        .insert([input.commission])
        .select("id")
        .single();

      if (!!error || commissionID == null) {
        return { error: error };
      }

      if (input.milestones.length <= 0) {
        return { commissionID: commissionID.id as string };
      }

      const milestonesWithCommissionId = input.milestones.map((milestone) => ({
        ...milestone,
        commission_id: commissionID.id as string, // Add commission ID to each milestone
      }));

      milestonesWithCommissionId.sort((a, b) => {
        return a.order_id - b.order_id;
      });
      const { data: milestoneIDs, error: milesoneError } = await supabase
        .from("milestones")
        .insert([milestonesWithCommissionId])
        .select("id");

      if (!!error) {
        const { error: deleteError } = await supabase
          .from("commission")
          .delete()
          .eq("id", commissionID);

        return { error: milesoneError, deleted: !deleteError };
      }

      return {
        commissionID: commissionID.id as string,
        milestoneIDs: milestoneIDs as string[] | null,
      };
    }),
});
