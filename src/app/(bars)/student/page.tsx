"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Info, Mail } from "lucide-react";
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
import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import { GenRand } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const RecommendationsContent = () => {
    const searchParams = useSearchParams();
    const userEmail = searchParams.get("email") || "vedanta1412@gmail.com";

    const [user, setUser] = useState<{
        email: string;
        name: string;
        image: string;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<null | Error>(null);
    const healthStatus = GenRand(100);

    useEffect(() => {
        const generateFakeUser = (email: string) => {
            const seed = email.split("@")[0];
            faker.seed(
                seed
                    .split("")
                    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
            );

            return {
                email: email,
                name: faker.person.fullName(),
                image: faker.image.avatar(),
            };
        };

        try {
            const fakeUser = generateFakeUser(userEmail);

            setUser(fakeUser);
            setIsLoading(false);
        } catch (err) {
            setError(err as Error);
            setIsLoading(false);
        }
    }, [userEmail]);

    if (isLoading) return <Loading />;
    if (error) return <div>Error: {error.message}</div>;
    if (!user) return <div>No user selected</div>;

    const studentId = `S-${Math.floor(100000 + Math.random() * 900000)}`;

    return (
        <>
            <ExportBreadcrumb
                breadcrumbs={{
                    People: "/",
                    [user.name]: `/student?email=${user.email}`,
                }}
            />

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
                                    <div className="relative h-32 w-32">
                                        <Avatar className="h-full w-full">
                                            <AvatarImage
                                                alt={user.name}
                                                src={user.image}
                                                className="object-cover"
                                            />
                                            <AvatarFallback className="text-2xl">
                                                {user.name
                                                    .split(" ")
                                                    .map((n: string) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>

                                    <div className="ml-10 flex-grow">
                                        <div className="flex items-center gap-5">
                                            <h2 className="text-2xl font-bold">
                                                {user.name}
                                            </h2>

                                            <p className="flex items-center text-gray-600">
                                                <CustomIcon>
                                                    <Mail />
                                                </CustomIcon>{" "}
                                                {user.email}
                                            </p>
                                        </div>
                                        <p className="text-gray-600">
                                            Student ID: {studentId}
                                        </p>
                                        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm sm:text-lg">
                                            <Badge
                                                variant="outline"
                                                className="border-blu bg-blue-100 text-blu"
                                            >
                                                {Math.random() > 0.5
                                                    ? "♂ Male"
                                                    : "♀ Female"}
                                            </Badge>

                                            <Badge
                                                variant="outline"
                                                className="border-blu bg-blue-100 text-blu"
                                            >
                                                {Math.floor(
                                                    Math.random() * 100
                                                ) + 50}{" "}
                                                Kg
                                            </Badge>

                                            <Badge
                                                variant="outline"
                                                className="border-blu bg-blue-100 text-blu"
                                            >
                                                {Math.floor(
                                                    Math.random() * 50
                                                ) + 150}{" "}
                                                cm
                                            </Badge>

                                            <TooltipProvider>
                                                <Tooltip delayDuration={0}>
                                                    <TooltipTrigger>
                                                        <Badge
                                                            variant="outline"
                                                            className="cursor-help border-blu bg-blue-100 text-blu"
                                                        >
                                                            No allergies
                                                        </Badge>
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
                                </CardContent>
                            </Card>

                            <Card className="w-1/3 bg-blu text-white">
                                <CardContent className="flex items-center p-6">
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold">
                                            Overall health score
                                        </h3>
                                        <p className="mb-4">
                                            {user.name}&apos;s health is{" "}
                                            {healthStatus.text}.
                                        </p>
                                    </div>

                                    <ProgressCircle
                                        value={healthStatus.result}
                                        color={healthStatus.color}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mb-8 mt-16 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <h2 className="text-2xl font-bold text-darkblu">
                                    {user.name}&apos;s vitals
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
                                          ? "yellow"
                                          : "green";

                                return (
                                    <Link
                                        key={i}
                                        href={`/vitals/${title}?name=${encodeURIComponent(user.name)}`}
                                    >
                                        <Card className="h-full cursor-pointer transition-all hover:shadow-xl">
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
                                                    className={`mt-4 text-center font-semibold ${
                                                        color === "yellow"
                                                            ? "text-amber-500"
                                                            : color === "red"
                                                              ? "text-rose-500"
                                                              : "text-emerald-500"
                                                    }`}
                                                >
                                                    {title} levels are{" "}
                                                    {color === "green"
                                                        ? "optimal"
                                                        : color === "yellow"
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
