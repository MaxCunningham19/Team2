import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createClient } from "@/utils/supabase/server";

export const commisionRouter = createTRPCRouter({
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
});
