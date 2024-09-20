import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChevronRight, Dot, UploadCloud } from "lucide-react";
import { CustomIcon } from "@/components/CustomIcon";
import ProgressCircle from "./ProgressCircle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const Recommendations = () => {
    return (
        <>
            <div className="o-4 mb-8 flex items-center justify-between rounded-md bg-white p-6 shadow">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-bold text-blu">
                                People
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-gray-500">
                                Ishaan Das
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <Button>
                    <UploadCloud className="mr-2 h-4 w-4" /> Export report
                </Button>
            </div>

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
                                        <Image
                                            src="/assets/image.png"
                                            alt="Ishaan Das"
                                            fill
                                            className="rounded-full border-[5px] border-blu object-cover"
                                        />
                                    </div>

                                    <div className="ml-10">
                                        <h2 className="text-2xl font-bold">
                                            Ishaan Das, 20
                                        </h2>
                                        <p className="text-gray-500">
                                            Student ID: N000234210
                                        </p>
                                        <p className="mt-6 line-clamp-1 flex items-center text-lg text-gray-500">
                                            ♂ Male <Dot /> 142 Kg <Dot /> 142
                                            Kg <Dot /> No allergies <Dot /> No
                                            allergies
                                        </p>
                                    </div>

                                    <Button className="ml-auto">
                                        View full profile{" "}
                                        <CustomIcon>
                                            <ChevronRight />
                                        </CustomIcon>
                                    </Button>
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

                                    <ProgressCircle value={50} color="orange" />
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
                            {[...Array(4)].map((_, i) => (
                                <Link key={i} href="/vitals">
                                    <Card className="cursor-pointer transition-all hover:shadow-xl">
                                        <CardContent className="p-6">
                                            <h3 className="mb-4 text-lg font-semibold text-darkblu">
                                                Metabolic Fitness
                                            </h3>

                                            <ProgressCircle
                                                value={50}
                                                color="orange"
                                            />

                                            <p className="text-center font-semibold text-orange-600">
                                                Inflammation levels are optimal.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
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

export default Recommendations;
