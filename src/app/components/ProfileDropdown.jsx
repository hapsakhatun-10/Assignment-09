"use client";

import { useState } from "react";
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const ProfileDropdown = ({ user }) => {
    const [open, setOpen] = useState(false);

    if (!user) return null;

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    return (
        <div className="relative">
            {/* Avatar + Info */}
            <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 cursor-pointer"
            >
                <Avatar
                    src={user?.image}
                    name={user?.name}
                />

                <div className="leading-tight">
                    <p className="text-sm font-semibold text-gray-800">
                        {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                        {user?.email}
                    </p>
                </div>
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg border rounded-xl overflow-hidden z-50">

                    <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm hover:bg-purple-400"
                        onClick={() => setOpen(false)}
                    >
                        Dashboard
                    </Link>



                    <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                    >
                        Logout
                    </button>

                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;