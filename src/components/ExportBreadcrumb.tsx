import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

interface ExportBreadcrumbProps {
    breadcrumbs: string[];
}

const ExportBreadcrumb = ({ breadcrumbs }: ExportBreadcrumbProps) => (
    <div className="o-4 mb-8 flex items-center justify-between rounded-lg bg-white p-6 shadow">
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            <BreadcrumbPage
                                className={
                                    index === 0
                                        ? "font-bold text-blu"
                                        : "text-gray-500"
                                }
                            >
                                {crumb}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                        {index < breadcrumbs.length - 1 && (
                            <BreadcrumbSeparator />
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>

        <Button>
            <UploadCloud className="mr-2 h-4 w-4" /> Export report
        </Button>
    </div>
);

export default ExportBreadcrumb;
