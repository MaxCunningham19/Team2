import Milestone, { type MilestoneProps } from "./milestone";
import { CommissionProps, Commission } from "./commission";

export interface UpfrontCommission {
  price: number;
  milestones: MilestoneProps[];
  artist_id: string;
}

export const UpfrontCommission = (props: UpfrontCommission) => {
  return <Commission />;
};
