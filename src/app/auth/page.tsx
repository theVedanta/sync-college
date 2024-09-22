"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { toast } = useToast();

    if (session) {
        router.push("/");
        return null;
    }

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        toast({
            title: "Please use Google Authentication",
            description:
                "We are currently in the development phase, Google Authentication is only allowed for the coming days.",
        });
    };

    return (
        <div className="flex h-screen w-screen items-center justify-between">
            <div className="relative h-screen w-[60%] overflow-hidden">
                <Image
                    src="/assets/auth.svg"
                    alt="Authentication Background"
                    objectFit="cover"
                    layout="fill"
                    className="h-auto w-full object-cover"
                />
            </div>

            <div className="w-[40%] px-[7%]">
                <div className="w-full">
                    <div className="mb-8">
                        <Image
                            src="/assets/sync-logo.png"
                            alt="Sync Logo"
                            width={200}
                            height={80}
                            objectFit="cover"
                            className="h-full w-1/3 object-cover"
                        />
                    </div>

                    <h2 className="mb-6 text-2xl font-semibold">Welcome 👋</h2>
                    <form onSubmit={handleLogin}>
                        <div className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    placeholder="johndoe@example.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="rounded-xl border-gray-300 px-5 py-6 hover:border-2 hover:border-blu"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    placeholder="Minimum 8 characters"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="rounded-xl border-gray-300 px-5 py-6 hover:border-2 hover:border-blu"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="remember" />

                                    <label
                                        htmlFor="remember"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Remember Me
                                    </label>
                                </div>
                                <Button
                                    variant="link"
                                    className="text-sm text-blue-600"
                                >
                                    Forgot Password?
                                </Button>
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full rounded-xl py-6 text-base"
                            >
                                Login
                            </Button>

                            <div className="!mt-5">
                                <div className="relative">
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="mt-4 w-full rounded-xl border-2 border-blu py-6 text-base"
                                    size="lg"
                                    onClick={() => signIn("google")}
                                >
                                    <Image
                                        src="/assets/google.png"
                                        alt="google"
                                        width={20}
                                        height={20}
                                        className="mr-2 h-6 w-6"
                                    />
                                    Google
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
