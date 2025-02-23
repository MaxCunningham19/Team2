import HomeHero2 from "./_components/home/hero2";
import SlidingDoorLayout from "./_components/home/sliding-door";

export default async function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center font-serif">
      <SlidingDoorLayout>
        <div className="flex h-screen flex-col items-center justify-center">
          <HomeHero2 />
        </div>
      </SlidingDoorLayout>
    </main>
  );
}
