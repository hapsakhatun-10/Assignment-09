"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    LayoutDashboard,
    PlusSquare,
    PawPrint,
    LogOut,
    TrendingUp,
    CheckCircle2,
    PlusSquareIcon,
    Menu,
    X,
} from "lucide-react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import { getAuthToken } from "@/lib/api";
import Image from "next/image";

import AddPetPage from "../add-pets/page";
import MyRequestsPage from "../my-requests/page";
import MyListingPage from "../my-listing/page";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

export default function DashboardPage() {
    const router = useRouter();

    const [activePage, setActivePage] = useState("home");
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { data: session } = authClient.useSession();
    const userData = session?.user;
    const userEmail = session?.user?.email;

    // FETCH PETS
    useEffect(() => {
        if (!userEmail) return;

        const fetchPets = async () => {
            try {
                setLoading(true);

                const token = await getAuthToken();
                const res = await fetch(
                    `${SERVER_URL}/my-listings/${userEmail}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();
                setPets(data || []);
            } catch (err) {
                toast.error("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, [userEmail]);


    const total = pets.length;
    const available = pets.filter((p) => !p.adopted).length;
    const adopted = pets.filter((p) => p.adopted).length;

    // LOGOUT
    const handleLogout = async () => {
        await authClient.signOut();
        router.replace("/");
        router.refresh();
    };

    if (loading) {
        return (
            <div className="p-6 text-gray-500">
                Loading dashboard...
            </div>
        );
    }

    const closeSidebar = () => setSidebarOpen(false);

    const sidebarContent = (
        <>
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-5 flex items-center gap-3">
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                    <Image
                        src={userData?.image || "/default-avatar.png"}
                        alt="avatar"
                        width={60}
                        height={60}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="min-w-0">
                    <h3 className="text-white font-semibold text-sm truncate">
                        {userData?.name}
                    </h3>
                    <p className="text-purple-100 text-xs truncate">
                        {userData?.email}
                    </p>
                </div>
            </div>

            <nav className="p-4 flex flex-col gap-2">
                <button
                    onClick={() => { setActivePage("home"); closeSidebar(); }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${activePage === "home"
                        ? "bg-purple-600 text-white"
                        : "text-gray-600 hover:bg-purple-50"
                    }`}
                >
                    <LayoutDashboard size={18} />
                    Dashboard
                </button>

                <button
                    onClick={() => { setActivePage("add-pets"); closeSidebar(); }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${activePage === "add-pets"
                        ? "bg-purple-600 text-white"
                        : "text-gray-600 hover:bg-purple-50"
                    }`}
                >
                    <PlusSquare size={18} />
                    Add Pet
                </button>

                <button
                    onClick={() => { setActivePage("my-listings"); closeSidebar(); }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${activePage === "my-listings"
                        ? "bg-purple-600 text-white"
                        : "text-gray-600 hover:bg-purple-50"
                    }`}
                >
                    <PlusSquareIcon size={18} />
                    My Listings
                </button>

                <button
                    onClick={() => { setActivePage("requests"); closeSidebar(); }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${activePage === "requests"
                        ? "bg-purple-600 text-white"
                        : "text-gray-600 hover:bg-purple-50"
                    }`}
                >
                    <PawPrint size={18} />
                    My Requests
                </button>

                <hr className="my-4 border-purple-100" />

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </nav>
        </>
    );

    return (
        <div className="flex min-h-screen bg-purple-50 p-4 md:p-6 text-gray-800">

            {/* Mobile toggle button */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded-xl shadow-md border border-purple-100"
            >
                <Menu size={20} className="text-purple-700" />
            </button>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={closeSidebar}
                    />
                    <aside className="fixed left-0 top-0 h-full w-72 bg-white rounded-r-2xl shadow-xl flex flex-col overflow-y-auto">
                        <div className="flex justify-end p-3">
                            <button onClick={closeSidebar} className="p-1 hover:bg-purple-50 rounded-lg">
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>
                        {sidebarContent}
                    </aside>
                </div>
            )}

            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-72 shrink-0 bg-white rounded-2xl shadow-sm border border-purple-100 flex flex-col overflow-hidden h-fit">
                {sidebarContent}
            </aside>

            {/* MAIN */}
            <main className="flex-1 ml-0 lg:ml-6 bg-white rounded-2xl shadow-sm border border-purple-100 p-4 md:p-8">

                {/* HOME */}
                {activePage === "home" && (
                    <>
                        <div className="mb-6 pt-10 lg:pt-0">
                            <h1 className="text-2xl font-bold text-purple-700">
                                Dashboard Overview
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Manage your pets and requests
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            <div className="p-4 border rounded-xl">
                                <p className="text-gray-500">Total</p>
                                <h2 className="text-xl font-bold">{total}</h2>
                            </div>
                            <div className="p-4 border rounded-xl">
                                <p className="text-gray-500">Available</p>
                                <h2 className="text-xl font-bold text-green-600">
                                    {available}
                                </h2>
                            </div>
                            <div className="p-4 border rounded-xl">
                                <p className="text-gray-500">Adopted</p>
                                <h2 className="text-xl font-bold text-purple-600">
                                    {adopted}
                                </h2>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4 font-bold text-sm text-gray-800">
                            <TrendingUp size={16} className="text-purple-600" />
                            Quick Actions
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 mb-8 gap-4">
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

                        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                            <h3 className="font-bold text-purple-700 mb-3">Tips</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                                {[
                                    "Use good photos",
                                    "Write details",
                                    "Set fair price",
                                    "Keep updated",
                                ].map((t, i) => (
                                    <div key={i} className="flex gap-2">
                                        <CheckCircle2 size={14} />
                                        {t}
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