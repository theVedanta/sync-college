import ExportBreadcrumb from "@/components/ExportBreadcrumb";
import VitalsCard from "./VitalsCard";

const vitalsData = [
    {
        title: "Homocysteine(HCY)",
        subtitle: "Optimal levels",
        value: 75,
        color: "green",
        description:
            "The High Sensitivity C-Reactive Protein (hs-CRP) test measures low levels of inflammation in the blood, which can indicate a higher risk of cardiovascular disease.",
    },
    {
        title: "Metabolic Fitness",
        subtitle: "Good condition",
        value: 65,
        color: "blue",
        description:
            "Metabolic fitness refers to how well your body processes and uses energy from the food you eat.",
    },
    {
        title: "Inflammation",
        subtitle: "Slightly elevated",
        value: 40,
        color: "orange",
        description:
            "Chronic inflammation can be a sign of various health issues and may contribute to the development of certain diseases.",
    },
    {
        title: "Stress Level",
        subtitle: "Moderate",
        value: 50,
        color: "yellow",
        description:
            "Stress levels can impact overall health and well-being. Monitoring and managing stress is important for maintaining good health.",
    },
];

const Vitals = () => {
    return (
        <>
            <ExportBreadcrumb breadcrumbs={["People", "Ishaan", "Vitals"]} />

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {vitalsData.map((vital, index) => (
                    <VitalsCard key={index} {...vital} />
                ))}
            </div>
        </>
    );
};

export default Vitals;
