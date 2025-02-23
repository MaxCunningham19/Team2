"use server";
import { createClient } from "@/utils/supabase/server";
import {
  type CommissionInsert,
  type MilestoneInsert,
} from "~/utils/supabase/types";

export const createCommission = async function (params: {
  commission: CommissionInsert;
  milestones: MilestoneInsert[];
}) {
  const supabase = await createClient();

  console.log("commision", params.commission);

  const { data: commisionData, error } = await supabase
    .from("commissions")
    .insert([
      {
        artist_id: params.commission.artist_id,
        // created_at: params.commission.created_at,
        desc: params.commission.desc,
        price: params.commission.price,
        user_id: params.commission.user_id,
        work_id: params.commission.work_id,
      },
    ])
    .select("id")
    .single();

  if (!!error) {
    console.log("error", error);
    return { error: error };
  }

  if (params.milestones.length <= 0) {
    return { commissionID: commisionData.id as string };
  }

  const milestonesWithCommissionId = params.milestones.map((milestone) => ({
    order_id: milestone.order_id,
    amount: milestone.amount,
    desc: milestone.desc || "",
    title: milestone.title || "",
    pending: true,
    commission_id: commisionData.id as string, // Add commission ID to each milestone
  }));

  milestonesWithCommissionId.sort((a, b) => {
    return a.order_id - b.order_id;
  });

  console.log(milestonesWithCommissionId);
  const { data: milestoneIDs, error: milesoneError } = await supabase
    .from("milestones")
    .insert(milestonesWithCommissionId)
    .select("id");

  if (!!milesoneError) {
    console.log("milesoneError", milesoneError);
    const { error: deleteError } = await supabase
      .from("commissions")
      .delete()
      .eq("id", commisionData.id);
    console.log("deletedError", deleteError);
    return { error: milesoneError, deleted: !deleteError };
  }

  return {
    commissionID: commisionData.id as string,
    milestoneIDs: milestoneIDs as unknown as string[] | null,
  };
};

export const getUser = async function () {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? "";
};
