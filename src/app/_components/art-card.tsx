import Image from "next/image"
import AppleGuy from "../../../../public/apple-guy.jpg"

export const ArtCard = () => {
  return (
    <div className="w-32 h-96 bg-primary">
      <Image src={AppleGuy} alt="Painting" className="w-32" />
    </div>
  )
}
