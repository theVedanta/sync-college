"use client";

import { useQuery } from "@tanstack/react-query";
import ExportBreadcrumb from "@/components/ExportBreadcrumb";
import VitalsCard from "./VitalsCard";
import Loading from "@/components/Loading";

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
    const colors = [
        "green",
        "blue",
        "orange",
        "red",
        "purple",
        "indigo",
        "teal",
        "amber",
        "gray",
    ];
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

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {vitalsData?.map((vital, index) => (
                    <VitalsCard key={index} {...vital} />
                ))}
            </div>
        </>
    );
};

export default Vitals;
