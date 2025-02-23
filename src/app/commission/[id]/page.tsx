import { api } from "~/trpc/server";
import { Commission } from "src/app/_components/commission/commission";
import { type MilestoneParams } from "~/app/_components/commission/milestone";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { commision, milestones, error } =
    await api.commision.getCommissionAndMilestones({ commisionID: id });

  if (!!error || commision == null) {
    return <div> </div>;
  }
  let milestoneParams: MilestoneParams[] = [];
  if (milestones !== null) {
    milestoneParams = milestones as MilestoneParams[];
  }

  return (
    <Commission
      price={commision.price ?? 0}
      milestones={milestoneParams}
      work_id={commision.work_id}
      artist_id={commision.artist_id}
      created_at={commision.created_at}
      id={commision.id}
    />
  );
}
