import { Commission, Milestone } from "~/utils/supabase/types";

export const getFakeData = function (
  id: string,
  price: number,
  user_id: string,
  artist_id: string,
) {
  const commission: Commission = {
    user_id: user_id,
    artist_id: artist_id,
    created_at: "1234",
    id: id,
    price: price,
    work_id: null,
  };

  const milestones: Milestone[] = [
    {
      amount: price / 2,
      approved: false,
      artist_notes: null,
      buyer_notes: null,
      commission_id: id,
      completed: false,
      content_url: null,
      desc: "1",
      id: "1",
      order_id: 0,
      title: "1",
    },
    {
      amount: price / 2,
      approved: false,
      artist_notes: null,
      buyer_notes: null,
      commission_id: id,
      completed: false,
      content_url: null,
      desc: "1",
      id: "1",
      order_id: 0,
      title: "1",
    },
  ];

  return { commission, milestones };
};
