import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { type Work } from "~/utils/supabase/types";
import { TRPCError } from "@trpc/server";

export const workRouter = createTRPCRouter({
  getWork: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const supabase = await createClient();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data, error } = await supabase
        .from("works")
        .select("*")
        .eq("id", input.id)
        .single();

      if (error !== null) {
        return { work: null };
      }

      return { work: data as Work };
    }),

  getAllWorks: publicProcedure
    .query(async () => {
      const supabase = await createClient();
      const { data: works, error } = await supabase.from("works").select("*");

      console.log(works)

      if (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch works',
        });
      }

      if (!works) {
        return [];
      }

      return works as Work[];
    })
});
