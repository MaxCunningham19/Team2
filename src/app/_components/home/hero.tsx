"use client"
import Image from "next/image";
import PearlEarring from "../../../../public/pearl-earring.jpg"
import AppleGuy from "../../../../public/apple-guy.jpg"
import Scream from "../../../../public/scream.jpg"

const paintings = [PearlEarring, AppleGuy, Scream];

function getRandomIntExcluding(exclMin: number, exclMax: number): number {
  let result: number;
  do {
    result = Math.floor(Math.random() * 71); // generates a number between 0 and 80
  } while (result >= exclMin && result <= exclMax);     // reroll if in the range 40-50
  return result;
}

const HomeHero = () => {
  return (
    <>
      {
        paintings.map((painting) => {
          return (
            <Image
              key={painting.src}
              src={painting}
              alt="Girl with a pearl earring"
              className="absolute shadow-neutral-800/50 shadow-lg w-48"
              style={{ top: `${getRandomIntExcluding(10, 60)}%`, left: `${getRandomIntExcluding(10, 70)}%` }}
            />
          )
        })
      }
      <h1 className="text-5xl max-w-xl text-pretty border-l-primary border-l-4 border-dotted pl-3">
        a marketplace for artists and connoisseurs
      </h1>
    </>
  )
}

export default HomeHero;
