"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login, signup } from "./actions";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [err, setErr] = useState<null | string>(null);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm bg-white p-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Log in
          </CardTitle>
          {err && (
            <CardTitle className="text-s text-center font-semibold">
              {err}
            </CardTitle>
          )}
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
              />
            </div>
            <CardFooter className="flex flex-col space-y-2">
              <Button
                formAction={async (formData) => {
                  const { nextpage, error } = await login(formData);
                  if (error !== null) {
                    setErr(error.message);
                  } else {
                    redirect(nextpage);
                  }
                }}
                className="w-full"
              >
                Log in
              </Button>
              <Button
                formAction={async (formData) => {
                  const { nextpage, error } = await signup(formData);
                  if (error !== null) {
                    setErr(error.message);
                  } else {
                    redirect(nextpage);
                  }
                }}
                variant="outline"
                className="w-full"
              >
                Sign up
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
