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
            className={`text-white p-12 min-h-[calc(100vh-${NAV_HEIGHT}px)] flex flex-col`}
        >
            <div className="fixed top-0 left-0 right-0 h-[30%] -z-10 bg-blu"></div>
            <h1 className="text-3xl font-bold mb-8">
                Student health dashboard
            </h1>

            <div className="bg-white text-black rounded-xl p-6 shadow-md flex flex-col h-[calc(100vh-${NAV_HEIGHT}px-8rem)]">
                <h2 className="text-2xl font-semibold mb-4">All students</h2>

                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        type="text"
                        placeholder="Search Students"
                        className="pl-10 w-full border py-6"
                    />
                </div>

                <div className="overflow-auto flex-grow">
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
                                        <Button
                                            variant="outline"
                                            className="bg-blu text-white rounded-full px-8 hover:bg-blu/90"
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex justify-between items-center mt-12">
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
