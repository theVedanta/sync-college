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
import { useState } from "react";
import Loading from "@/components/Loading";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { Badge } from "@/components/ui/badge";
import { GenRand } from "@/lib/utils"; // Import the GenRand function

type Student = {
    name: string;
    onboarding_data: {
        firstName: string;
        lastName: string;
    };
    email: string;
    gender: string;
    age: number;
    image: string;
};

const userLimit = 10;

const HealthTableCell = ({
    value,
    color,
}: {
    value: string | number;
    color: "green" | "yellow" | "red";
}) => {
    const colorClass =
        color === "green"
            ? "text-emerald-500"
            : color === "yellow"
              ? "text-amber-500"
              : "text-rose-500";
    return <TableCell className={colorClass}>{value}</TableCell>;
};

export default function Home() {
    const [page, setPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ["students", page, userLimit],
        queryFn: async () => {
            const res = await fetch(
                `/api/user?page=${page}&limit=${userLimit}`
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

            <div className="flex h-[calc(100vh-${NAV_HEIGHT}px-8rem)] flex-col rounded-xl bg-white p-6 text-black shadow-md">
                <h2 className="mb-4 text-2xl font-bold opacity-75">
                    All students (420)
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
                                <TableHead>Student Name</TableHead>
                                <TableHead>Student ID</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Inflammation</TableHead>
                                <TableHead>Balance</TableHead>
                                <TableHead>Metabolism</TableHead>
                                <TableHead>Cardiovascular</TableHead>
                                <TableHead>Overall Health</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {data.users.map((student: Student, i: number) => {
                                const name =
                                    student.onboarding_data &&
                                    student.onboarding_data.firstName &&
                                    student.onboarding_data.lastName
                                        ? student.onboarding_data.firstName +
                                          " " +
                                          student.onboarding_data.lastName
                                        : student.email;

                                const studentId = `S-${Math.floor(100000 + Math.random() * 900000)}`;

                                // Generate random values using GenRand function
                                const inflammation = GenRand(1100);
                                const balance = GenRand(2000);
                                const metabolism = GenRand(20);
                                const cardiovascular = GenRand(40);

                                // Determine overall health based on all values
                                const healthValues = [
                                    inflammation.result,
                                    balance.result,
                                    metabolism.result,
                                    cardiovascular.result,
                                ];

                                const averageHealth =
                                    healthValues.reduce((a, b) => a + b, 0) /
                                    healthValues.length;

                                let healthStatus = "Healthy";
                                if (averageHealth > 733) {
                                    healthStatus = "Concerning";
                                } else if (averageHealth > 366) {
                                    healthStatus = "Moderate";
                                }

                                return (
                                    <TableRow key={i}>
                                        <TableCell className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage
                                                    src={student.image}
                                                    alt={name}
                                                />
                                                <AvatarFallback>
                                                    {name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            {name}
                                        </TableCell>
                                        <TableCell>{studentId}</TableCell>
                                        <TableCell>{student.gender}</TableCell>
                                        <TableCell>{student.age}</TableCell>
                                        <HealthTableCell
                                            value={inflammation.result}
                                            color={inflammation.color}
                                        />
                                        <HealthTableCell
                                            value={balance.result}
                                            color={balance.color}
                                        />
                                        <HealthTableCell
                                            value={metabolism.result}
                                            color={metabolism.color}
                                        />
                                        <HealthTableCell
                                            value={cardiovascular.result}
                                            color={cardiovascular.color}
                                        />
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`${
                                                    healthStatus ===
                                                    "Concerning"
                                                        ? "border-rose-500 bg-rose-100 text-rose-500"
                                                        : healthStatus ===
                                                            "Moderate"
                                                          ? "border-amber-500 bg-amber-100 text-amber-500"
                                                          : "border-emerald-500 bg-emerald-100 text-emerald-500"
                                                }`}
                                            >
                                                {healthStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={`/student?email=${encodeURIComponent(student.email)}`}
                                            >
                                                <Button className="rounded-full bg-blu px-6 hover:bg-blue-800">
                                                    View
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-2 flex items-center justify-between border-t border-muted pt-4">
                    <span className="text-muted-foreground">
                        Showing<span className="mx-2">—</span>
                        <span className="text-blu">
                            {userLimit} results per page
                        </span>
                    </span>

                    <Pagination
                        page={page}
                        setPage={setPage}
                        totalPages={data.totalPages}
                    />
                </div>
            </div>
        </div>
    );
}
