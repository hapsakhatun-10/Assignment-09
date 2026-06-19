"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { getAuthToken } from "@/lib/api";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

const CancelButton = ({ id, onSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        try {
            setLoading(true);

            const token = await getAuthToken();
            const res = await fetch(
                `${SERVER_URL}/adoption-requests/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to cancel request");
            }

            toast.success("Request cancelled!");
            if (onSuccess) {
                onSuccess(id);
            } else {
                window.location.reload();
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleCancel}
            disabled={loading}
            className={`px-5 py-2 border rounded-xl transition ${loading
                    ? "border-gray-300 text-gray-400 cursor-not-allowed"
                    : "border-red-300 text-red-500 hover:bg-red-50"
                }`}
        >
            {loading ? "Cancelling..." : "Cancel"}
        </button>
    );
};

export default CancelButton;