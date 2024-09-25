import { NextResponse } from "next/server";
import fetch from "node-fetch";

interface Axis {
    axis: string;
    result: number;
    usersAverage: number;
    description: string;
}

interface Biomarker {
    shortLabel: string;
    result: number | null;
    description?: string;
}

interface ReportData {
    axes: Axis[];
    biomarker: Biomarker[];
}

interface ReportItem {
    result: number | null;
    name: string;
    description: string;
}

export async function GET() {
    try {
        const response = await fetch(
            "https://sync-app-420807.uc.r.appspot.com/user/getKitReport?token=AZ8BUVWXj5wytC7p45C3AMPBBXA9AdHTcet"
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const reportData = ((await response.json()) as { report: ReportData })
            .report;

        const report: ReportItem[] = [
            ...reportData.axes.map((axis) => ({
                result: axis.result,
                name: axis.axis,
                description: axis.description,
            })),
            ...reportData.biomarker.map((biomarker) => ({
                result: biomarker.result,
                name: biomarker.shortLabel,
                description: biomarker.description || "",
            })),
        ];

        return NextResponse.json({ report });
    } catch (error) {
        console.error("Error processing report:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
