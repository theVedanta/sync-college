"use client";

import ExportBreadcrumb from "@/components/ExportBreadcrumb";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import {
    LineChart,
    PieChart,
    Tooltip,
    XAxis,
    YAxis,
    Line,
    CartesianGrid,
    Pie,
    Sector,
} from "recharts";
import { Button } from "@/components/ui/button";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;

export default function Home() {
    return (
        <>
            <ExportBreadcrumb
                breadcrumbs={{
                    "Student Health Dashboard": "/",
                }}
            />

            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                    <h2 className="mr-4 text-lg font-semibold">
                        Stats for 2024-25
                    </h2>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                    >
                        <ChevronLeft />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                    >
                        <ChevronRight />
                    </Button>
                </div>
                <div className="flex space-x-1 rounded-lg border bg-white p-1">
                    <Button className="bg-blu text-white">Yearly</Button>
                    <Button variant="ghost" className="text-gray-700">
                        Monthly
                    </Button>
                    <Button variant="ghost" className="text-gray-700">
                        Quarterly
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="rounded-lg bg-white p-6">
                        <CardTitle className="text-lg font-medium">
                            Total students marked healthy
                        </CardTitle>
                        <p className="mt-6 text-2xl font-bold">4200</p>
                        <p className="text-sm font-medium text-emerald-600">
                            +201 since last month
                        </p>
                    </Card>
                ))}
            </div>

            <div className="flex space-x-6">
                <div className="mt-6 w-[40%]">
                    <Card className="h-full w-full p-6">
                        <CardTitle className="mb-2 text-xl font-semibold">
                            Student population health status
                        </CardTitle>

                        <ChartContainer
                            config={chartConfig}
                            className="h-[90%] w-full"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            className="bg-white"
                                            hideLabel
                                        />
                                    }
                                />
                                <Pie
                                    data={chartData}
                                    dataKey="visitors"
                                    nameKey="browser"
                                    innerRadius={90}
                                    activeIndex={0}
                                    activeShape={({
                                        outerRadius = 0,
                                        ...props
                                    }: PieSectorDataItem) => (
                                        <Sector
                                            {...props}
                                            outerRadius={outerRadius + 10}
                                        />
                                    )}
                                />

                                <ChartLegend
                                    content={
                                        <ChartLegendContent nameKey="browser" />
                                    }
                                    className="gap-4"
                                />
                            </PieChart>
                        </ChartContainer>
                    </Card>
                </div>

                <div className="mt-6 w-[60%]">
                    <Card className="h-full p-6">
                        <CardTitle className="mb-2 text-xl font-semibold">
                            Trend for overall student health
                        </CardTitle>
                        <CardDescription className="mb-6 text-base text-black">
                            Average student health level trends for year to
                            date.
                        </CardDescription>

                        <ChartContainer
                            config={{
                                value: {
                                    label: "Overall Health Trend",
                                    color: "#4CAF50",
                                },
                            }}
                            className="h-[30vh] w-full"
                        >
                            <LineChart
                                data={[
                                    { month: "Jan", score: 20 },
                                    { month: "Feb", score: 30 },
                                    { month: "Mar", score: 25 },
                                    { month: "Apr", score: 35 },
                                    { month: "May", score: 40 },
                                    { month: "Jun", score: 30 },
                                ]}
                                className="w-full"
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#e0e0e0"
                                    vertical={false}
                                />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    dataKey="score"
                                    strokeWidth={2}
                                    stroke="#059669"
                                />
                            </LineChart>
                        </ChartContainer>

                        <p className="mt-4 flex items-center text-sm font-medium text-emerald-600">
                            42% improvement from last month
                            <TrendingUp className="ml-2" />
                        </p>
                    </Card>
                </div>
            </div>
        </>
    );
}
