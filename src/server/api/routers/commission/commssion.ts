import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { createRouter } from "./create";
import { updateRouter } from "./update";

import { createClient } from "@/utils/supabase/client";
import { type Commission, type Milestone } from "~/utils/supabase/types";
import { z } from "zod";

export const commissionRouter = createTRPCRouter({
  create: createRouter,
  update: updateRouter,

  getCommissionsByUserID: publicProcedure
    .input(
      z.object({
        userID: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const supabase = createClient();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data, error } = await supabase
        .from("commissions")
        .select(`*`)
        .eq("user_id", input.userID)
      return { commission: data as Commission[], error };
    }),

  getCommissionsByArtistID: publicProcedure
    .input(
      z.object({
        artistID: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const supabase = createClient();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data, error } = await supabase
        .from("commissions")
        .select(`*`)
        .eq("artist_id", input.artistID)
      return { commission: data as Commission[], error };
    }),

  addMilestone: publicProcedure
    .input(
      z.object({
        commissionID: z.string(),
        milestone: z.object({
          content_url: z.string().nullable(),
          desc: z.string().nullable(),
          amount: z.number().nullable(),
        }),
      }),
    )
    .query(async ({ input }) => {
      const supabase = createClient();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data: commissionID, error } = await supabase
        .from("commission")
        .select("*")
        .eq("id", input.commissionID)
        .single();

      if (commissionID == null || !!error) {
        return { error: error };
      }
      const commission = commissionID as Commission;

      const { data: milestoneData, error: milesonesError } = await supabase
        .from("milestones")
        .select("*")
        .eq("commission_id", commission.id);

      if (!!milesonesError || milestoneData == null) {
        return { error: milesonesError };
      }

      const milestones = milestoneData as Milestone[];
      let milestone = {};
      if (milestones.length <= 0) {
        milestone = {
          ...input.milestone,
          commission_id: commission.id,
          order_id: 0,
        };
      } else {
        const next_order_id =
          milestones.length > 0
            ? milestones[milestones.length - 1].order_id + 1
            : 0;
        milestone = { ...input.milestone, order_id: next_order_id };
      }

      milestones.sort((a, b) => {
        return a.order_id - b.order_id;
      });

      const { data: milestoneID, error: milestoneError } = await supabase
        .from("commission")
        .insert([milestone])
        .select("id")
        .single();

      if (milestoneID == null || !!milestoneError) {
        return { error: error };
      }

      return {
        commissionID: commission.id,
        milestoneIDs: milestoneID.id as string,
      };
    }),

  getCommissionAndMilestones: publicProcedure
    .input(
      z.object({
        commissionID: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const supabase = createClient();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data, error } = await supabase
        .from("commissions")
        .select(`*`)
        .eq("id", input.commissionID)
        .single();

      if (!!error) {
        return { commission: null, milestones: null, error };
      }

      const { data: milestonesData, error: milestonesError } = await supabase
        .from("milestones")
        .select(`*`)
        .eq("commission_id", input.commissionID);

      const milestones = milestonesData as Milestone[];
      return { commission: data as Commission, milestones: milestones, error };
    }),
});
