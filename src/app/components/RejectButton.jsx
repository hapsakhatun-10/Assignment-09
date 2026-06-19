"use client";

import toast from "react-hot-toast";
import { getAuthToken } from "@/lib/api";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

export default function RejectButton({
    requestId,
    petId,

}) {


    const handleReject = async () => {
        try {
            const token = await getAuthToken();
            const res = await fetch(
                `${SERVER_URL}/adoption-requests/${requestId}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        status: "Rejected",
                        petId,
                    }),
                }
            );

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to reject request");
            }

            toast.success("Request rejected!");
            window.location.reload();
        } catch (err) {
            toast.error(err.message);
        }
    };


    return (
        <button
            onClick={handleReject}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition"
        >
            Reject
        </button>
    );
}