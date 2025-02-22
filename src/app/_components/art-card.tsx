import Image from "next/image"
import AppleGuy from "../../../public/apple-guy.jpg"
import Pearl from "../../../public/pearl-earring.jpg"
import { Button } from "./ui/button"

export const ArtCard = () => {
  return (
    <div className="h-[32rem] w-64 bg-accent">
      <Image src={AppleGuy} alt="Painting" className="w-64" />
      <div className="p-4 text-primary-foreground">
        <h3 className="text-2xl font-bold">Untitled 3</h3>
        <h4 className="italic">$400</h4>
        <p>The artist has not provided a description for this piece.</p>
        <Button className="mt-2">Purchase</Button>
      </div>
    </div>
  )
}
