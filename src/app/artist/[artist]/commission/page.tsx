"use client";
import { useParams } from "next/navigation";
import { createClient } from "~/utils/supabase/client";
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
import { createCommission } from "./action";

export default function NewCommission() {
  // artist id from the url
  const { artist } = useParams();
  const supabase = createClient();

  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");

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
        <Button className="w-full" onClick={createCommission}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}
