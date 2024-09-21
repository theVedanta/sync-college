"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChevronRight, Dot, Info } from "lucide-react";
import { CustomIcon } from "@/components/CustomIcon";
import ProgressCircle from "./ProgressCircle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import ExportBreadcrumb from "@/components/ExportBreadcrumb";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Loading from "@/components/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Suspense } from "react";

const RecommendationsContent = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const { data, isLoading, error } = useQuery({
        queryKey: ["user", email],
        queryFn: async () => {
            const res = await fetch(
                `/api/user/email?email=${encodeURIComponent(email ? email : "vedanta1412@gmail.com")}`
            );

            if (!res.ok) throw new Error("Failed to fetch user");
            return res.json();
        },
        // enabled: !!email,
    });

    if (isLoading) return <Loading />;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No user selected</div>;

    const user = data.user;
    const name =
        user.onboarding_data &&
        user.onboarding_data.firstName &&
        user.onboarding_data.lastName
            ? user.onboarding_data.firstName +
              " " +
              user.onboarding_data.lastName
            : user.email;
    const studentId = `S-${Math.floor(100000 + Math.random() * 900000)}`;

    return (
        <>
            <ExportBreadcrumb breadcrumbs={["People", name]} />

            <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="mb-8">
                    <TabsTrigger
                        value="overview"
                        className="text-xl font-semibold data-[state=active]:font-semibold"
                    >
                        Overview
                    </TabsTrigger>
                    <TabsTrigger
                        value="profile-summary"
                        className="text-xl data-[state=active]:font-semibold"
                    >
                        Profile summary
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <div className="w-full">
                        <div className="mb-8 flex space-x-8">
                            <Card className="flex-grow">
                                <CardContent className="flex h-full items-center justify-between p-8">
                                    <div className="relative aspect-square h-full">
                                        <Avatar className="h-full w-full">
                                            <AvatarImage alt={name} />
                                            <AvatarFallback className="text-2xl">
                                                {name
                                                    .split(" ")
                                                    .map((n: string) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>

                                    <div className="ml-10 flex-grow">
                                        <h2 className="text-2xl font-bold">
                                            {name}
                                        </h2>
                                        <p className="text-gray-500">
                                            Student ID: {studentId}
                                        </p>
                                        <div className="mt-6 flex flex-wrap gap-2 text-sm text-gray-500 sm:text-lg">
                                            <span>♂ Male</span>
                                            <Dot className="hidden sm:inline" />
                                            <span>142 Kg</span>
                                            <Dot className="hidden sm:inline" />
                                            <span>180 cm</span>
                                            <Dot className="hidden sm:inline" />
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <span className="cursor-help">
                                                            No allergies
                                                        </span>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>
                                                            No known allergies
                                                            reported
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>

                                    <div className="h-full">
                                        <Button className="ml-auto">
                                            View full profile{" "}
                                            <CustomIcon>
                                                <ChevronRight />
                                            </CustomIcon>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="w-1/3 bg-blu text-white">
                                <CardContent className="flex items-center p-6">
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold">
                                            Overall health score
                                        </h3>
                                        <p className="mb-4">
                                            Ishaan&apos;s health is in average
                                            condition.
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <Button
                                                variant="link"
                                                className="flex items-center p-0 text-lg text-white"
                                            >
                                                Learn more{" "}
                                                <CustomIcon>
                                                    <ChevronRight />
                                                </CustomIcon>
                                            </Button>
                                        </div>
                                    </div>

                                    <ProgressCircle value={67} color="orange" />
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mb-8 mt-16 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <h2 className="text-2xl font-bold text-darkblu">
                                    Ishaan&apos;s vitals
                                </h2>
                                <p className="flex items-center text-gray-500">
                                    <CustomIcon>
                                        <Calendar />
                                    </CustomIcon>{" "}
                                    Vitals last monitored on 10/23/2023
                                </p>
                            </div>

                            <Button>Send new reminder</Button>
                        </div>

                        <div className="grid grid-cols-4 gap-8">
                            {[
                                "Metabolic Fitness",
                                "Inflammation",
                                "Balance",
                                "Cardiovascular",
                            ].map((title, i) => {
                                const value = Math.floor(Math.random() * 100);
                                const color =
                                    value < 33
                                        ? "red"
                                        : value < 66
                                          ? "orange"
                                          : "green";

                                return (
                                    <Link key={i} href="/vitals">
                                        <Card className="cursor-pointer transition-all hover:shadow-xl">
                                            <CardContent className="p-6">
                                                <h3 className="mb-8 flex w-full items-center justify-center text-lg font-semibold text-muted-foreground">
                                                    {title}
                                                    <TooltipProvider
                                                        delayDuration={0}
                                                    >
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <Info className="ml-2 h-6 w-6 text-blu" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>
                                                                    More
                                                                    information
                                                                    about{" "}
                                                                    {title}
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </h3>

                                                <ProgressCircle
                                                    value={value}
                                                    color={color}
                                                />

                                                <p
                                                    className={`text-center font-semibold ${
                                                        color === "orange"
                                                            ? "text-orange-500"
                                                            : color === "red"
                                                              ? "text-red-500"
                                                              : "text-green-500"
                                                    }`}
                                                >
                                                    {title} levels are{" "}
                                                    {color === "green"
                                                        ? "optimal"
                                                        : color === "orange"
                                                          ? "moderate"
                                                          : "concerning"}
                                                    .
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="profile-summary">
                    <div></div>
                </TabsContent>
            </Tabs>
        </>
    );
};

const Recommendations = () => {
    return (
        <Suspense fallback={<Loading />}>
            <RecommendationsContent />
        </Suspense>
    );
};

export default Recommendations;
