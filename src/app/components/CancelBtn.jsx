"use client";

const CancelButton = ({ id, onSuccess }) => {
    const handleCancel = async () => {

        const res = await fetch(
            `http://localhost:8000/adoption-requests/${id}`,
            {
                method: "DELETE",
            }
        );

        const data = await res.json();
        window.location.reload();

    };

    return (
        <button
            onClick={handleCancel}
            className="px-5 py-2 border border-red-300 text-red-500 rounded-xl hover:bg-red-50 transition"
        >
            Cancel
        </button>
    );
};

export default CancelButton;