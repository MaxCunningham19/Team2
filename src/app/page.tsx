import HomeHero2 from "./_components/home/hero2";
import SlidingDoorLayout from "./_components/home/sliding-door";
import { Search } from "lucide-react";

export default async function Home() {

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center font-serif">
      <SlidingDoorLayout>
        <div className="flex flex-col h-screen items-center justify-center">
          <HomeHero2 />

          {/*
          <div className="mx-auto w-full max-w-xl px-4 ">
            <div className="relative">
              <input
                type="text"
                className="h-12 w-full rounded-lg border border-gray-200 pl-4 pr-10 focus:border-gray-400 focus:outline-none"
                placeholder="Search..."
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          */}
        </div>
      </SlidingDoorLayout>
    </main>
  );
}
