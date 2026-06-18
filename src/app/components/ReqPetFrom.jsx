"use client";

import { useRouter } from "next/navigation";

export default function RequestPetFrom({ pet }) {
    const router = useRouter();

    if (!pet) {
        return <div className="p-10 text-center">Loading...</div>;
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
            email: form.email.value,
            phone: form.phone.value,
            address: form.address.value,
            message: form.message.value,
        };

        const res = await fetch("http://localhost:8000/adoption-requests", {
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
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 border">

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Request to Adopt{" "}
                    <span className="text-purple-700">
                        {pet.petName}
                    </span>
                </h1>
                <p className="text-gray-500 mt-2">
                    Fill up the form to submit your adoption request
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleRequest} className="space-y-5">

                <input
                    name="name"
                    placeholder="Full Name"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <input
                    name="email"
                    placeholder="Email Address"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <input
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <input
                    name="address"
                    placeholder="Your Address"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <input
                    type="date"
                    name="pickupDate"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                    name="message"
                    rows={5}
                    placeholder="Why do you want to adopt this pet?"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition"
                >
                    Submit Adoption Request
                </button>





            </form>
        </div>
    );
}