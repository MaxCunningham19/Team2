export const Milestone = (props: {
    price: number;
    work_id: string;
    artist_id: string;
    created_at: string;
    id: string;
  }) => {
    return (
      <div>
        <div>{props.price}</div>
  
        <div>{props.work_id}</div>
  
        <div>{props.artist_id}</div>
  
        <div>{props.created_at}</div>
  
        <div>{props.id}</div>
      </div>
    );
  };
  