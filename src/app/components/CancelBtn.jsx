"use client";

import { useState } from "react";

const CancelButton = ({ id, onSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                `http://localhost:8000/adoption-requests/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (res.ok) {
                if (onSuccess) {
                    onSuccess(id);
                } else {
                    window.location.reload();
                }
            }
        } catch (error) {
            console.log(error);
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