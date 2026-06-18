"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function RequestPetFrom({ pet }) {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    if (!pet) {
        return (
            <div className="p-5 bg-white rounded-xl shadow">
                Loading...
            </div>
        );
    }

    const handleRequest = async (e) => {
        e.preventDefault();

        const form = e.target;

        const requestData = {
            petId: pet._id,
            petName: pet.petName,
            petLocation: pet.location,
            image: pet.image,
            shelterEmail: pet.shelterEmail,
            status: "Pending",
            requestedAt: new Date(),

            pickupDate: form.pickupDate.value,
            applicantName: form.name.value,
            email: session?.user?.email,
            phone: form.phone.value,
            address: form.address.value,
            message: form.message.value,
        };

        const res = await fetch("http://localhost:8000/adoption-requests/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        const data = await res.json();

        if (data.insertedId) {
            alert("Request Sent");
            router.push("/my-requests");
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-10 border border-purple-100">

            {/* Header */}
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
                    className="w-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none p-2 rounded-lg"
                />

                <input
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none p-2 rounded-lg"
                />

                <input
                    name="pickupDate"
                    type="date"
                    className="w-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none p-2 rounded-lg"
                />

                <textarea
                    name="address"
                    placeholder="Your Address"
                    className="w-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none p-2 rounded-lg"
                />

                <textarea
                    name="message"
                    placeholder="Message (optional)"
                    className="w-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none p-2 rounded-lg"
                />

                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition font-medium"
                >
                    Submit Request
                </button>

            </form>
        </div>
    );
}