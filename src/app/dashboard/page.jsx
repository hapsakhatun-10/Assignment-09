"use client";

import { useState } from "react";
import {
    LayoutDashboard,
    PlusSquare,
    PawPrint,
    LogOut,
    TrendingUp,
    CheckCircle2
} from "lucide-react";
import AddPetPage from "../add-pets/page";
import MyRequestsPage from "../my-requests/page";
import Image from "next/image";

export default function DashboardPage() {
    const [activePage, setActivePage] = useState("home");

    // Profile details updated to match the reference text layout structure
    const userData = {
        name: "Hapsa Khatun",
        email: "hk.hapsakhatun@gmail.com",
        role: "Pet Owner",
        avatar: "https://via.placeholder.com/150"
    };

    const tips = [
        "Use high-quality photos of your pet",
        "Write a detailed and honest description",
        "Set a fair and reasonable adoption fee",
        "Keep your listings up to date"
    ];

    return (
        <div className="flex min-h-screen bg-purple-50 p-6 font-sans antialiased text-gray-800">

            {/* ================= LEFT SIDEBAR ================= */}
            <aside className="w-72 bg-white rounded-2xl shadow-sm border border-purple-100 flex flex-col overflow-hidden h-fit">
                {/* User Mini Profile Header */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-5 flex items-center gap-3">
                    <Image
                        src="/default-avatar.png"
                        alt="avatar"
                        width={64}
                        height={64}
                    />
                    <div>
                        <h3 className="text-white font-semibold text-sm leading-tight">{userData.name}</h3>
                        <p className="text-purple-100 text-xs truncate max-w-[160px]">{userData.email}</p>
                        <span className="inline-block bg-white/20 text-white text-[10px] font-medium px-2 py-0.5 rounded-full mt-1">
                            {userData.role}
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
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-auto">
                        <LogOut size={18} />
                        Logout
                    </button>
                </nav>
            </aside>

            {/* ================= RIGHT CONTENT AREA ================= */}
            <main className="flex-1 ml-6 bg-white rounded-2xl shadow-sm border border-purple-100 p-8">

                {/* 1. MAIN HOME DASHBOARD VIEW */}
                {activePage === "home" && (
                    <>
                        {/* Welcome Banner Card */}
                        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white flex items-center justify-between shadow-sm relative overflow-hidden">
                            <div className="flex items-center gap-4 z-10">
                                <Image
                                    src="/default-avatar.png"
                                    alt="avatar"
                                    width={64}
                                    height={64}
                                />
                                <div>
                                    <p className="text-purple-100 text-xs">Welcome back,</p>
                                    <h2 className="text-2xl font-bold tracking-tight">{userData.name}</h2>
                                    <p className="text-purple-100 text-xs mt-0.5">{userData.email}</p>
                                </div>
                            </div>

                            {/* Metrics Counters */}
                            <div className="flex gap-4 z-10">
                                {[
                                    { label: "Total Pets", count: 0 },
                                    { label: "Available", count: 0 },
                                    { label: "Adopted", count: 0 }
                                ].map((metric, idx) => (
                                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 text-center min-w-[85px] border border-white/10">
                                        <div className="text-xl font-bold leading-none mb-1">{metric.count}</div>
                                        <div className="text-[10px] text-purple-100 font-medium whitespace-nowrap">{metric.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Subtle decorative background shapes */}
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />
                            <div className="absolute right-20 -top-10 w-24 h-24 bg-white/5 rounded-full pointer-events-none" />
                        </div>

                        {/* Quick Actions Header */}
                        <div className="flex items-center gap-2 mt-8 mb-4 text-gray-900 font-bold text-sm tracking-wide uppercase">
                            <TrendingUp size={16} className="text-purple-600" />
                            Quick Actions
                        </div>

                        {/* Quick Actions Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Add Pet Shortcut */}
                            <div
                                onClick={() => setActivePage("add-pets")}
                                className="bg-purple-50/60 rounded-xl p-5 border border-transparent hover:border-purple-200 transition-all cursor-pointer relative group flex flex-col justify-between min-h-[140px]"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="text-purple-600 bg-white p-2.5 rounded-xl shadow-sm border border-purple-100 group-hover:scale-105 transition-transform">
                                        <PlusSquare size={24} />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h4 className="text-gray-900 font-bold text-sm">Add Pet</h4>
                                    <p className="text-gray-500 text-xs mt-0.5">List a new pet for adoption</p>
                                </div>
                            </div>

                            {/* Requests Shortcut */}
                            <div
                                onClick={() => setActivePage("requests")}
                                className="bg-purple-50/60 rounded-xl p-5 border border-transparent hover:border-purple-200 transition-all cursor-pointer relative group flex flex-col justify-between min-h-[140px]"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="text-purple-600 bg-white p-2.5 rounded-xl shadow-sm border border-purple-100 group-hover:scale-105 transition-transform">
                                        <PawPrint size={24} />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h4 className="text-gray-900 font-bold text-sm">My Requests</h4>
                                    <p className="text-gray-500 text-xs mt-0.5">Track your adoption requests</p>
                                </div>
                            </div>
                        </div>

                        {/* Tips Section */}
                        <div className="mt-8 bg-purple-50/40 rounded-xl p-6 border border-purple-100/50">
                            <div className="flex items-center gap-2 text-purple-700 font-bold text-sm mb-4">
                                <PawPrint size={16} className="fill-purple-700" />
                                Tips for Better Listings
                            </div>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                {tips.map((tip, idx) => (
                                    <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                                        <CheckCircle2 size={14} className="text-purple-600 shrink-0" />
                                        {tip}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* 2. SUBPAGES / ROUTED VIEWS */}
                {activePage === "requests" && <MyRequestsPage />}

                {activePage === "add-pets" && <AddPetPage />}

            </main>
        </div>
    );
}