"use client";

import { useState } from "react";
import {
    LayoutDashboard,
    PlusSquare,
    PawPrint,
    LogOut,
    TrendingUp,
    CheckCircle2,
    PlusSquareIcon
} from "lucide-react";
import AddPetPage from "../add-pets/page";
import MyRequestsPage from "../my-requests/page";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import MyListingPage from "../my-listing/page";

export default function DashboardPage() {
    const [activePage, setActivePage] = useState("home");

    const { data: session } = authClient.useSession();
    const userData = session?.user;

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/");
    };



    return (
        <div className="flex min-h-screen bg-purple-50 p-6 text-gray-800">

            <aside className="w-72 bg-white rounded-2xl shadow-sm border border-purple-100 flex flex-col overflow-hidden h-fit">
                {/* User Mini Profile Header */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-5 flex items-center gap-3">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                        <Image
                            src={userData?.image || "/default-avatar.png"}
                            alt="avatar"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-sm leading-tight">{userData?.name}</h3>
                        <p className="text-purple-100 text-xs truncate max-w-[160px]">{userData?.email}</p>
                        <span className="inline-block bg-white/20 text-white text-[10px] font-medium px-2 py-0.5 rounded-full mt-1">
                            {userData?.role}
                        </span>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="p-4 flex-1 flex flex-col gap-1">
                    <button
                        onClick={() => setActivePage("home")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activePage === "home"
                            ? "bg-purple-600 text-white shadow-sm"
                            : "text-gray-600 hover:bg-purple-50"
                            }`}
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </button>

                    <button
                        onClick={() => setActivePage("add-pets")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activePage === "add-pets"
                            ? "bg-purple-600 text-white shadow-sm"
                            : "text-gray-600 hover:bg-purple-50"
                            }`}
                    >
                        <PlusSquare size={18} />
                        Add Pet
                    </button>



                    <button
                        onClick={() => setActivePage("my-listings")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activePage === "my-listings"
                            ? "bg-purple-600 text-white shadow-sm"
                            : "text-gray-600 hover:bg-purple-50"
                            }`}
                    >
                        <PlusSquareIcon size={18} />
                        My Listings
                    </button>

                    <button
                        onClick={() => setActivePage("requests")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activePage === "requests"
                            ? "bg-purple-600 text-white shadow-sm"
                            : "text-gray-600 hover:bg-purple-50"
                            }`}
                    >
                        <PawPrint size={18} />
                        My Requests
                    </button>



                    <hr className="my-4 border-purple-100" />

                    {/* Logout Button */}
                    <button onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-auto">
                        <LogOut size={18} />
                        Logout
                    </button>
                </nav>
            </aside>




            {/* MAIN */}
            <main className="flex-1 ml-6 bg-white rounded-2xl shadow-sm border border-purple-100 p-8">

                {activePage === "home" && (
                    <>
                        {/* HEADER */}
                        <div className="mb-6 flex items-center justify-between">
                            {/* LEFT SIDE TEXT */}
                            <div>
                                <h1 className="text-2xl font-bold text-purple-700">
                                    Dashboard Overview
                                </h1>
                                <p className="text-gray-500 text-sm">
                                    Manage your pets and adoption requests
                                </p>
                            </div>

                            {/* RIGHT SIDE COUNTS */}
                            <div className="flex items-center gap-4">

                                <div className="bg-purple-50 border border-purple-100 px-4 py-2 rounded-xl text-center">
                                    <p className="text-xs text-gray-500">Total</p>
                                    <p className="text-lg font-bold text-purple-700">12</p>
                                </div>

                                <div className="bg-green-50 border border-green-100 px-4 py-2 rounded-xl text-center">
                                    <p className="text-xs text-gray-500">Available</p>
                                    <p className="text-lg font-bold text-green-600">8</p>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-100 px-4 py-2 rounded-xl text-center">
                                    <p className="text-xs text-gray-500">Pending</p>
                                    <p className="text-lg font-bold text-yellow-600">4</p>
                                </div>

                            </div>
                        </div>


                        {/* QUICK ACTIONS */}
                        <div className="flex items-center gap-2 mb-4 font-bold text-sm text-gray-800">
                            <TrendingUp size={16} className="text-purple-600" />
                            Quick Actions
                        </div>

                        <div className="grid grid-cols-3 gap-4">

                            <div
                                onClick={() => setActivePage("add-pets")}
                                className="bg-purple-50 rounded-xl p-5 cursor-pointer hover:border-purple-300 border border-transparent"
                            >
                                <PlusSquare className="text-purple-600 mb-3" />
                                <h4 className="font-semibold">Add Pet</h4>
                                <p className="text-xs text-gray-500">List a new pet</p>
                            </div>

                            <div
                                onClick={() => setActivePage("my-listings")}
                                className="bg-purple-50 rounded-xl p-5 cursor-pointer hover:border-purple-300 border border-transparent"
                            >
                                <PawPrint className="text-purple-600 mb-3" />
                                <h4 className="font-semibold">My Listings</h4>
                                <p className="text-xs text-gray-500">Manage your pet listings</p>
                            </div>
                            <div
                                onClick={() => setActivePage("requests")}
                                className="bg-purple-50 rounded-xl p-5 cursor-pointer hover:border-purple-300 border border-transparent"
                            >
                                <PawPrint className="text-purple-600 mb-3" />
                                <h4 className="font-semibold">My Requests</h4>
                                <p className="text-xs text-gray-500">Track requests</p>
                            </div>

                        </div>

                        {/* TIPS */}
                        <div className="mt-8 bg-purple-50 rounded-xl p-6 border border-purple-100">
                            <h3 className="text-sm font-bold text-purple-700 mb-3">
                                Tips for Better Listings
                            </h3>

                            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                                {[
                                    "Use high-quality photos",
                                    "Write detailed description",
                                    "Set fair adoption fee",
                                    "Keep listings updated"
                                ].map((tip, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-purple-600" />
                                        {tip}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {activePage === "add-pets" && <AddPetPage />}
                {activePage === "my-listings" && <MyListingPage />}
                {activePage === "requests" && <MyRequestsPage />}


            </main>
        </div>
    );
}