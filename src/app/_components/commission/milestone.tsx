import type { ReactNode } from "react"

export interface MilestoneProps {
  amount: number;
  percent: number;
  approved: boolean | null;
  artist_notes: string | null;
  buyer_notes: string | null;
  completed: boolean;
  content_url: string | null;
  title: string;
  desc: string;
  order_id?: number;
  id?: string;
  isLast?: boolean;
}

export default function Milestone(props: MilestoneProps): ReactNode {
  return (
    <div className="relative">
      <div className="flex items-center">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center z-10">
          {props.percent}
        </div>
        <div className="flex-grow ml-4 sm:ml-6">
          <h3 className="text-lg font-medium text-gray-900">{props.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{props.desc}</p>
          <p className="mt-1 text-sm font-semibold text-primary">{props.amount}</p>
        </div>
      </div>
      {!props.isLast && <div className="absolute top-12 left-6 -ml-px w-0.5 h-full bg-gray-300"></div>}
    </div>
  )
}

