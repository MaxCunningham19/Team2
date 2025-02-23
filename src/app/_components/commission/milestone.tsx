export type MilestoneParams = {
  amount: number;
  approved: boolean | null;
  artist_notes: string | null;
  buyer_notes: string | null;
  completed: boolean;
  content_url: string | null;
  desc: string;
  id: string;
};

export const Milestone = (props: MilestoneParams) => {
  return (
    <div>
      <div>{props.amount}</div>

      <div>{props.approved}</div>

      <div>{props.artist_notes}</div>

      <div>{props.buyer_notes}</div>

      <div>{props.completed}</div>

      <div>{props.content_url}</div>

      <div>{props.desc}</div>
    </div>
  );
};
