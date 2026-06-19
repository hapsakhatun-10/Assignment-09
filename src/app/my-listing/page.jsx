"use client";

import { useRouter } from "next/navigation";
import { PawPrint } from "lucide-react";
import { useEffect, useState } from "react";

// 👉 যদি auth থাকে (NextAuth / better-auth / custom)
import { authClient } from "@/lib/auth-client";

const MyListingPage = () => {
    const router = useRouter();

    const { data: session } = authClient.useSession();

    const userEmail = session?.user?.email;

    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        if (!userEmail) return;

        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    `http://localhost:8000/my-listings/${userEmail}`
                );

                const data = await res.json();
                setPets(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userEmail]);



    const isEmpty = pets.length === 0;

    // loading UI
    if (loading) {
        return (
            <div className="p-6 text-gray-500">
                Loading your listings...
            </div>
        );
    }

    return (
        <div className="p-6">

            {/* HEADER */}
            <h1 className="text-2xl font-bold text-purple-700 mb-2">
                My Listings
            </h1>

            <p className="text-gray-500 text-sm mb-8">
                Manage all your pet listings here
            </p>

            {/* EMPTY STATE */}
            {isEmpty ? (
                <div className="flex flex-col items-center justify-center text-center py-20 bg-purple-50 border border-purple-100 rounded-2xl">

                    <PawPrint size={40} className="text-purple-500 mb-3" />

                    <h2 className="text-lg font-bold text-gray-700">
                        No Listings Yet
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        You haven’t added any pets for adoption yet.
                    </p>

                    <button
                        onClick={() => router.push("/add-pets")}
                        className="mt-5 bg-purple-600 text-white px-5 py-2 rounded-xl text-sm hover:bg-purple-700 transition"
                    >
                        Add Listing
                    </button>
                </div>
            ) : (
                /* LIST VIEW */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {pets.map((pet) => (
                        <div
                            key={pet._id}
                            className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={pet.image}
                                alt={pet.petName}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-4">
                                <h2 className="font-bold text-lg">
                                    {pet.petName}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {pet.breed}
                                </p>

                                <button className="mt-3 text-sm text-purple-600 font-medium">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyListingPage;