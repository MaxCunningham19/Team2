import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { type Artist } from "~/utils/supabase/types";

export const artistRouter = createTRPCRouter({
  getArtistID: publicProcedure.query(async () => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user == null) {
      return { artist_id: "" };
    }

    const { data, error } = await supabase
      .from("users")
      .select("artist_id")
      .eq("id", user.id)
      .single();

    if (error !== null) {
      return { artist_id: "" };
    }
    return { artist_id: data.artist_id as string };
  }),

  getArtist: publicProcedure
    .input(z.object({ id: z.string().nullish() }))
    .query(async ({ input }) => {
      const supabase = await createClient();

      if (!!input.id) {
        return { artist: null };
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data, error } = await supabase
        .from("artists")
        .select("*")
        .eq("id", input.id)
        .single();

      if (error !== null) {
        return { artist: null };
      }
      return { artist: data as Artist };
    }),
});
