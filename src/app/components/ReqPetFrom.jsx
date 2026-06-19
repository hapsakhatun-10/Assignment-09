"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RequestPetFrom({ pet }) {
    const router = useRouter();

    const { data: session } = authClient.useSession();
    const user = session?.user;
    const userEmail = user?.email;

    if (!pet) {
        return <p>Pet not found</p>;
    }

    const {
        _id,
        petName,
        age,
        location,
        image,
        ownerEmail,
    } = pet;

    const handleRequest = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login first");
            return;
        }

        if (ownerEmail === userEmail) {
            toast.error("You cannot request your own pet");
            return;
        }

        const form = e.target;

        const requestData = {
            userId: user?.id || "",
            userImage: user?.image || "",
            userName: user?.name || "",
            userEmail: userEmail,

            petId: _id,
            petName,
            age,
            location,
            image,

            ownerEmail: pet.ownerEmail,

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

        console.log("PET DATA:", pet);
    };


    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-10 border border-purple-100">
            <div className="mb-5">
                <h2 className="text-2xl font-bold text-purple-700">
                    Request Adoption
                </h2>
            </div>

            <form onSubmit={handleRequest} className="space-y-5">

                <input
                    name="name"
                    defaultValue={user?.name || ""}
                    required
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-purple-400
                   focus:border-purple-400 transition shadow-sm"
                />

                <input
                    name="phone"
                    required
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-purple-400
                   focus:border-purple-400 transition shadow-sm"
                />

                <input
                    name="pickupDate"
                    type="date"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-purple-400
                   focus:border-purple-400 transition shadow-sm"
                />

                <textarea
                    name="address"
                    required
                    placeholder="Your Address"
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-purple-400
                   focus:border-purple-400 transition shadow-sm resize-none"
                />

                <textarea
                    name="message"
                    placeholder="Message (optional)"
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-purple-400
                   focus:border-purple-400 transition shadow-sm resize-none"
                />

                <button
                    type="submit"
                    disabled={ownerEmail === userEmail}
                    className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-md
            ${ownerEmail === userEmail
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700"
                        }`}
                >
                    {ownerEmail === userEmail
                        ? "You Own This Pet"
                        : "Submit Request"}
                </button>

            </form>
        </div>
    );
}