"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { NAV_HEIGHT } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { status } = useSession();

    if (status === "unauthenticated") {
        redirect("/auth");
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
