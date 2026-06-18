"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RequestPetFrom({ pet }) {
    const router = useRouter();

    const { data: session } = authClient.useSession();
    const user = session?.user;

    if (!pet) {
        return <p>Pet not found</p>;
    }

    const {
        _id,
        petName,
        age,
        location,
        image,
    } = pet;

    const handleRequest = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login first");
            return;
        }

        const form = e.target;

        const requestData = {
            userId: user?.id || "",
            userImage: user?.image || "",
            userName: user?.name || "",
            userEmail: user?.email || "",

            petId: _id,
            petName,
            age,
            location,
            image,

            requesterName: form.name.value,
            phone: form.phone.value,
            pickupDate: form.pickupDate.value,
            address: form.address.value,
            message: form.message.value,

            status: "Pending",
            createdAt: new Date(),
        };

        try {
            const res = await fetch(
                "http://localhost:8000/adoption-requests",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                }
            );

            const data = await res.json();

            if (data.insertedId || data.acknowledged) {
                toast.success("Request sent successfully!");
                form.reset();
                router.push("/my-requests");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to send request");
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-10 border border-purple-100">
            <div className="mb-5">
                <h2 className="text-2xl font-bold text-purple-700">
                    Request Adoption
                </h2>
                <p className="text-sm text-gray-500">
                    Fill the form to request this pet
                </p>
            </div>

            <form onSubmit={handleRequest} className="space-y-4">
                <input
                    name="name"
                    placeholder="Your Name"
                    defaultValue={user?.name || ""}
                    required
                    className="w-full border border-gray-200 p-2 rounded-lg"
                />

                <input
                    name="phone"
                    placeholder="Phone Number"
                    required
                    className="w-full border border-gray-200 p-2 rounded-lg"
                />

                <input
                    name="pickupDate"
                    type="date"
                    required
                    className="w-full border border-gray-200 p-2 rounded-lg"
                />

                <textarea
                    name="address"
                    placeholder="Your Address"
                    required
                    className="w-full border border-gray-200 p-2 rounded-lg"
                />

                <textarea
                    name="message"
                    placeholder="Message (optional)"
                    className="w-full border border-gray-200 p-2 rounded-lg"
                />

                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
                >
                    Submit Request
                </button>
            </form>
        </div>
    );
}