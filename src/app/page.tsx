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

const students = [
    {
        name: "Ishaan Das",
        gender: "Female",
        age: 19,
        inflammation: 56,
        balance: 56,
        metabolicFitness: 56,
        cardiovascular: 56,
    },
    {
        name: "Ishaan Das",
        gender: "Female",
        age: 19,
        inflammation: 56,
        balance: 56,
        metabolicFitness: 56,
        cardiovascular: 56,
    },
    {
        name: "Ishaan Das",
        gender: "Female",
        age: 19,
        inflammation: 56,
        balance: 56,
        metabolicFitness: 56,
        cardiovascular: 56,
    },
    {
        name: "Ishaan Das",
        gender: "Female",
        age: 19,
        inflammation: 56,
        balance: 56,
        metabolicFitness: 56,
        cardiovascular: 56,
    },
    {
        name: "Ishaan Das",
        gender: "Female",
        age: 19,
        inflammation: 56,
        balance: 56,
        metabolicFitness: 56,
        cardiovascular: 56,
    },
    {
        name: "Ishaan Das",
        gender: "Female",
        age: 19,
        inflammation: 56,
        balance: 56,
        metabolicFitness: 56,
        cardiovascular: 56,
    },
    {
        name: "Ishaan Das",
        gender: "Female",
        age: 19,
        inflammation: 56,
        balance: 56,
        metabolicFitness: 56,
        cardiovascular: 56,
    },
];

export default function Home() {
    return (
        <div
            className={`p-12 text-white min-h-[calc(100vh-${NAV_HEIGHT}px)] flex flex-col`}
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
                                <TableHead>Student name</TableHead>
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
                            {students.map((student, index) => (
                                <TableRow key={index}>
                                    <TableCell className="flex items-center gap-2">
                                        <Avatar>
                                            <AvatarImage
                                                src="/avatar.jpg"
                                                alt={student.name}
                                            />
                                            <AvatarFallback>
                                                {student.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        {student.name}
                                    </TableCell>
                                    <TableCell>{student.gender}</TableCell>
                                    <TableCell>{student.age}</TableCell>
                                    <TableCell className="text-green-600">
                                        {student.inflammation}%
                                    </TableCell>
                                    <TableCell className="text-red-600">
                                        {student.balance}%
                                    </TableCell>
                                    <TableCell className="text-green-600">
                                        {student.metabolicFitness}%
                                    </TableCell>
                                    <TableCell className="text-red-600">
                                        {student.cardiovascular}%
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
                        <span className="text-blu">10 results per page</span>
                    </span>

                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            First
                        </Button>
                        <Button variant="outline" size="sm">
                            Prev
                        </Button>
                        <Button variant="outline" size="sm">
                            1
                        </Button>
                        <Button variant="outline" size="sm">
                            2
                        </Button>
                        <Button variant="outline" size="sm">
                            3
                        </Button>
                        <Button variant="outline" size="sm">
                            4
                        </Button>
                        <Button variant="outline" size="sm">
                            5
                        </Button>
                        <Button variant="outline" size="sm">
                            Next
                        </Button>
                        <Button variant="outline" size="sm">
                            Last
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
