import { type Commission } from "~/utils/supabase/types";

import PearlEarring from "../../../../../public/pearl-earring.jpg"
import Image from "next/image";

// { commission }: { comission: Commission }

export const CommissionCard = () => {
  return (
    <div className="border-[1px] flex h-24 w-full flex-row items-center rounded-lg border-primary/60 bg-primary/20 p-2">
      <Image className="h-12 w-12 rounded-full" src={PearlEarring} alt="Pearl earring" />
      <div className="flex flex-col pl-2">
        <h2 className="font-bold">Girl with Pearl Earring</h2>
        <h3 className="-mt-1">Johannes Vermeer</h3>
        <h3 className="text-accent/80 text-sm">In Progress - Stage 2/3</h3>
      </div>
    </div>
  )
}
