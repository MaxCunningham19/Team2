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

  const { error } = await supabase
    .from("commission")
    .insert([params.commission])
    .eq("id", params.commission.id)

  if (!!error) {
    return { error: error };
  }

  if (params.milestones.length <= 0) {
    return { commissionID: params.commission.id as string };
  }

  const milestonesWithCommissionId = params.milestones.map((milestone) => ({
    ...milestone,
    commission_id: params.commission.id as string, // Add commission ID to each milestone
  }));

  milestonesWithCommissionId.sort((a, b) => {
    return a.order_id - b.order_id;
  });
  const { data: milestoneIDs, error: milesoneError } = await supabase
    .from("milestones")
    .insert([milestonesWithCommissionId])
    .select("id");

  if (!!error) {
    const { error: deleteError } = await supabase
      .from("commission")
      .delete()
      .eq("id", params.commission.id);

    return { error: milesoneError, deleted: !deleteError };
  }

  return {
    commissionID: params.commission.id as string,
    milestoneIDs: milestoneIDs as string[] | null,
  };
};

export const getUser = async function () {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? "";
};
