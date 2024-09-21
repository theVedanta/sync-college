"use client";

import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { NAV_HEIGHT } from "@/lib/constants";
import { useState } from "react";
import { GitGraph } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const iconClassName = "w-6 h-6";
    const sidebarItems = [
        {
            icon: <PersonIcon className={iconClassName} />,
            text: "Profile",
            link: "/",
        },
        {
            icon: <GitGraph className={iconClassName} />,
            text: "Recommendations",
            link: "/recommendations",
        },
    ];

    return (
        <div
            className={`fixed left-0 top-0 z-30 h-screen bg-white py-4 transition-all ${isExpanded ? "w-64 shadow-xl" : "w-16"}`}
            style={{
                paddingTop: NAV_HEIGHT + 40 + "px",
            }}
        >
            {sidebarItems.map((item, i) => (
                <SidebarItem
                    key={i}
                    setIsExpanded={setIsExpanded}
                    icon={item.icon}
                    text={item.text}
                    link={item.link}
                    isExpanded={isExpanded}
                />
            ))}
        </div>
    );
};

const SidebarItem = ({
    icon,
    text,
    link,
    isExpanded,
    setIsExpanded,
}: {
    icon: React.ReactNode;
    text: string;
    link: string;
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const pathname = usePathname();
    const isActive = pathname === link;

    return (
        <Link href={link} passHref>
            <Button
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                variant="ghost"
                className={`w-full justify-start rounded-none py-6 text-muted-foreground hover:bg-blue-200 hover:text-muted-foreground ${
                    isActive
                        ? "border-l-4 border-l-blu bg-blue-200 font-bold text-blu hover:bg-blue-300 hover:text-blu"
                        : ""
                }`}
            >
                {icon}

                <span
                    className="transition-all duration-100"
                    style={{
                        width: isExpanded ? "auto" : 0,
                        opacity: isExpanded ? 1 : 0,
                        marginLeft: isExpanded ? "20px" : 0,
                    }}
                >
                    {text}
                </span>
            </Button>
        </Link>
    );
};

export default Sidebar;
