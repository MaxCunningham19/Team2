import Milestone, { type MilestoneProps } from "./milestone";
import { CommissionProps, Commission } from "./commission";

export interface UpfrontCommission {
  price: number;
  artist_id: string;
  user_id: string;
}

export const UpfrontCommission = (props: UpfrontCommission) => {
  return (
    <Commission
      price={props.price}
      milestones={[
        {
          amount: props.price,
          percent: 100,
          approved: false,
          artist_notes: "",
          buyer_notes: "",
          completed: false,
          content_url: null,
          title: "Upfront Payment",
          desc: "pay commission before recieving work",
          order_id: 0,
          isLast: true,
        },
      ]}
      artist_id={props.artist_id}
      user_id={props.user_id}
      id={""}
    />
  );
};
