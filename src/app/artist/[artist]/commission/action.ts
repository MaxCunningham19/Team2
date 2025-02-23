import { api } from "~/trpc/server";

export const createCommission = async function (params: {
  artist_id: string;
  price: number;
  desc: string;
}) {
  const { commissionID, milestoneIDs, error } =
    await api.commission.create.commission({
      commission: params,
      milestones: [],
    });
  return { commissionID, milestoneIDs, error };
};

export const getUser = async function () {
  const { user } = await api.account.getUserAndArtist();
  return user;
};
