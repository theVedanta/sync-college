"use client";

import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { NAV_HEIGHT } from "@/lib/constants";
import { useState } from "react";

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const iconClassName = "w-6 h-6";

    return (
        <div
            className={`fixed left-0 top-0 z-30 h-screen bg-white py-4 transition-all ${isExpanded ? "w-64 shadow-xl" : "w-16"}`}
            style={{
                paddingTop: NAV_HEIGHT + 40 + "px",
            }}
        >
            <SidebarItem
                setIsExpanded={setIsExpanded}
                icon={<PersonIcon className={`${iconClassName}`} />}
                text="Profile"
                active={true}
                isExpanded={isExpanded}
            />
        </div>
    );
};

const SidebarItem = ({
    icon,
    text,
    active,
    isExpanded,
    setIsExpanded,
}: {
    icon: React.ReactNode;
    text: string;
    active: boolean;
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <Button
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            variant="ghost"
            className={`w-full justify-start rounded-none py-6 text-muted-foreground hover:bg-blue-200 ${active ? "border-l-4 border-l-blu bg-blue-200 font-bold text-blu hover:bg-blue-300 hover:text-blu" : ""}`}
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
    );
};

export default Sidebar;
