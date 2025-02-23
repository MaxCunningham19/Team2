import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createClient } from "@/utils/supabase/client";
import { type Commission, type Milestone } from "src/utils/supabase/types";

export const commissionRouter = createTRPCRouter({
  createcommission: publicProcedure
    .input(
      z.object({
        commission: z.custom<Commission>(),
      }),
    )
    .query(async ({ input }) => {
      const supabase = createClient();
      const { error } = await supabase
        .from("commissions")
        .insert(input.commission);

      return { error };
    }),

  getcommission: publicProcedure
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
      return { commission: data as Commission, error };
    }),

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

  getMilestones: publicProcedure
    .input(
      z.object({
        commissionID: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const supabase = createClient();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data, error } = await supabase
        .from("milestones")
        .select(`*`)
        .eq("commission_id", input.commissionID);

      const milestones = data as Milestone[];
      milestones.sort((a, b) => {
        return a.order_id - b.order_id;
      });
      return { milestones: milestones, error };
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

  updatecommission: publicProcedure
    .input(
      z.object({
        commissionID: z.string(),
        commission: z.object({
          artist_id: z.string().nullable(),
          created_at: z.string().nullable(),
          id: z.string().nullable(),
          price: z.number().nullable(),
          work_id: z.string().nullable(),
        }),
        milesones: z.array(
          z.object({
            amount: z.number().nullable(),
            approved: z.boolean().nullable(),
            artist_notes: z.string().nullable(),
            buyer_notes: z.string().nullable(),
            completed: z.boolean().nullable(),
            content_url: z.string().nullable(),
            desc: z.string().nullable(),
            id: z.string(),
            order_id: z.string().nullable(),
          }),
        ),
      }),
    )
    .query(async ({ input }) => {
      const supabase = createClient();

      // Prepare the update data for the commission
      const updateData: Record<string, string | number> = {};

      if (input.commission.artist_id !== null)
        updateData.artist_id = input.commission.artist_id;
      if (input.commission.created_at !== null)
        updateData.created_at = input.commission.created_at;
      if (input.commission.id !== null) updateData.id = input.commission.id;
      if (input.commission.price !== null)
        updateData.price = input.commission.price;
      if (input.commission.work_id !== null)
        updateData.work_id = input.commission.work_id;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data: commissionData, error: commissionError } = await supabase
        .from("commissions")
        .update(updateData)
        .eq("commission_id", input.commissionID)
        .select()
        .single();

      if (commissionError) {
        return { commission: null, milesones: null, error: commissionError };
      }

      // Prepare update data for milestones
      const milestoneUpdateErrors = [];
      const milestoneData: Milestone[] = [];

      if (input.milesones.length > 0) {
        for (const milestone of input.milesones) {
          const milestoneUpdateData: Record<string, number | string | boolean> =
            {};

          if (milestone.amount !== null)
            milestoneUpdateData.amount = milestone.amount;
          if (milestone.approved !== null)
            milestoneUpdateData.approved = milestone.approved;
          if (milestone.artist_notes !== null)
            milestoneUpdateData.artist_notes = milestone.artist_notes;
          if (milestone.buyer_notes !== null)
            milestoneUpdateData.buyer_notes = milestone.buyer_notes;
          if (milestone.completed !== null)
            milestoneUpdateData.completed = milestone.completed;
          if (milestone.content_url !== null)
            milestoneUpdateData.content_url = milestone.content_url;
          if (milestone.desc !== null)
            milestoneUpdateData.desc = milestone.desc;
          if (milestone.order_id !== null)
            milestoneUpdateData.order_id = milestone.order_id;

          if (Object.keys(milestoneUpdateData).length > 0) {
            const { data, error } = await supabase
              .from("milestones")
              .update(milestoneUpdateData)
              .eq("id", milestone.id) // Assuming milestone ID is provided
              .eq("commission_id", input.commissionID) // Ensure this milestone matches the commission ID
              .select();
            if (error) {
              milestoneUpdateErrors.push(error);
            } else {
              milestoneData.push(data as unknown as Milestone);
            }
          }
        }
      }

      if (milestoneUpdateErrors.length > 0) {
        return {
          commission: commissionData as Commission,
          milesones: milestoneData,
          error: milestoneUpdateErrors,
        };
      }

      return {
        commission: commissionData as Commission,
        milesones: milestoneData,
        error: null,
      };
    }),

  updateMilestone: publicProcedure
    .input(
      z.object({
        amount: z.number().nullable(),
        approved: z.boolean().nullable(),
        artist_notes: z.string().nullable(),
        buyer_notes: z.string().nullable(),
        completed: z.boolean().nullable(),
        content_url: z.string().nullable(),
        desc: z.string().nullable(),
        id: z.string().nullable(),
        order_id: z.string().nullable(),
      }),
    )
    .query(async ({ input }) => {
      const supabase = createClient();

      // Prepare the update data for the commission
      const updateData: Record<string, string | number | boolean> = {};

      if (input.amount !== null) updateData.amount = input.amount;
      if (input.approved !== null) updateData.approved = input.approved;
      if (input.artist_notes !== null)
        updateData.artist_notes = input.artist_notes;
      if (input.buyer_notes !== null)
        updateData.buyer_notes = input.buyer_notes;
      if (input.completed !== null) updateData.completed = input.completed;
      if (input.content_url !== null)
        updateData.content_url = input.content_url;
      if (input.order_id !== null) updateData.order_id = input.order_id;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data, error } = await supabase
        .from("milestones")
        .update(updateData)
        .eq("id", input.id)
        .select()
        .single();

      return { data: data as Milestone, error };
    }),
});
