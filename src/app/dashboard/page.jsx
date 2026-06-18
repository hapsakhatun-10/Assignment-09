"use client";

import { useState } from "react";
import AddPetPage from "../add-pets/page";
import MyRequestsPage from "../my-requests/page";



export default function DashboardPage() {
    const [activePage, setActivePage] = useState("requests");

    return (
        <div className="min-h-screen flex bg-purple-200">

            {/* LEFT SIDEBAR */}
            <div className="w-64 bg-purple-200 border-r p-6 space-y-4">

                <h2 className="text-xl font-bold text-purple-700">
                    Dashboard
                </h2>

                <div className="space-y-2 mt-6">

                    <button
                        onClick={() => setActivePage("requests")}
                        className={`block w-full text-left px-4 py-2 rounded-xl transition ${activePage === "requests"
                                ? "bg-white text-purple-700 shadow"
                                : "hover:bg-purple-50 text-gray-700"
                            }`}
                    >
                        🐾 My Requests
                    </button>

                    <button
                        onClick={() => setActivePage("add-pets")}
                        className={`block w-full text-left px-4 py-2 rounded-xl transition ${activePage === "add-pets"
                                ? "bg-white text-purple-700 shadow"
                                : "hover:bg-purple-50 text-gray-700"
                            }`}
                    >
                        ➕ Add Pet
                    </button>



                </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex-1 p-10">

                {activePage === "home" && (
                    <h1 className="text-2xl font-bold text-purple-700">
                        Welcome to Dashboard
                    </h1>
                )}

                {activePage === "requests" && <MyRequestsPage />}

                {activePage === "add-pets" && <AddPetPage />}

            </div>

        </div>
    );
}