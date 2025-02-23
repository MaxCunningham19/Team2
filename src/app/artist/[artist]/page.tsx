import Image from "next/image";
import PearlEarring from "../../../../public/pearl-earring.jpg";
import { Button } from "~/app/_components/ui/button";
import { ArtCard } from "~/app/_components/art-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateNewWorkDialog } from "~/app/_components/artist-page/create-new-work-dialog";
import { EditProfileDialog } from "~/app/_components/artist-page/edit-profile-dialog";
import { api } from "~/trpc/server";

export default async function Page({
  params,
}: {
  params: Promise<{ artist: string }>;
}) {
  const slug = (await params).artist;
  const { artist_id } = await api.artist.getArtistID();
  const isArtist = slug === artist_id; // Change this to an API call that checks if the `slug` == user.artistID
  console.log(slug);
  console.log(artist_id);

  return (
    <>
      <div className="bg-primary h-80 w-screen"></div>
      <div className="relative flex flex-col">
        <Image
          src={PearlEarring}
          alt="Artist icon"
          className="absolute -top-32 left-32 h-64 w-64 rounded-full"
        />
        <div className="ml-96 p-4">
          <h1 className="text-5xl font-bold">Placeholder Name</h1>

          <h2 className="flex flex-row gap-x-2 text-xl font-extralight">
            <span>/{slug}</span>⋅<span>Joined 2 years ago</span>
          </h2>

          <div className="flex flex-row gap-x-4 pt-2">
            {isArtist ? (
              <>
                <EditProfileDialog />
                <CreateNewWorkDialog />
              </>
            ) : (
              <>
                <Button>Commission</Button>
                <Button>Follow</Button>
              </>
            )}
          </div>
        </div>
        <div className="mx-auto mt-10 grid grid-cols-3 gap-x-32 gap-y-20">
          <ArtCard />
          <ArtCard />
          <ArtCard />
          <ArtCard />
          <ArtCard />
          <ArtCard />
          <ArtCard />
          <ArtCard />
          <ArtCard />
          <ArtCard />
          <ArtCard />
        </div>
      </div>
    </>
  );
}
