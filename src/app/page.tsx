import { api, HydrateClient } from "~/trpc/server";
import SlidingDoorLayout from "./_components/sliding-door";

export default async function Home() {

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center font-serif">
        <SlidingDoorLayout />
      </main>
    </HydrateClient>
  );
}
