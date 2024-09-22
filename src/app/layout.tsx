import type { Metadata } from "next";
import "./globals.css";
import "@fontsource-variable/plus-jakarta-sans";
import React from "react";
import Provider from "./Provider";

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
                className={`light antialiased`}
                style={{ fontFamily: "Plus Jakarta Sans Variable, sans-serif" }}
            >
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
