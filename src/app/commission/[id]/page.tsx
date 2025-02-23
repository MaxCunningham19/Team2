import { api } from "~/trpc/server";
import { Commission } from "src/app/_components/commission/commission";
import { type MilestoneProps } from "~/app/_components/commission/milestone";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { commission, milestones, error } =
    await api.commission.getCommissionAndMilestones({ commissionID: id });

  if (!!error || commission == null) {
    redirect("/error");
  }

  const { user, artist } = await api.account.getUserAndArtist();

  if (
    user == null ||
    user.id != commission.user_id ||
    artist?.id != commission.artist_id ||
    commission.price == null
  ) {
    redirect("/error/no_access");
  }

  let milestoneProps: MilestoneProps[] = [];
  if (milestones !== null) {
    milestones.sort((a, b) => {
      return a.order_id - b.order_id;
    });
    milestoneProps = milestones.map((milestone, index) => {
      return {
        ...milestone,
        percent: milestone.amount / (commission.price ?? milestone.amount),
        isLast: index == milestones.length - 1,
      };
    });
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
