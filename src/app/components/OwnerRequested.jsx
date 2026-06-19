"use client";

import { useEffect, useState } from "react";
import ApproveButton from "./ApproveButton";
import RejectButton from "./RejectButton";

export default function OwnerRequests({ email }) {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (!email) return;

        fetch(`http://localhost:8000/owner-requests?email=${email}`)
            .then((res) => res.json())
            .then((data) => setRequests(data))
            .catch((err) => console.log(err));
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
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-purple-100 flex-shrink-0">
                            <img
                                src={req.image}
                                alt={req.petName}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div>
                            <h2 className="font-semibold">
                                {req.petName}
                            </h2>

                            <p>{req.userName}</p>

                            <p className="text-sm text-gray-500">
                                {req.userEmail}
                            </p>

                            <p className="text-sm">
                                Status: {req.status}
                            </p>
                        </div>
                    </div>

                    {req.status === "Pending" && (
                        <div className="flex flex-col gap-2">
                            <ApproveButton
                                requestId={req._id}
                                petId={req.petId}
                            />

                            <RejectButton
                                requestId={req._id}
                                petId={req.petId}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}