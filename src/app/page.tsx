"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { NAV_HEIGHT } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../../constants";
import Loading from "@/components/Loading";
import { useState } from "react";

type Student = {
    name: string;
    email: string;
    gender: string;
    age: number;
    inflammation: number;
    balance: number;
    metabolicFitness: number;
    cardiovascular: number;
};

const userLimit = 8;

export default function Home() {
    const [page, setPage] = useState(1);

    const handleNextPage = () => {
        if (data && page < data.totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const { data, isLoading } = useQuery({
        queryKey: ["students", page, userLimit],
        queryFn: async () => {
            const res = await fetch(
                `${BASE_API_URL}/user/all?page=${page}&limit=${userLimit}`
            );
            return res.json();
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div
            className={`text-white min-h-[calc(100vh-${NAV_HEIGHT}px)] flex flex-col`}
        >
            <div className="fixed left-0 right-0 top-0 -z-10 h-[30%] bg-blu"></div>
            <h1 className="mb-8 text-3xl font-bold">
                Student health dashboard
            </h1>

            <div className="flex h-[calc(100vh-${NAV_HEIGHT}px-8rem)] flex-col rounded-xl bg-white p-6 text-black shadow-md">
                <h2 className="mb-4 text-2xl font-bold opacity-75">
                    All students
                </h2>

                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search Students"
                        className="w-full border border-gray-200 py-5 pl-10"
                    />
                </div>

                <div className="flex-grow overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student Email</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Inflammation</TableHead>
                                <TableHead>Balance</TableHead>
                                <TableHead>Metabolic Fitness</TableHead>
                                <TableHead>Cardiovascular</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.users.map((student: Student, i: number) => (
                                <TableRow key={i}>
                                    <TableCell className="flex items-center gap-2">
                                        <Avatar>
                                            <AvatarImage
                                                src="/avatar.png"
                                                alt={student.email}
                                            />
                                            <AvatarFallback>
                                                {student.email
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        {student.email}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            ["Male", "Female"][
                                                Math.random() > 0.5 ? 0 : 1
                                            ]
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {Math.floor(
                                            Math.random() * 90
                                        ).toString()}
                                    </TableCell>
                                    <TableCell className="text-green-600">
                                        {/* {student.inflammation}% */}
                                        {Math.floor(
                                            Math.random() * 1100
                                        ).toString()}
                                    </TableCell>
                                    <TableCell className="text-red-600">
                                        {/* {student.balance}% */}
                                        {Math.floor(
                                            Math.random() * 2000
                                        ).toString()}
                                    </TableCell>
                                    <TableCell className="text-green-600">
                                        {/* {student.metabolicFitness}% */}
                                        {Math.floor(
                                            Math.random() * 20
                                        ).toString()}
                                    </TableCell>
                                    <TableCell className="text-red-600">
                                        {/* {student.cardiovascular}% */}
                                        {Math.floor(
                                            Math.random() * 40
                                        ).toString()}
                                    </TableCell>
                                    <TableCell>
                                        <Button className="rounded-full bg-blu px-8 hover:bg-blue-800">
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-muted pt-4">
                    <span className="text-muted-foreground">
                        Showing<span className="mx-2">—</span>
                        <span className="text-blu">8 results per page</span>
                    </span>

                    <div className="flex gap-2">
                        <Button
                            onClick={() => setPage(1)}
                            variant="outline"
                            size="sm"
                            disabled={page === 1}
                        >
                            First
                        </Button>
                        <Button
                            onClick={handlePrevPage}
                            variant="outline"
                            size="sm"
                            disabled={page === 1}
                        >
                            Prev
                        </Button>

                        {(() => {
                            const pageNumbers = [];
                            const totalPages = data.totalPages;
                            const currentPage = page;
                            const maxVisiblePages = 5;

                            if (totalPages <= maxVisiblePages) {
                                for (let i = 1; i <= totalPages; i++) {
                                    pageNumbers.push(i);
                                }
                            } else {
                                if (currentPage <= 3) {
                                    for (let i = 1; i <= 4; i++) {
                                        pageNumbers.push(i);
                                    }
                                    pageNumbers.push("...");
                                    pageNumbers.push(totalPages);
                                } else if (currentPage >= totalPages - 2) {
                                    pageNumbers.push(1);
                                    pageNumbers.push("...");
                                    for (
                                        let i = totalPages - 3;
                                        i <= totalPages;
                                        i++
                                    ) {
                                        pageNumbers.push(i);
                                    }
                                } else {
                                    pageNumbers.push(1);
                                    pageNumbers.push("...");
                                    for (
                                        let i = currentPage - 1;
                                        i <= currentPage + 1;
                                        i++
                                    ) {
                                        pageNumbers.push(i);
                                    }
                                    pageNumbers.push("...");
                                    pageNumbers.push(totalPages);
                                }
                            }

                            return pageNumbers.map((pageNum, index) => (
                                <Button
                                    key={index}
                                    onClick={() =>
                                        pageNum !== "..." && setPage(pageNum)
                                    }
                                    variant={
                                        page === pageNum ? "default" : "outline"
                                    }
                                    size="sm"
                                    disabled={pageNum === "..."}
                                >
                                    {pageNum}
                                </Button>
                            ));
                        })()}

                        <Button
                            onClick={handleNextPage}
                            variant="outline"
                            size="sm"
                            disabled={page === data.totalPages}
                        >
                            Next
                        </Button>
                        <Button
                            onClick={() => setPage(data.totalPages)}
                            variant="outline"
                            size="sm"
                            disabled={page === data.totalPages}
                        >
                            Last
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
