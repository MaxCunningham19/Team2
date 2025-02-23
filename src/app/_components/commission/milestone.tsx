export const Milestone = (props: {
  amount: number;
  approved: boolean | null;
  artist_notes: string | null;
  buyer_notes: string | null;
  commission_id: string | null;
  completed: boolean;
  content_url: string | null;
  desc: string;
  id: string;
}) => {
  return (
    <div>
      <div>{props.amount}</div>

      <div>{props.approved}</div>

      <div>{props.artist_notes}</div>

      <a href={`/artist/${props.artist.artistID}`}> {props.artist.artistID}</a>

      <div>{props.display_url}</div>

      <div>{props.price}</div>

      <div>{props.desc}</div>
    </div>
  );
};
