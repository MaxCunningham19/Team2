"use client"
import Image from "next/image";
import PearlEarring from "../../../../public/pearl-earring.jpg"

const HomeHero2 = () => {
  return (
    <div className="flex flex-row items-center">
      <h1 className="max-h-fit max-w-xl text-pretty border-l-4 border-dotted border-l-primary pl-3 text-5xl">
        a marketplace for artists and connoisseurs
      </h1>
      <Image
        src={PearlEarring}
        alt="Girl with a pearl earring"
        className="w-96 shadow-lg shadow-neutral-800/50"
      />
    </div>
  )
}

export default HomeHero2;
