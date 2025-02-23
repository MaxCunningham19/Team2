import Milestone, { MilestoneProps } from "./milestone";

export interface CommissionProps {
    price: number;
    milestones: MilestoneProps[];
    work_id: string;
    artist_id: string;
    created_at: string;
    user_id: string;
    id: string;
}

export const Commission = (props: CommissionProps) => {
    return (
        <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300"></div>
            <div className="space-y-12">
                {props.milestones.map((milestone, index) => (
                    <Milestone key={index} {...milestone} isLast={index === props.milestones.length - 1} />
                ))}
            </div>
        </div>
    );
};
