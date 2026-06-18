"use client";

import { useState } from "react";
import AddPetPage from "../add-pets/page";
import MyRequestsPage from "../my-requests/page";



export default function DashboardPage() {
    const [activePage, setActivePage] = useState("home");

    return (
        <div className="min-h-screen flex bg-gray-50">

            {/* LEFT SIDEBAR */}
            <div className="w-64 bg-white border-r p-6 space-y-4">

                <h2 className="text-xl font-bold text-purple-700">
                    Dashboard
                </h2>

                <div className="space-y-2 mt-6">

                    <button
                        onClick={() => setActivePage("requests")}
                        className="block w-full text-left px-4 py-2 rounded-xl hover:bg-purple-50 text-gray-700"
                    >
                        🐾 My Requests
                    </button>

                    <button
                        onClick={() => setActivePage("add-pets")}
                        className="block w-full text-left px-4 py-2 rounded-xl hover:bg-purple-50 text-gray-700"
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