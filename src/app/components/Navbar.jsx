"use client";

import Link from "next/link";
import { FaPaw } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">

            <div className="max-w-7xl mx-auto px-8 h-20 flex items-center">

                {/* LOGO */}
                <div className="flex items-center gap-3 flex-1">
                    <Link href="/" className="flex items-center gap-3">
                        <FaPaw className="text-4xl text-purple-700" />
                        <span className="text-3xl font-bold text-purple-700">
                            PetHome
                        </span>
                    </Link>
                </div>

                {/* CENTER LINKS */}
                <div className="hidden lg:flex items-center justify-center flex-1 gap-8 text-gray-700 font-medium">

                    <Link href="/" className="hover:text-purple-600 transition">
                        Home
                    </Link>

                    <Link href="/all-pets" className="hover:text-purple-600 transition">
                        All Pets
                    </Link>

                    {user && (
                        <>
                            <Link href="/add-pets" className="hover:text-purple-600 transition">
                                Add Pet
                            </Link>

                            <Link href="/my-requests" className="hover:text-purple-600 transition">
                                My Request
                            </Link>
                        </>
                    )}

                </div>

                {/* RIGHT AUTH */}
                <div className="flex items-center justify-end flex-1 gap-4">

                    {user ? (
                        <ProfileDropdown user={user} />
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-1 rounded-full hover:bg-purple-50 transition text-gray-700"
                            >
                                Login
                            </Link>

                            <Link
                                href="/signup"
                                className="px-4 py-1 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition"
                            >
                                Sign Up
                            </Link>
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