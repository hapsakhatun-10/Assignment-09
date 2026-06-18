"use client";

import { useRouter } from "next/navigation";
import { PawPrint } from "lucide-react";

const MyListingPage = () => {
    const router = useRouter();

    const pets = []; // later API from DB

    const isEmpty = !pets || pets.length === 0;

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
            {isEmpty && (
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
            )}
        </div>
    );
};

export default MyListingPage;

