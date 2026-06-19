"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import OwnerRequests from "../components/OwnerRequested";
import Requested from "../components/Requested";

export default function MyRequestsPage() {
    const { data: session } = authClient.useSession();
    const userEmail = session?.user?.email;

    const [tab, setTab] = useState("user");

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold text-purple-700 mb-4">
                My Requests
            </h1>

            {/* TABS */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={() => setTab("user")}
                    className={`px-4 py-2 border rounded-lg ${tab === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-white"
                        }`}
                >
                    I Requested
                </button>

                <button
                    onClick={() => setTab("owner")}
                    className={`px-4 py-2 border rounded-lg ${tab === "owner"
                        ? "bg-purple-600 text-white"
                        : "bg-white"
                        }`}
                >
                    My Pet Requests
                </button>
            </div>

            {/* COMPONENT SWITCH */}
            {tab === "user" && (
                <Requested email={userEmail} />
            )}

            {tab === "owner" && (
                <OwnerRequests email={userEmail} />
            )}

        </div>
    );
}