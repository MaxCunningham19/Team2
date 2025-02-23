import Image from "next/image"
import PearlEarring from "../../../../../public/pearl-earring.jpg"

export const ProgressView = () => {
  return (
    <div className="h-3/4 w-[45rem] space-y-4 rounded-lg border-2 border-primary bg-gray-100 p-4">
      <div className="flex flex-row items-center space-x-4">
        <Image className="h-12 w-12 rounded-full" src={PearlEarring} alt="Pearl earring" />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Girl with a Pearl Earring</h1>
          <h3 className="flex flex-row gap-x-2">
            Johannes Vermeer
            <span>⋅</span>
            <span className="text-accent/80">In Progress - Stage 2/3 </span>
          </h3>
        </div>
      </div>
    </div>
  )
}
