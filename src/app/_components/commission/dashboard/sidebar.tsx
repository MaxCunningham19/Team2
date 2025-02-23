import { CommissionCard } from "./commission-card"

export const CommissionsSidebar = () => {
  return (
    <div className="h-3/4 w-80 space-y-4 overflow-y-scroll rounded-lg border-2 border-primary bg-gray-100 p-4">
      <h1 className="font-bold font-sans">Your Commissions</h1>
      <CommissionCard />
      <CommissionCard />
      <CommissionCard />
      <CommissionCard />
      <CommissionCard />
      <CommissionCard />
    </div>
  )
}
