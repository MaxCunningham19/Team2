import { api } from "~/trpc/server";
import { Commission } from "src/app/_components/commission/commission";
import { type MilestoneProps } from "~/app/_components/commission/milestone";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { commission, milestones, error } = await api.commission.getCommissionAndMilestones({ commissionID: id });

  if (!!error || commission == null) {
    return <div> </div>;
  }

  const { user, artist } = await api.account.getUserAndArtist();

  if (
    user == null ||
    user.id != commission.user_id ||
    artist?.id != commission.artist_id
  ) {
    return <div></div>;
  }

  let milestoneProps: MilestoneProps[] = [];
  if (milestones !== null) {
    milestoneProps = milestones as MilestoneProps[];
  }

  return (
    <Commission
      price={commission.price ?? 0}
      milestones={milestoneProps}
      work_id={commission.work_id ?? ""}
      artist_id={commission.artist_id}
      created_at={commission.created_at}
      user_id={commission.user_id}
      id={commission.id}
    />
  );
}
