import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { stripeRouter } from "./routers/stripe/stripe";
import { commisionRouter } from "./routers/commsion";
import { artistRouter } from "./routers/artist";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  stripe: stripeRouter,
  commision: commisionRouter,
  artist: artistRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
