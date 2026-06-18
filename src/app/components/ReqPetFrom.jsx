"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function RequestPetFrom({ pet }) {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    if (!pet) {
        return <div>Loading...</div>;
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
        <div>
            <form onSubmit={handleRequest}>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}