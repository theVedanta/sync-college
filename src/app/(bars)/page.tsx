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
import { useState } from "react";

const chartData = [
    { tag: "Healthy", count: 605, fill: "hsl(var(--chart-2))" },
    { tag: "Moderate", count: 342, fill: "hsl(var(--chart-4))" },
    { tag: "Unhealthy", count: 231, fill: "hsl(var(--chart-5))" },
    { tag: "Critical", count: 81, fill: "hsl(var(--chart-1))" },
];

const chartConfig = {
    healthy: {
        label: "Healthy",
        color: "hsl(var(--chart-2))",
    },
    moderate: {
        label: "Moderately Healthy",
        color: "hsl(var(--chart-4))",
    },
    unhealthy: {
        label: "Unhealthy",
        color: "hsl(var(--chart-5))",
    },
    critical: {
        label: "Critical",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export default function Home() {
    const [timeFrame, setTimeFrame] = useState<
        "Yearly" | "Monthly" | "Quarterly"
    >("Yearly");
    const [activeIndex, setActiveIndex] = useState<number | undefined>(
        undefined
    ); // Added state for active index
    const currentMonthIndex = new Date().getMonth();
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const getYearlyData = () => {
        const newData = months.slice(0, currentMonthIndex + 1).map((month) => ({
            month: month,
            percentage: Math.floor(Math.random() * 30) + 60,
        }));

        return newData;
    };

    const lineChartData = {
        Yearly: getYearlyData(),
        Monthly: [
            { month: "Week 1", percentage: 65 },
            { month: "Week 2", percentage: 85 },
            { month: "Week 3", percentage: 75 },
            { month: "Week 4", percentage: 90 },
        ],
        Quarterly: [
            { month: "Q1", percentage: 40 },
            { month: "Q2", percentage: 65 },
            { month: "Q3", percentage: 80 },
            { month: "Q4", percentage: 70 },
        ],
    };

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
                    <Button
                        className={
                            timeFrame === "Yearly"
                                ? "bg-blu text-white"
                                : "text-gray-700"
                        }
                        variant="ghost"
                        onClick={() => setTimeFrame("Yearly")}
                    >
                        Yearly
                    </Button>
                    <Button
                        className={
                            timeFrame === "Monthly"
                                ? "bg-blu text-white"
                                : "text-gray-700"
                        }
                        variant="ghost"
                        onClick={() => setTimeFrame("Monthly")}
                    >
                        Monthly
                    </Button>
                    <Button
                        className={
                            timeFrame === "Quarterly"
                                ? "bg-blu text-white"
                                : "text-gray-700"
                        }
                        variant="ghost"
                        onClick={() => setTimeFrame("Quarterly")}
                    >
                        Quarterly
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
                {[
                    {
                        title: "Total students marked healthy",
                        count: 605,
                        change: "+131 since last academic year",
                    },
                    {
                        title: "Mental health counselling sessions",
                        count: 342,
                        change: "+12 since last academic year",
                    },
                    {
                        title: "Total app sessions by students",
                        count: 231,
                        change: "+24 since last academic year",
                    },
                    {
                        title: "Total students marked critical",
                        count: 21,
                        change: "-11 since last month",
                    },
                ].map((item, i) => (
                    <Card key={i} className="rounded-lg bg-white p-6">
                        <CardTitle className="text-lg font-medium">
                            {item.title}
                        </CardTitle>
                        <p className="mt-6 text-2xl font-bold">{item.count}</p>
                        <p className="text-sm font-medium text-emerald-600">
                            {item.change}
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
                                    dataKey="count"
                                    nameKey="tag"
                                    innerRadius={90}
                                    activeIndex={activeIndex} // Use activeIndex state
                                    onMouseEnter={(data, index) => {
                                        setActiveIndex(index); // Highlight the active index on hover
                                    }}
                                    onMouseLeave={() => {
                                        setActiveIndex(undefined); // Reset the active index when not hovering
                                    }}
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
                                    content={<ChartLegendContent />}
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
                                data={lineChartData[timeFrame]}
                                className="w-full"
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#e0e0e0"
                                    vertical={false}
                                />
                                <XAxis dataKey="month" />
                                <YAxis
                                    domain={[0, 100]}
                                    tickFormatter={(tick) => `${tick}%`}
                                />
                                <Tooltip />
                                <Line
                                    dataKey="percentage"
                                    strokeWidth={2}
                                    stroke="#059669"
                                />
                            </LineChart>
                        </ChartContainer>

                        <p className="mt-4 flex items-center text-sm font-medium text-emerald-600">
                            11% improvement from last month
                            <TrendingUp className="ml-2" />
                        </p>
                    </Card>
                </div>
            </div>
        </>
    );
}
