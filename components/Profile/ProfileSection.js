"use client";

import { useState } from "react";

export default function ProfileSection({ image, name }) {
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        await fetch("/api/logout");
        window.location.href = "/auth";
    };

    return (
        <div className="relative">
           <button
                onClick={() => setOpen(!open)}
                className="flex flex-col items-center justify-center rounded-lg hover:bg-gray-100 transition p-1"
            >
                <img
                    src={image || "/profile-placeholder.png"}
                    alt="profile"
                    className="h-10 w-10 rounded-full object-cover"
                />

                <span className="text-sm font-semibold mt-1 text-center">{name}</span>
            </button>

            {open && (
                <div className="absolute bottom-14 left-0 bg-white shadow-lg rounded-xl p-2 w-40">
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}