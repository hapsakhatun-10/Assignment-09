"use client";

import Link from "next/link";
import { Avatar, Button } from "@heroui/react";
import { FaPaw } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {

    const { data: session } = authClient.useSession();
    const user = session?.user;



    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

                <Link href="/" className="flex items-center gap-3">
                    <FaPaw className="text-4xl text-purple-700" />
                    <span className="text-3xl font-bold text-purple-700">
                        PetHome
                    </span>
                </Link>

                <div className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
                    <Link href="/">Home</Link>
                    <Link href="/all-pets">All Pets</Link>
                    <Link href="/all-pets">All Pets</Link>

                </div>

                <div className="flex items-center gap-3">
                    {user ? (
                        <ProfileDropdown
                            user={user}
                        />
                    ) : (
                        <>
                            <li><Link href="/login">Login</Link></li>
                            <li><Link href="/signup">Sign Up</Link></li>
                        </>
                    )}
                </div>

            </div>

            <div className="bg-purple-700 text-white">
                <div className="max-w-7xl mx-auto px-8 h-12 flex items-center gap-10 text-sm font-medium">
                    <Link href="/adopt">Adopt or Get Involved</Link>
                    <Link href="/dogs">Dogs & Puppies</Link>
                    <Link href="/cats">Cats & Kittens</Link>
                    <Link href="/other">Other Pets</Link>
                </div>
            </div>
        </nav>
    );
}