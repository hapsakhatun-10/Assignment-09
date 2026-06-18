"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CancelButton from "../components/CancelBtn";
import { FiClock, FiMapPin, FiMessageSquare } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function MyRequestsPage() {
    const { data: session } = authClient.useSession();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                if (!session?.user?.email) return;

                const res = await fetch(
                    `http://localhost:8000/adoption-requests?email=${session.user.email}`
                );

                const data = await res.json();
                setRequests(data || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }

            console.log(session?.user?.email);
        };

        fetchRequests();
    }, [session]);

    if (loading) {
        return (
            <div className="p-10 text-purple-600 font-semibold">
                Loading requests...
            </div>
        );
    }



    return (
        <div className="mx-auto px-6 py-10">

            {/* Header */}
            <div className="mb-8">
                <p className="text-purple-500 font-semibold uppercase tracking-widest text-sm">
                    🐾 Adoption Tracker
                </p>

                <h1 className="text-4xl font-bold text-gray-900 mt-2">
                    My Requests
                </h1>

                <p className="text-gray-500 mt-2">
                    Track the status of your adoption requests.
                </p>
            </div>

            {/* List */}
            <div className="space-y-6">

                {requests.length === 0 ? (
                    <p className="text-gray-500">No requests found.</p>
                ) : (
                    requests.map((request) => (
                        <div
                            key={request._id}
                            className="group border bg-white border-purple-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

                                {/* Left */}
                                <div className="flex items-start gap-5">

                                    {/* Image */}
                                    {request.image ? (
                                        <Image
                                            src={request.image}
                                            alt={request.petName}
                                            width={90}
                                            height={90}
                                            className="rounded-2xl object-cover w-24 h-24 ring-2 ring-purple-200 group-hover:ring-purple-400 transition"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 flex items-center justify-center bg-purple-50 text-purple-400 rounded-2xl text-xs">
                                            No Image
                                        </div>
                                    )}

                                    {/* Info */}
                                    <div className="space-y-1">

                                        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition">
                                            {request.petName}
                                        </h2>

                                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                            <FiClock className="text-purple-500" />
                                            <span>
                                                Requested:{" "}
                                                <span className="font-medium text-gray-800">
                                                    {request.requestedAt
                                                        ? new Date(request.requestedAt).toLocaleString()
                                                        : "N/A"}
                                                </span>
                                            </span>
                                        </div>

                                        <div className="flex items-start gap-2 text-sm text-gray-600 mt-1">
                                            <FiMapPin className="text-purple-500 mt-0.5" />
                                            <span>
                                                <span className="font-medium text-gray-800">
                                                    Address:
                                                </span>{" "}
                                                {request.address}
                                            </span>
                                        </div>

                                        {request.message && (
                                            <div className="flex items-start gap-2 text-sm text-gray-500 mt-1">
                                                <FiMessageSquare className="text-purple-400 mt-0.5" />
                                                <span className="italic line-clamp-2">
                                                    {request.message}
                                                </span>
                                            </div>
                                        )}

                                    </div>
                                </div>

                                {/* Right */}
                                <div className="flex items-center">
                                    <CancelButton id={request._id} />
                                </div>

                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}