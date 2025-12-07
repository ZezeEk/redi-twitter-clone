'use client'

import { usePathname, useRouter } from "next/navigation";
import {
    HomeIcon,
    MagnifyingGlassIcon,
    BellIcon,
    UserIcon,
    EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SidebarClient({ user }) {
    const [localActive, setLocalActive] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    const active =
        pathname.includes("/profile")
            ? "Profile"
            : pathname === "/main"
                ? "Home"
                : null;

    return (
        <>
            <button
                className="relative group p-3 rounded-full hover:bg-gray-100 transition"
                onClick={() => {
                    setLocalActive(""); // local state temizleniyor
                    router.push("/main");
                }}
            >
                <HomeIcon className="h-6 w-6 text-gray-800" />
                {active === "Home" && <Dot />}
            </button>

            <button
                onClick={() => setLocalActive("Explore")}
                className="relative group p-3 rounded-full hover:bg-gray-100 transition"
            >
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-800" />
                {localActive === "Explore" && <Dot />}
            </button>

            <button
                onClick={() => setLocalActive("Notifications")}
                className="relative group p-3 rounded-full hover:bg-gray-100 transition"
            >
                <BellIcon className="h-6 w-6 text-gray-800" />
                {localActive === "Notifications" && <Dot />}
            </button>

            <button
                className="relative group p-3 rounded-full hover:bg-gray-100 transition"
                onClick={() => {
                    setLocalActive(""); 
                    router.push("/main/profile");
                }}
            >
                <UserIcon className="h-6 w-6 text-gray-800" />
                {active === "Profile" && <Dot />}
            </button>

            <button
                onClick={() => setLocalActive("More")}
                className="relative group p-3 rounded-full hover:bg-gray-100 transition"
            >
                <EllipsisHorizontalIcon className="h-6 w-6 text-gray-800" />
                {localActive === "More" && <Dot />}
            </button>
        </>
    );
}

function Dot() {
    return (
        <span className="absolute top-1 right-1 w-2 h-2 bg-sky-500 rounded-full"></span>
    );
}
