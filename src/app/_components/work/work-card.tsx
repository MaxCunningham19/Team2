export interface WorkCardProps {
  title: string;
  artist: { artistID: string; artistName: string };
  display_url: string;
  price: number;
  desc: string;
}

export const WorkCard = (props: WorkCardProps) => {
  return (
    <div>
      <div>{props.title}</div>

      <div>{props.artist.artistName}</div>

      <a href={`/artist/${props.artist.artistID}`}> {props.artist.artistID}</a>

      <div>{props.display_url}</div>

      <div>{props.price}</div>

      <div>{props.desc}</div>
    </div>
  );
};
