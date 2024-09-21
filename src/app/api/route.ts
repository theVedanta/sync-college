import { NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

mongoose.connect(MONGODB_URI);

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profile_pic: {
        type: String,
        required: false,
        default: "",
    },
    access_token: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    verified: {
        type: Boolean,
        required: true,
        default: false,
    },
    verification_code: {
        type: String,
        required: false,
    },
    auth_types: {
        type: Array,
        required: false,
        default: [],
    },
    user_details: {
        type: Object,
        required: false,
    },
    onboarding_status: {
        type: Number,
        required: false,
        default: 0,
    },
    kitEmail: {
        type: String,
        required: false,
        default: "",
    },
    kitEmailVerified: {
        type: Boolean,
        required: false,
        default: false,
    },
    kitReportLink: {
        type: String,
        required: false,
        default:
            "https://firebasestorage.googleapis.com/v0/b/sync-ai-app.appspot.com/o/results.pdf?alt=media&token=1e849ee7-ce4b-435f-b767-3268e268597c",
    },
    onboarding_data: {
        type: Object,
        required: false,
        default: {},
    },
    deviceID: {
        type: String,
        required: false,
    },
    chat: {
        type: Array,
        required: false,
        default: [],
    },
    references: {
        type: Object,
        required: true,
        default: {
            key: "value",
        },
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    user_context: {
        type: String,
        required: false,
        default: "",
    },
    cdcTestData: {
        type: Object,
        required: false,
        default: {},
    },
    trackers: {
        type: Object,
        required: false,
        default: {
            default: [
                {
                    title: "Drink Water",
                    icon: "🚰",
                    current: 0,
                    goal: 8,
                    separator: "/",
                    unit: "Glasses",
                    manual: true,
                },
                {
                    title: "Daily Steps",
                    icon: "👣",
                    current: 0,
                    goal: 10000,
                    separator: " of ",
                    unit: "Steps",
                    manual: true,
                },
                {
                    title: "Sleep",
                    icon: "😴",
                    current: 0,
                    goal: 8,
                    separator: "/",
                    unit: "Hours Last Night",
                    manual: true,
                },
                {
                    title: "Exercise",
                    icon: "🏋️",
                    current: 0,
                    goal: 350,
                    separator: " of ",
                    unit: "Calories Burned",
                    manual: true,
                },
            ],
        },
    },
    deleted: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    try {
        const totalUsers = await User.countDocuments();
        const allUsers = await User.find().skip(skip).limit(limit);

        return NextResponse.json({
            success: true,
            users: allUsers,
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
