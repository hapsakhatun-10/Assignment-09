"use client";

export default function RejectButton({
    requestId,
    petId,

}) {


    const handleReject = async () => {
        const res = await fetch(
            `http://localhost:8000/adoption-requests/${requestId}/status`,
            {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    status: "Rejected",
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
            onClick={handleReject}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition"
        >
            Reject
        </button>
    );
}