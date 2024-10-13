import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import React from "react";

interface ExportBreadcrumbProps {
    breadcrumbs: {
        [title: string]: string;
    };
}

const ExportBreadcrumb = ({ breadcrumbs }: ExportBreadcrumbProps) => (
    <div className="o-4 mb-8 flex items-center justify-between rounded-lg bg-white p-6 shadow">
        <Breadcrumb>
            <BreadcrumbList>
                {Object.entries(breadcrumbs).map(([title, href], index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            {index ===
                            Object.entries(breadcrumbs).length - 1 ? (
                                <BreadcrumbPage
                                    className={`text-base ${
                                        index === 0
                                            ? "font-bold text-blu"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {title}
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink
                                    href={href}
                                    className={`text-base ${
                                        index === 0
                                            ? "font-bold text-blu"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {title}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {index < Object.entries(breadcrumbs).length - 1 && (
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
