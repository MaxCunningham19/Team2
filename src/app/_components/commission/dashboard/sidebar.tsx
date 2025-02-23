"use client"
import { useState } from "react"
import { CommissionCard } from "./commission-card"
import { type Commission } from "~/utils/supabase/types"

interface Props {
  userCommissions: Commission[],
  artistCommissions: Commission[]
}

export const CommissionsSidebar = ({ userCommissions, artistCommissions }: Props) => {
  const [selectedCommission, setSelectedCommission] = useState<Commission>();

  return (
    <div className="h-3/4 w-80 space-y-4 rounded-lg border-2 border-primary bg-gray-100 p-4">
      {((userCommissions?.length ?? 0) == 0 && (artistCommissions?.length ?? 0) == 0) ?
        <h1 className="font-bold font-sans">You currently have no commissions!</h1>
        : null}

      {
        artistCommissions?.length > 0 ?
          <>
            <h1 className="font-bold font-sans">Your Commissions (Artist)</h1>
            {
              artistCommissions?.map((comm) => (
                <CommissionCard
                  thisCommission={comm}
                  selectedCommission={selectedCommission}
                  setSelectedCommission={setSelectedCommission}
                  key={comm.id}
                />
              ))
            } </> : null
      }

      {
        userCommissions?.length > 0 ?
          <>
            <h1 className="font-bold font-sans">Your Commissions (Customer)</h1>
            {
              userCommissions?.map((comm) => (
                <CommissionCard key={comm.id} />
              ))
            } </> : null
      }
    </div>
  )
}
