"use client";

import { useState } from "react";
import Link from "next/link";
import { FaPaw } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import ProfileDropdown from "./ProfileDropdown";
import { useRouter } from "next/navigation";
export default function Navbar() {
    const router = useRouter()
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">

            <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center">

                {/* LOGO */}
                <div className="flex items-center gap-2 sm:gap-3 flex-1">
                    <Link href="/" className="flex items-center gap-2 sm:gap-3">
                        <FaPaw className="text-2xl sm:text-4xl text-purple-700" />
                        <span className="text-2xl sm:text-3xl font-bold text-purple-700">
                            PetHome
                        </span>
                    </Link>
                </div>

                {/* CENTER LINKS (desktop) */}
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
                <div className="flex items-center justify-end flex-1 gap-2 sm:gap-4">

                    {user ? (
                        <ProfileDropdown user={user} />
                    ) : (
                        <>
                            <Link
                                href="/Login"
                                className="px-3 sm:px-4 py-1 rounded-full hover:bg-purple-700 transition text-gray-700 text-sm sm:text-base"
                            >
                                Login
                            </Link>

                        </>
                    )}

                    {/* Hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 hover:bg-purple-50 rounded-lg"
                    >
                        {mobileOpen ? <X size={24} className="text-purple-700" /> : <Menu size={24} className="text-purple-700" />}
                    </button>
                </div>

            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="lg:hidden bg-white border-t border-purple-100 shadow-md">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3 text-gray-700 font-medium">
                        <Link href="/" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-purple-50 transition">
                            Home
                        </Link>
                        <Link href="/all-pets" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-purple-50 transition">
                            All Pets
                        </Link>
                        {user && (
                            <>
                                <Link href="/add-pets" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-purple-50 transition">
                                    Add Pet
                                </Link>
                                <Link href="/my-requests" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-purple-50 transition">
                                    My Request
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}

            <div className="bg-purple-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 h-12 flex items-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium overflow-x-auto scrollbar-hide">
                    <span className="whitespace-nowrap">Adopt or Get Involved</span>
                    <span className="whitespace-nowrap">Dogs & Puppies</span>
                    <span className="whitespace-nowrap">Cats & Kittens</span>
                    <span className="whitespace-nowrap">Other Pets</span>
                </div>
            </div>
        </nav>
    );
}