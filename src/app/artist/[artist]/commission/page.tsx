"use client"
import { redirect, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { api } from "~/trpc/react";
import { Palette, Pencil, Image, CheckCircle, DollarSign } from "lucide-react";
import { createCommission, getUser } from "./action";
import Milestone from "@/components/commission/milestone";

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/app/_components/ui/card";
import { Label } from "~/app/_components/ui/label";


const milestones = [
    {
        icon: <Palette className="w-6 h-6" />,
        title: "Project Initiation",
        description: "Initial consultation and project scope defined",
        payment: "25% upfront payment",
    },
    {
        icon: <Pencil className="w-6 h-6" />,
        title: "Sketch Approval",
        description: "Preliminary sketches reviewed and approved",
        payment: "No payment at this stage",
    },
    {
        icon: <Image className="w-6 h-6" />,
        title: "Work in Progress",
        description: "Detailed work and color application",
        payment: "25% progress payment",
    },
    {
        icon: <CheckCircle className="w-6 h-6" />,
        title: "Final Approval",
        description: "Final artwork presented for approval",
        payment: "No payment at this stage",
    },
    {
        icon: <DollarSign className="w-6 h-6" />,
        title: "Project Completion",
        description: "Artwork delivered and project concluded",
        payment: "Remaining 50% final payment",
    },
]



export default function NewCommission() {
    const artistId = usePathname().split("/")[2];
    const [user, setUser] = useState<null | string | undefined>(null);
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState("");
    const artistData = api.artist.getArtist.useQuery({ id: artistId }, { staleTime: 1000 * 60 * 5 });

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

    function createNewCommission() {
        if (user === undefined) {
            redirect("/login");
        }
        if (user === null) {
            return;
        }
        createCommission({
            commission: {
                artist_id: artistId,
                user_id: user,
                desc: desc,
                price,
                work_id: null,
            },
            milestones: fifteyFifteyMilestones(price),
        });
    }

    // Handle redirect if user is not fetched
    if (user === undefined) {
        redirect("/login");
    }

    // get commission data

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-40">
                <div>
                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">Create a new commission</h1>
                    <p className="text-center text-gray-600 mb-8">
                        {artistData.data?.artist?.display_name} is accepting commissions. See conditions below.
                    </p>
                    <div className="relative">
                        <div className="space-y-12">
                            {user && artistId && <FifteyFifteyCommission price={price} artist_id={artistId} user_id={user as string} />}
                        </div>
                    </div>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Create a new commission</CardTitle>
                            <CardDescription>
                                Fill out the form below to get started with your commission.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Commission Budget</Label>
                                    <Input
                                        name="Price"
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(parseInt(e.target.value))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Project Description</Label>
                                    <Textarea
                                        name="Description"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                    />
                                </div>
                                <Button onClick={createNewCommission}>Create Commission</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
