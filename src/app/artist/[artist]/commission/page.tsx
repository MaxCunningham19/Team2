"use client"

import { redirect, useParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { api } from "~/trpc/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { createCommission, getUser } from "./action";
import {
    UpfrontCommission,
    upfrontMilestones,
} from "@/components/commission/upfront_commission";
import {
    FifteyFifteyCommission,
    fifteyFifteyMilestones,
} from "@/components/commission/fiftey-fiftey-commission";
import {
    ThreeStepCommission,
    threeStepMilestones,
} from "@/components/commission/three-step-commission";

export default function NewCommission({ params }: { params: {id: string} }) {
    const artistId = usePathname().split("/")[2];
    const [user, setUser] = useState<null | string | undefined>(null);
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState("");
    const [artistName, setArtistName] = useState<string>("");
    console.log("String params", artistId);
    const artistData = api.artist.getArtist.useQuery({ id: artistId });

    console.log("Artist data", artistData);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userData = await getUser();
                setUser(userData);
            } catch (error) {
                redirect("/login");
            }
        }
        void fetchUserData();
    }, []);

    // Handle redirect if user is not fetched
    if (user === undefined) {
        redirect("/login");
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-center h-full">
            <Card className="mx-auto w-full max-w-md p-4">
                <CardHeader>
                    <CardTitle>Create a New Commission for {artistData.data?.artist?.display_name}</CardTitle>
                    <CardDescription>
                        Enter the details of your commission below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <label className="mb-1 block">Description:</label>
                        <Textarea
                            className="w-full"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Enter commission details"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-1 block">Price:</label>
                        <Input
                            type="number"
                            className="w-full"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            min="0"
                        />
                    </div>
                    <div className="flex flex-auto items-start">
                        <Button
                            onClick={async () => {
                                const { commissionID, milestoneIDs, error } =
                                    await createCommission({
                                        commission: {
                                            price: price,
                                            user_id: user,
                                            artist_id: artistId as string,
                                        },
                                        milestones: upfrontMilestones(price),
                                    });
                            }}
                        >
                            <UpfrontCommission
                                price={price}
                                artist_id={artistId as string}
                                user_id={user ?? ""}
                            />
                        </Button>
                        <Button
                            onClick={async () => {
                                const { commissionID, milestoneIDs, error } =
                                    await createCommission({
                                        commission: {
                                            price: price,
                                            user_id: user,
                                            artist_id: artistId as string,
                                        },
                                        milestones: fifteyFifteyMilestones(price),
                                    });
                            }}
                        >
                            <FifteyFifteyCommission
                                price={price}
                                artist_id={artistId as string}
                                user_id={user ?? ""}
                            />
                        </Button>
                        <Button
                            onClick={async () => {
                                const { commissionID, milestoneIDs, error } =
                                    await createCommission({
                                        commission: {
                                            price: price,
                                            user_id: user,
                                            artist_id: artistId as string,
                                        },
                                        milestones: threeStepMilestones(price),
                                    });
                            }}
                        >
                            <ThreeStepCommission
                                price={price}
                                artist_id={artistId as string}
                                user_id={user ?? ""}
                            />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
