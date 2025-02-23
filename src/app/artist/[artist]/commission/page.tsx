"use client"
import { redirect, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { api } from "~/trpc/react";
import { createCommission, getUser } from "./action";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/app/_components/ui/card";
import { Label } from "~/app/_components/ui/label";

// Import commission components and milestones
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
import React from "react";
import { createClient } from "~/utils/supabase/client";

const CommissionFormats = {
    upfront: {
        name: "Upfront",
        description: "Pay the full commission price upfront",
        component: UpfrontCommission,
        milestones: upfrontMilestones,
    },
    fifteyFiftey: {
        name: "Fiftey-Fiftey",
        description: "Pay half the commission price upfront and the other half upon completion",
        component: FifteyFifteyCommission,
        milestones: fifteyFifteyMilestones,
    },
    threeStep: {
        name: "Three Step",
        description: "Pay a third upfront, a third upon completion, and a third upon delivery",
        component: ThreeStepCommission,
        milestones: threeStepMilestones,
    },
}

export default function NewCommission() {
    const artistId = usePathname().split("/")[2];
    const [user, setUser] = useState<null | string | undefined>(null);
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState("");
    // Track the selected commission format (default to fifteyFiftey)
    const [selectedCommission, setSelectedCommission] = useState<keyof typeof CommissionFormats>("fifteyFiftey");

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

    async function createNewCommission() {
        if (user === undefined) {
            redirect("/login");
        }
        if (user === null) {
            return;
        }



        let newCommission = await createCommission({
            commission: {
                artist_id: artistId,
                user_id: user,
                desc: desc,
                price,
                work_id: null,
            },
            // Use the milestones for the selected commission format
            milestones: CommissionFormats[selectedCommission].milestones(price),
        });

        

        if (newCommission.error) {
            console.error("Error creating commission", newCommission.error);
        } else {
            redirect("/explore");
        }
    }

    // Handle redirect if user is not fetched
    if (user === undefined) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 space-y-0 lg:space-y-0 mt-40">
                {/* Left/first column */}
                <div>
                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
                        Create a new commission
                    </h1>
                    <p className="text-center text-gray-600 mb-8">
                        {artistData.data?.artist?.display_name} is accepting commissions. See conditions below.
                    </p>
                    <div className="flex justify-center">
                        <div className="space-y-12">
                            {/* Buttons to switch between commission formats */}
                            <div className="flex space-x-4 mb-4">
                                {Object.entries(CommissionFormats).map(([key, format]) => (
                                    <Button
                                        key={key}
                                        variant={selectedCommission === key ? "default" : "outline"}
                                        onClick={() => setSelectedCommission(key as keyof typeof CommissionFormats)}
                                    >
                                        {format.name}
                                    </Button>
                                ))}
                            </div>
                            {/* Render the selected commission format */}
                            {user && artistId && (
                                React.createElement(CommissionFormats[selectedCommission].component, {
                                    price,
                                    artist_id: artistId,
                                    user_id: user as string,
                                })
                            )}
                        </div>
                    </div>
                </div>
                {/* Right/second column */}
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
                                    <Label>Commission Budget (€)</Label>
                                    <Input
                                        name="Price"
                                        type="number"
                                        value={price}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            setPrice(isNaN(value) ? 0 : value);
                                        }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Project Description</Label>
                                    <Textarea
                                        name="Description"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                        placeholder="Give a brief description of what you want to commission"
                                        rows={10}
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