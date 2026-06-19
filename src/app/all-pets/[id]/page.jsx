"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { DeleteAlert } from "@/app/components/DeleteAlert";
import { EditModal } from "@/app/components/EditModal";
import PetDetailsSection from "@/app/components/PetDetailSec";
import PetImage from "@/app/components/PetImage";
import PetInfoGrid from "@/app/components/PetInfo";
import RequestPetFrom from "@/app/components/ReqPetFrom";
import { getAuthToken } from "@/lib/api";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

export default function PetDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchPet = async () => {
            try {
                const token = await getAuthToken();
                const res = await fetch(`${SERVER_URL}/pets/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    cache: "no-store",
                });
                if (!res.ok) throw new Error("Failed to fetch pet details");
                const data = await res.json();
                if (!data) throw new Error("Pet not found");
                setPet(data);
            } catch (err) {
                toast.error(err.message);
                router.push("/error");
            } finally {
                setLoading(false);
            }
        };

        fetchPet();
    }, [id, router]);

    if (loading || !pet) return <div className="min-h-screen bg-purple-100 py-10 px-4" />;

    return (
        <div className="min-h-screen bg-purple-100 py-10 px-4">

            <div className="flex items-center gap-3 justify-center  mt-5 mb-3">
                <EditModal pet={pet} />
                <DeleteAlert pet={pet} />
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-6">
                    <div className="lg:col-span-1">
                        <PetImage pet={pet} />
                    </div>
                    <PetInfoGrid pet={pet} />
                    <PetDetailsSection pet={pet} />
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-10">
                        <RequestPetFrom pet={pet} />
                    </div>
                </div>

            </div>

        </div>
    );
}
