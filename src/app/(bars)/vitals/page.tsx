"use client";

import { useQuery } from "@tanstack/react-query";
import ExportBreadcrumb from "@/components/ExportBreadcrumb";
import VitalsCard from "./VitalsCard";
import Loading from "@/components/Loading";
import { Card, CardContent } from "@/components/ui/card";
import ProgressCircle from "../student/ProgressCircle";

interface ReportItem {
    name: string;
    result: number | null;
    description: string;
}

interface VitalData {
    title: string;
    subtitle: string;
    value: number;
    color: string;
    description: string;
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

const fetchVitalsData = async (): Promise<VitalData[]> => {
    const response = await fetch(`/api/user/report`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const report: ReportItem[] = data.report;

    console.log(report);

    return report.map((item) => ({
        title: item.name,
        subtitle: getSubtitle(item.result),
        value: item.result ?? 10, // Use 10 as a fallback if result is null
        color: getRandomColor(),
        description: item.description,
    }));
};

const Vitals = () => {
    const {
        data: vitalsData,
        isLoading,
        error,
    } = useQuery<VitalData[], Error>({
        queryKey: ["vitalsData"],
        queryFn: fetchVitalsData,
    });

    if (isLoading) return <Loading />;
    if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <>
            <ExportBreadcrumb
                breadcrumbs={{
                    People: "/",
                    "John Doe": "/student",
                    Vitals: "/student/vitals",
                }}
            />

            <Card className="w-full">
                <CardContent className="flex items-center justify-start !p-10">
                    <div className="flex-grow">
                        <ProgressCircle value={67} color="orange" />
                    </div>

                    <div className="ml-10">
                        <h2 className="text-2xl font-bold">
                            Metabolic Fitness
                        </h2>
                        <h4 className="text-xl font-semibold text-orange-500">
                            Ishaan&apos; levels are optimal.
                        </h4>

                        <p className="mt-4 text-gray-600">
                            Id nostrud tempor voluptate commodo mollit qui.
                            Mollit id id veniam incididunt. Exercitation nisi
                            magna cupidatat eu irure. Labore commodo officia
                            eiusmod. Sit consequat amet ex officia et anim ea
                            mollit enim. Exercitation dolor eu magna labore sint
                            fugiat nisi nulla sint tempor reprehenderit Lorem
                            mollit eiusmod incididunt. Commodo voluptate aute
                            nulla sint labore excepteur dolore tempor culpa
                            consectetur ea.
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
