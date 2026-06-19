"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CancelButton from "./CancelBtn";
import { getAuthToken } from "@/lib/api";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

export default function Requested({ email }) {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (!email) return;

        const fetchRequests = async () => {
            try {
                const token = await getAuthToken();
                const res = await fetch(`${SERVER_URL}/my-requests?email=${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error("Failed to fetch requests");
                const data = await res.json();
                setRequests(Array.isArray(data) ? data : []);
            } catch {
                toast.error("Failed to load your requests");
            }
        };

        fetchRequests();
    }, [email]);

    return (
        <div className="grid gap-5">

            {requests.length === 0 && (
                <div className="text-center py-10 bg-purple-50 border border-purple-100 rounded-2xl">
                    <p className="text-gray-500 font-medium">
                        No requests found
                    </p>
                </div>
            )}

            {requests.map((req) => (
                <div
                    key={req._id}
                    className="bg-white border border-purple-100 rounded-2xl shadow-sm hover:shadow-md transition p-5 flex items-center justify-between"
                >

                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-4">

                        {/* IMAGE */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-purple-100 flex-shrink-0">
                            {req.image ? (
                                <img
                                    src={req.image}
                                    alt={req.petName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-purple-600 font-bold">
                                    {req.petName?.charAt(0)}
                                </div>
                            )}
                        </div>

                        {/* INFO */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                {req.petName}
                            </h2>

                            <p className="text-sm text-gray-500">
                                Status:{" "}
                                <span
                                    className={`font-semibold ${req.status === "Approved"
                                            ? "text-green-600"
                                            : req.status === "Rejected"
                                                ? "text-red-500"
                                                : "text-purple-600"
                                        }`}
                                >
                                    {req.status}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div>
                        <CancelButton id={req._id} />
                    </div>

                </div>
            ))}
        </div>
    );
}