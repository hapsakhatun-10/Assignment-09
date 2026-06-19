"use client";

import { useRouter } from "next/navigation";
import { PawPrint } from "lucide-react";
import { useEffect, useState } from "react";

import { authClient } from "@/lib/auth-client";
import { getAuthToken } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

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

                const token = await getAuthToken();
                const res = await fetch(
                    `${SERVER_URL}/my-listings/${userEmail}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {pets.map((pet) => (
                        <div
                            key={pet._id}
                            className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            <div className="overflow-hidden rounded-xl">
                                <Image
                                    src={pet.image}
                                    alt={pet.petName}
                                    width={500}
                                    height={300}
                                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="font-bold text-lg">
                                    {pet.petName}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {pet.breed}
                                </p>

                                <Link
                                    href={`/all-pets/${pet._id}`}
                                    className="mt-3 inline-block text-sm text-purple-600 font-medium hover:underline"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyListingPage;