import Image from "next/image"
import PearlEarring from "../../../../../public/pearl-earring.jpg"
import { type Commission } from "~/utils/supabase/types"
import { Commission as CommComponent } from "../commission"
import { threeStepMilestones } from "../three-step-commission"


export const ProgressView = ({ currentCommission }: { currentCommission: Commission }) => {
  return (
    <div className="h-3/4 w-[45rem] space-y-4 rounded-lg border-2 border-primary bg-gray-100 p-4">
      <div className="flex flex-row items-center space-x-4">
        <Image className="h-12 w-12 rounded-full" src={PearlEarring} alt="Pearl earring" />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{currentCommission.desc}</h1>
          <h3 className="flex flex-row gap-x-2">
            {currentCommission.artist_id}
            <span>⋅</span>
            <span className="text-accent/80">In Progress</span>
          </h3>
        </div>
      </div>

      <div className="my-auto">
        <CommComponent
          price={currentCommission.price ?? 1}
          milestones={threeStepMilestones(currentCommission.price ?? 1)}
          artist_id={currentCommission.artist_id}
          user_id={currentCommission.user_id}
          id={currentCommission.id}
        />
      </div>
    </div>
  )
}
