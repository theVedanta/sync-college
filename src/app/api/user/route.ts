import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";

const generateFakeUsers = (count: number) => {
    return Array.from({ length: count }, () => ({
        email: faker.internet.email(),
        onboarding_data: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
        },
    }));
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    try {
        const totalUsers = 75;
        const fakeUsers = generateFakeUsers(totalUsers);

        const paginatedUsers = fakeUsers.slice(skip, skip + limit);

        return NextResponse.json({
            success: true,
            users: paginatedUsers,
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
