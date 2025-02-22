import Image from "next/image"
import PearlEarring from "../../../../public/pearl-earring.jpg"
import { Button } from "~/app/_components/ui/button"
import { ArtCard } from "~/app/_components/art-card"

export default async function Page({
	params,
}: {
	params: Promise<{ artist: string }>
}) {
	const slug = (await params).artist
	console.log(slug)

	return (
		<>
			<div className="h-80 w-screen bg-primary"></div>
			<div className="relative flex flex-col">
				<Image src={PearlEarring} alt="Artist icon" className="absolute -top-32 left-32 h-64 w-64 rounded-full" />
				<div className="ml-96 p-4">
					<h1 className="text-5xl font-bold">Placeholder Name</h1>

					<h2 className="flex flex-row gap-x-2 text-xl font-extralight">
						<span>/{slug}</span>
						⋅
						<span>Joined 2 years ago</span>
					</h2>

					<div className="flex flex-row gap-x-4 pt-2">
						<Button>Commission</Button>
						<Button>Follow</Button>
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
	)
}
