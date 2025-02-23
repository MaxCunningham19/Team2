import { ProgressView } from "~/app/_components/commission/dashboard/progress-view";
import { CommissionsSidebar } from "~/app/_components/commission/dashboard/sidebar";
import { api } from "~/trpc/server";

export default async function Commissions() {
  const userID = await api.account.getUserID();
  const getUser = await api.account.getUser({ userID: userID.userID ?? "" })

  const allUserCommissions = await api.commission.getCommissionsByUserID({ userID: userID.userID ?? "" })
  const allArtistCommissions = await api.commission.getCommissionsByArtistID({ artistID: getUser.user?.artist_id ?? "" })

  return (
    <main className="pt-32 flex h-screen space-x-4 w-full items-center justify-center">
      <CommissionsSidebar userCommissions={allUserCommissions.commission} artistCommissions={allArtistCommissions.commission} />
      <ProgressView />
    </main>
  )
}
