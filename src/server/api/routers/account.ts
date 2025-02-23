import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createClient } from "@/utils/supabase/client";
import type { Artist, User } from "src/utils/supabase/types";

export const accountRouter = createTRPCRouter({
  getUserAndArtist: publicProcedure.query(async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user == null) {
      return { user: null, artist: null };
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    const userData = data as User | null;

    if (userData == null) {
      return { user: null, artist: null };
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: artistData } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userData.artist_id)
      .single();

    const artist = artistData as Artist | null;

    return { user: userData, artist: artist };
  }),

  getUserID: publicProcedure.query(async () => {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    return { userID: user.data.user?.id };
  }),

  getArtist: publicProcedure
    .input(z.object({ artist_id: z.string() }))
    .query(async ({ input }) => {
      const supabase = createClient();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data } = await supabase
        .from("artists")
        .select("*")
        .eq("id", input.artist_id)
        .single();

      const artist = data as Artist | null;

      if (artist == null) {
        return { artist: null };
      }

      return { artist: artist };
    }),
});
