import { api } from "~/trpc/server";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { commision, milestones, error } =
    await api.commision.getCommissionAndMilestones({ commisionID: id });

  if (!!error) {
    return <div> </div>;
  }

  return <div></div>;
}
