"use client";

import toast from "react-hot-toast";
import { getAuthToken } from "@/lib/api";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

export default function ApproveButton({
    requestId,
    petId,
    onSuccess,
}) {

    const handleApprove = async () => {
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
                        status: "Approved",
                        petId,
                    }),
                }
            );

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to approve request");
            }

            toast.success("Request approved!");
            if (onSuccess) {
                onSuccess();
            } else {
                window.location.reload();
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <button
            onClick={handleApprove}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition"
        >
            Approve
        </button>
    );
}