import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex font-serif min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extralight tracking-tight sm:text-[5rem]">
            novanti
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-primary text-primary-foreground p-4 hover:bg-primary/90"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps → (Primary)</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-secondary text-secondary-foreground p-4 hover:bg-secondary/90"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation → (Secondary)</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-accent text-accent-foreground p-4 hover:bg-accent/90"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps → (Accent)</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
          </div>

          <LatestPost />
        </div>
      </main>
    </HydrateClient>
  );
}
