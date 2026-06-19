"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PetHero from "../components/PetHero";
import FilterSidebar from "../components/pets/FilterSidebar";
import PetCard from "../components/pets/PetCard";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

export default function AllPetsPage() {
    const [pets, setPets] = useState([]);
    const [search, setSearch] = useState("");
    const [species, setSpecies] = useState("");

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const res = await fetch(
                    `${SERVER_URL}/pets?search=${search}&species=${species}`
                );
                if (!res.ok) throw new Error("Failed to fetch pets");
                const data = await res.json();
                setPets(Array.isArray(data) ? data : []);
            } catch {
                toast.error("Failed to load pets");
            }
        };
        fetchPets();
    }, [search, species]);

    return (
        <>

            <PetHero />

            <div className="max-w-7xl mx-auto px-4 py-8">

                <FilterSidebar
                    search={search}
                    setSearch={setSearch}
                    species={species}
                    setSpecies={setSpecies}
                />

                <PetCard pets={pets} />

            </div>
        </>
    );
}