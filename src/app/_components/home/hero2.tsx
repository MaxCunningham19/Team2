"use client"
import Image from "next/image";
import PearlEarring from "../../../../public/pearl-earring.jpg"
import { Button } from "../ui/button";

const HomeHero2 = () => {
  return (
    <div className="flex flex-row items-center">
      <div className="relative">
        <h1 className="z-10 max-h-fit max-w-xl text-pretty border-l-4 border-solid border-l-primary pl-3 text-5xl">
          a marketplace for artists and art connoisseurs
        </h1>
        <div className="flex flex-row gap-4 pt-6">
          <Button>Explore</Button>
          <Button>Commission</Button>
          <Button>Sell</Button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={PearlEarring}
          alt="Girl with a pearl earring"
          className="w-96 shadow-xl shadow-neutral-800/80 rounded-sm"
        />
        <div className="absolute bottom-4 left-4 w-64 bg-primary/85 p-2 text-primary-foreground">
          <h3 className="font-bold text-lg">Girl with a Pearl Earring</h3>
          <h3>Johannes Vermeer</h3>
          <h3 className="-mt-1 text-primary-foreground/70">c. 1665</h3>
        </div>
      </div>
    </div>
  )
}

export default HomeHero2;
