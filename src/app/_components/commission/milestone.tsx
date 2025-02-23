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
  order_id: number;
  id: string;
  isLast: boolean;
}

export default function Milestone(props: MilestoneProps) {
  return (
    <div className="relative">
      <div className="flex items-center">
        <div className="bg-primary z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
          <span className="font-bold text-white">{props.percent}%</span>
        </div>
        <div className="ml-4 flex-grow sm:ml-6">
          <h3 className="text-lg font-medium text-gray-900">{props.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{props.desc}</p>
          <p className="text-primary mt-1 text-sm font-semibold">
            {props.amount}
          </p>
        </div>
      </div>
      {!props.isLast && (
        <div className="absolute left-6 top-12 -ml-px h-full w-0.5 bg-gray-300"></div>
      )}
    </div>
  );
}
