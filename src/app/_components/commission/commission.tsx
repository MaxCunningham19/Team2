import Milestone, { type MilestoneProps } from "./milestone";

export interface CommissionProps {
  price: number;
  milestones: MilestoneProps[];
  work_id?: string;
  artist_id: string;
  created_at?: string;
  user_id: string;
  id?: string;
}

export const Commission = (props: CommissionProps) => {
  return (
    <div className="relative align-middle">
      <div className="space-y-12">
        {props.milestones.map((milestone, index) => (
          <Milestone
            key={index}
            {...milestone}
            isLast={index === props.milestones.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
