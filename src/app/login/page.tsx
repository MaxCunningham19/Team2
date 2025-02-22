"use client";
import { useState } from "react";
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

export default function LoginPage() {
    const [isSigningUp, setIsSigningUp] = useState(false);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Card className="w-full max-w-sm bg-white p-6 shadow-md">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">
                        {isSigningUp ? "Sign Up" : "Log in"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        {isSigningUp && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        required
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </>
                        )}
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
                            {!isSigningUp ? (
                                <>
                                    <Button formAction={login} className="w-full">
                                        Log in
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => setIsSigningUp(true)}
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Sign up
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        type="button"
                                        onClick={() => setIsSigningUp(false)}
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Login
                                    </Button>
                                    <Button formAction={signup} className="w-full">
                                        Sign up
                                    </Button>
                                </>
                            )}
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
