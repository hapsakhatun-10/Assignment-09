"use client";

import Link from "next/link";
import { Avatar, Button } from "@heroui/react";
import { FaPaw } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut();
    };

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
                    <Link href="/add-pets">Add Pets</Link>
                </div>

                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <Avatar
                                src={user?.image}
                                name={user?.name}
                                showFallback
                                className="border-2 border-purple-500"
                            />

                            <Button
                                size="sm"
                                color="danger"
                                variant="flat"
                                onPress={handleSignOut}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-4 text-black hover:text-purple-600 transition"
                            >
                                Log In
                            </Link>

                            <Link
                                href="/signup"
                                className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition"
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