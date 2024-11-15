"use client";

import { useQuery } from "@tanstack/react-query";
import ExportBreadcrumb from "@/components/ExportBreadcrumb";
import VitalsCard from "../VitalsCard";
import Loading from "@/components/Loading";
import { Card, CardContent } from "@/components/ui/card";
import ProgressCircle from "../../student/ProgressCircle";
import { GenRand } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

interface ReportItem {
    name: string;
    result: number | null;
    description: string;
    unit: string;
}

interface Axis {
    axis: string;
    result: number;
    usersAverage: number;
    description: string;
}

interface VitalData {
    title: string;
    subtitle: string;
    value: number;
    color: string;
    description: string;
    unit: string;
}

const getRandomColor = () => {
    const colors = ["green", "blue", "orange", "red", "purple", "teal", "gray"];
    return colors[Math.floor(Math.random() * colors.length)];
};

const getSubtitle = (result: number | null): string => {
    if (result === null) return "Normal";
    if (result >= 80) return "Excellent";
    if (result >= 60) return "Good";
    if (result >= 40) return "Fair";
    return "Needs improvement";
};

const fetchVitalsData = async (vital: string): Promise<VitalData[]> => {
    const response = await fetch(`/api/user/report?axis=${vital}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const report: ReportItem[] = data.report;

    return report.map((item) => ({
        title: item.name,
        subtitle: getSubtitle(item.result),
        value: item.result ?? 10, // Use 10 as a fallback if result is null
        color: getRandomColor(),
        description: item.description,
        unit: item.unit,
    }));
};

const Vitals = ({ params }: { params: { vital: string } }) => {
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "John Doe";

    const vital = decodeURIComponent(params.vital);
    const {
        data: vitalsData,
        isLoading,
        error,
    } = useQuery<VitalData[], Error>({
        queryKey: [vital],
        queryFn: () => fetchVitalsData(vital),
    });
    const { data: vitalData } = useQuery({
        queryKey: ["Axis"],
        queryFn: async () => {
            const axesResponse = await fetch(
                "https://sync-app-420807.uc.r.appspot.com/user/getKitReport?token=AZ8BUVWXj5wytC7p45C3AMPBBXA9AdHTcet"
            );
            if (!axesResponse.ok) {
                throw new Error(`HTTP error! status: ${axesResponse.status}`);
            }
            const axesData = await axesResponse.json();
            const axes: Axis[] = axesData.report.axes;

            return axes.find((axis) => axis.axis === vital);
        },
    });

    const student = GenRand(100);

    if (isLoading) return <Loading />;
    if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <>
            <ExportBreadcrumb
                breadcrumbs={{
                    People: "/",
                    [name]: "#",
                    [vital]: `/student/vitals/${vital}`,
                }}
            />

            <Card className="w-full">
                <CardContent className="flex items-center justify-start !p-10">
                    <div className="flex-grow">
                        <ProgressCircle
                            value={student.result}
                            color={student.color}
                        />
                    </div>

                    <div className="ml-10">
                        <h2 className="text-2xl font-bold">{vital}</h2>
                        <h4
                            className={`text-xl font-semibold ${student.color === "green" ? "text-emerald-500" : student.color === "yellow" ? "text-amber-500" : "text-rose-500"}`}
                        >
                            {name}&apos;s levels are {student.text}.
                        </h4>

                        <p className="mt-4 text-gray-600">
                            {vitalData ? (
                                vitalData.description
                            ) : (
                                <>
                                    Pariatur qui Lorem non consequat deserunt
                                    nostrud sit quis non amet cupidatat
                                    excepteur ut velit. Et laboris occaecat
                                    mollit ut elit commodo ex laborum excepteur
                                    occaecat irure pariatur. Cillum mollit quis
                                    proident velit eiusmod magna cupidatat
                                    adipisicing culpa anim consequat commodo. Do
                                    aliqua irure magna anim adipisicing
                                    reprehenderit velit enim aliqua mollit.
                                    Ipsum esse proident est est nostrud ut minim
                                    enim. Est ullamco irure Lorem aute occaecat
                                    excepteur laboris occaecat aliqua eu laborum
                                    irure minim mollit officia.
                                </>
                            )}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {vitalsData?.map((vital, index) => (
                    <VitalsCard key={index} {...vital} />
                ))}
            </div>
        </>
    );
};

export default Vitals;
