import Image from "next/image"
import AppleGuy from "../../../public/apple-guy.jpg"

export const ArtCard = () => {
  return (
    <div className="h-[32rem] w-64 bg-primary">
      <Image src={AppleGuy} alt="Painting" className="w-64" />
      <div className="p-4 text-primary-foreground">
        <h3 className="text-2xl font-bold">Untitled 3</h3>
        <h4 className="italic">$400</h4>
      </div>
    </div>
  )
}
