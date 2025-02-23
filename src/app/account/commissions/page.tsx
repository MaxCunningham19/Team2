import { ProgressView } from "~/app/_components/commission/dashboard/progress-view";
import { CommissionsSidebar } from "~/app/_components/commission/dashboard/sidebar";

export default async function Commissions() {
  return (
    <main className="pt-32 flex h-screen space-x-4 w-full items-center justify-center">
      <CommissionsSidebar />
      <ProgressView />
    </main>
  )
}
