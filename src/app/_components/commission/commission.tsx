import { type MilestoneParams, Milestone } from "./milestone";

export const Commission = (props: {
  price: number;
  milestones: MilestoneParams[];
  work_id: string | null;
  artist_id: string;
  created_at: string;
  id: string;
}) => {
  return (
    <div>
      <div>{props.price}</div>

      <div>
        {props.milestones.map((milestone, index) => (
          <Milestone key={index} {...milestone} />
        ))}
      </div>

      <div>{props.work_id}</div>

      <div>{props.artist_id}</div>

      <div>{props.created_at}</div>

      <div>{props.id}</div>
    </div>
  );
};
