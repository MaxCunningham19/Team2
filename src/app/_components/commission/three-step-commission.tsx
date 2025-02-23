import Milestone, { type MilestoneProps } from "./milestone";
import { CommissionProps, Commission } from "./commission";

export interface UpfrontCommission {
  price: number;
  artist_id: string;
  user_id: string;
}

export const milestones = function (price: number) {
  return [
    {
      amount: price / 2,
      percent: 50,
      approved: false,
      artist_notes: "",
      buyer_notes: "",
      completed: false,
      content_url: null,
      title: "Inital Payment",
      desc: "Inital payment to initate commition",
      order_id: 0,
      isLast: false,
    },
    {
      amount: (price / 100) * 20,
      percent: 20,
      approved: false,
      artist_notes: "",
      buyer_notes: "",
      completed: false,
      content_url: null,
      title: "Proof of Work",
      desc: "a midway review and follow up payment",
      order_id: 1,
      isLast: false,
    },
    {
      amount: (price / 100) * 30,
      percent: 30,
      approved: false,
      artist_notes: "",
      buyer_notes: "",
      completed: false,
      content_url: null,
      title: "Final Payment",
      desc: "pay commission upon completion of work",
      order_id: 2,
      isLast: false,
    },
  ];
};

export const ThreeStepCommission = (props: UpfrontCommission) => {
  return (
    <Commission
      price={props.price}
      milestones={milestones(props.price)}
      artist_id={props.artist_id}
      user_id={props.user_id}
      id={""}
    />
  );
};
