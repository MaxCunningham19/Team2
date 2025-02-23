import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createClient } from "@/utils/supabase/client";
import { type commission, type Milestone } from "src/utils/supabase/types";

export const updateRouter = createTRPCRouter({});
