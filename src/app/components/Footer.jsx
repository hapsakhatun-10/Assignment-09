"use client";

import Link from "next/link";
import {
    FaPaw,
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaHeart,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-purple-700 text-white mt-20">
            <div className="max-w-7xl mx-auto px-6 py-16">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Logo & About */}
                    <div>
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <FaPaw className="text-4xl" />
                            <span className="text-3xl font-bold">
                                PetHome
                            </span>
                        </Link>

                        <p className="text-purple-100 leading-relaxed">
                            Connecting loving families with pets looking for a
                            forever home. Discover, adopt, and make a difference
                            in a pets life today.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-3 text-purple-100">
                            <Link href="/" className="hover:text-white transition">
                                Home
                            </Link>

                            <Link href="/all-pets" className="hover:text-white transition">
                                All Pets
                            </Link>



                            <Link href="/about" className="hover:text-white transition">
                                About Us
                            </Link>

                            <Link href="/contact" className="hover:text-white transition">
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Resources
                        </h3>

                        <div className="flex flex-col gap-3 text-purple-100">
                            <p className="hover:text-white transition cursor-pointer">
                                Adoption Guide
                            </p>

                            <p className="hover:text-white transition cursor-pointer">
                                FAQ
                            </p>

                            <p className="hover:text-white transition cursor-pointer">
                                Privacy Policy
                            </p>

                            <p className="hover:text-white transition cursor-pointer">
                                Terms & Conditions
                            </p>
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Follow Us
                        </h3>

                        <div className="flex gap-4">
                            <Link
                                href="#"
                                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                            >
                                <FaFacebookF />
                            </Link>

                            <Link
                                href="#"
                                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                            >
                                <FaInstagram />
                            </Link>

                            <Link
                                href="#"
                                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                            >
                                <FaTwitter />
                            </Link>
                        </div>

                        <p className="text-purple-100 mt-5">
                            support@pethome.com
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-purple-100 text-sm">
                        © {new Date().getFullYear()} PetHome. All Rights Reserved.
                    </p>

                    <p className="text-purple-100 text-sm flex items-center gap-2">
                        Made with <FaHeart className="text-red-400" /> for pet lovers
                    </p>
                </div>

            </div>
        </footer>
    );
}