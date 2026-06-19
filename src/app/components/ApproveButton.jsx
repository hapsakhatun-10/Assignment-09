"use client";

export default function ApproveButton({
    requestId,
    petId,
    onSuccess,
}) {

    const handleApprove = async () => {
        const res = await fetch(
            `http://localhost:8000/adoption-requests/${requestId}/status`,
            {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    status: "Approved",
                    petId,
                }),
            }
        );

        const data = await res.json();

        if (data.modifiedCount > 0) {
            window.location.reload();
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