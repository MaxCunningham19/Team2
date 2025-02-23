import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// stripeSetup.ts
import { createClient } from "@/utils/supabase/client";
import {
  type MilestoneInsert,
  type commissionInsert,
} from "~/utils/supabase/types";
import { Milestone } from "lucide-react";

export const createRouter = createTRPCRouter({
  commission: publicProcedure
    .input(
      z.object({
        commission: z.custom<commissionInsert>(),
        milestones: z.array(z.custom<MilestoneInsert>()),
      }),
    )
    .query(async ({ input }) => {
      const supabase = createClient();

      const commissionkeys = new Map<string, unknown>();

      Object.keys(input.commission).forEach((key) => {
        commissionkeys.set(
          key,
          input.commission[key as keyof commissionInsert],
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
      const { data: milestoneIDs, error: milesoneError } = await supabase
        .from("milestones")
        .insert([milestonesWithCommissionId])
        .select("id");

      if (!!error) {
        const { error: deleteError } = await supabase
          .from("commission")
          .delete()
          .eq("id", commissionID);

        return { error: milesoneError, deletedError: deleteError };
      }

      return {
        commissionID: commissionID.id as string,
        milestoneIDs: milestoneIDs as string[] | null,
      };
    }),

  milestone: publicProcedure
    .input(
      z.object({
        commissionID: z.string(),
        milestone: z.custom<MilestoneInsert>(),
      }),
    )
    .query(async ({ input }) => {
      const supabase = createClient();

      const commissionkeys = new Map<string, unknown>();

      const { data: commissionID, error } = await supabase
        .from("commission")
        .select("*")
        .eq("id")
        .single();

      milestone = { ...milestone, commission_id: commissionID };
      const { data: milestoneIDs, error: milesoneError } = await supabase
        .from("milestones")
        .insert([milestone])
        .select("id");

      if (!!error) {
        const { error: deleteError } = await supabase
          .from("commission")
          .delete()
          .eq("id", commissionID);

        return { error: milesoneError, deletedError: deleteError };
      }

      return {
        commissionID: commissionID.id as string,
        milestoneIDs: milestoneIDs as string[] | null,
      };
    }),
});
