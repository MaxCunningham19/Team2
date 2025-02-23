import { WorkCard } from "./work-card";

export const EmptyWorkCard = () => {
  // TODO
  return (
    <WorkCard
      title={"404"}
      artist={{
        artistID: "404",
        artistName: "404",
      }}
      display_url={""}
      price={0}
      desc={"404"}
    />
  );
};
