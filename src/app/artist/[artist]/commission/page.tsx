"use client";
import { redirect, useParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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

export default function NewCommission() {
  // artist id from the url
  const { artist } = useParams();
  void getUser().then((user) => {
    setUser(user);
  });

  const [user, setUser] = useState<undefined | null | string>("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");

  if (user == null) {
    redirect("/signup");
  }
  // todo add in button handling for selecting your milestones

  return (
    <Card className="mx-auto w-full max-w-md p-4">
      <CardHeader>
        <CardTitle>Create a New Commission for {artist}</CardTitle>
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
            defaultValue={price}
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
                    artist_id: artist as string,
                  },
                  milestones: upfrontMilestones(price),
                });
            }}
          >
            <UpfrontCommission
              price={price}
              artist_id={artist as string}
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
                    artist_id: artist as string,
                  },
                  milestones: fifteyFifteyMilestones(price),
                });
            }}
          >
            <FifteyFifteyCommission
              price={price}
              artist_id={artist as string}
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
                    artist_id: artist as string,
                  },
                  milestones: threeStepMilestones(price),
                });
            }}
          >
            <ThreeStepCommission
              price={price}
              artist_id={artist as string}
              user_id={user ?? ""}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
