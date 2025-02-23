import { EmptyWorkCard } from "~/app/_components/work/empty-work-card";
import { WorkCard } from "~/app/_components/work/work-card";
import { api } from "~/trpc/server";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { work } = await api.work.getWork({ id: id });
  const { artist } = await api.artist.getArtist({ id: work?.artist_id });

  if (work == null || artist == null) {
    return <EmptyWorkCard />;
  }

  return (
    <div>
      <WorkCard
        title={work.title}
        artist={{
          artistID: artist.id,
          artistName: artist.display_name ?? artist.id,
        }}
        display_url={work.image_url}
        price={work.price ?? 0}
        desc={work.desc ?? ""}
      />
    </div>
  );
}
