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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Student = {
    name: string;
    onboarding_data: {
        firstName: string;
        lastName: string;
    };
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
    const { data: session } = useSession();
    const router = useRouter();

    const { data, isLoading } = useQuery({
        queryKey: ["students", page, userLimit],
        queryFn: async () => {
            const res = await fetch(
                `/api/user?page=${page}&limit=${userLimit}`
            );

            return res.json();
        },
    });

    if (!session) {
        router.push("/auth");
        return null;
    }
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
                                <TableHead>Student Name</TableHead>
                                <TableHead>Student ID</TableHead>
                                <TableHead>Student Email</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Inflammation</TableHead>
                                <TableHead>Balance</TableHead>
                                <TableHead>Metabolism</TableHead>
                                <TableHead>Cardiovascular</TableHead>
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

                                return (
                                    <TableRow key={i}>
                                        <TableCell className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage
                                                    src="/avatar.png"
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
                                        <TableCell>{student.email}</TableCell>
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
                                            <Link
                                                href={`/recommendations?email=${encodeURIComponent(student.email)}`}
                                            >
                                                <Button className="rounded-full bg-blu px-8 hover:bg-blue-800">
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

                <div className="mt-10 flex items-center justify-between border-t border-muted pt-4">
                    <span className="text-muted-foreground">
                        Showing<span className="mx-2">—</span>
                        <span className="text-blu">8 results per page</span>
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
