import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import "@fontsource/plus-jakarta-sans";
import { NAV_HEIGHT } from "@/lib/constants";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
    title: "JustSync.ai",
    description:
        "Sync your health remotely: Get AI-powered, personalized care plans based on home tests and multiple health integrations - simple, comprehensive, effective",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased light`}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
                <Navbar />
                <Sidebar />

                <main
                    style={{
                        paddingTop: NAV_HEIGHT + "px",
                    }}
                    className="w-screen overflow-x-hidden pl-16"
                >
                    {children}
                </main>
            </body>
        </html>
    );
}
