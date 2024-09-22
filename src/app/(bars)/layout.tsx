"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { NAV_HEIGHT } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const router = useRouter();

    if (!session) {
        router.push("/auth");
        return null;
    }

    return (
        <>
            <Navbar />
            <Sidebar />

            <main
                style={{
                    paddingTop: NAV_HEIGHT + "px",
                }}
                className="w-screen overflow-x-hidden pl-16"
            >
                <div className="p-10">{children}</div>
            </main>
        </>
    );
};
export default Layout;
