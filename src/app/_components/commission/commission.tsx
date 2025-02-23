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
    <div className="relative">
      <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 transform bg-gray-300"></div>
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
