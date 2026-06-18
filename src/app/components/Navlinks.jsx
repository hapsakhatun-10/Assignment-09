"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-3 p-2">
            <Link
                href="/"
                className={`px-5 py-2 rounded-full transition ${pathname === "/"
                    ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white"
                    : "text-gray-300 hover:text-white"
                    }`}
            >
                Home
            </Link>

            <Link
                href="/all-pets"
                className={`px-5 py-2 rounded-full transition ${pathname === "/all-pets"
                    ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white"
                    : "text-gray-300 hover:text-white"
                    }`}
            >
                All Pets
            </Link>
        </div>
    );
}