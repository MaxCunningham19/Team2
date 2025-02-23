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
import { UpfrontCommission, milestones } from "@/components/commission/upfront_commission";
import { FifteyFifteyCommission, milestones } from "@/components/commission/fiftey-fiftey-commission";
import { ThreeStepCommission, milestones } from "@/components/commission/three-step-commission";
import { type User } from "~/utils/supabase/types";

export default function NewCommission() {
  // artist id from the url
  const { artist } = useParams();
  void getUser().then((user) => {
    setUser(user);
  });

  const [user, setUser] = useState<undefined | null | User>(undefined);
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
        <span>
          <Button
            onClick={async () => {
              await createCommission({
                commission: { price: price },
                milestones: ,
              });
              return;
            }}
          >
            <UpfrontCommission
              price={price}
              artist_id={artist as string}
              user_id={user?.artist_id ?? ""}
            />
          </Button>
          <Button
            onClick={() => {
              return;
            }}
          >
            <FifteyFifteyCommission
              price={price}
              artist_id={artist as string}
              user_id={user?.artist_id ?? ""}
            />
          </Button>
          <Button
            onClick={() => {
              return;
            }}
          >
            <ThreeStepCommission
              price={price}
              artist_id={artist as string}
              user_id={user?.artist_id ?? ""}
            />
          </Button>
        </span>
      </CardContent>
    </Card>
  );
}
