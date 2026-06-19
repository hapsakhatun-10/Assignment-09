"use client";

import { useEffect, useState } from "react";
import PetHero from "../components/PetHero";
import FilterSidebar from "../components/pets/FilterSidebar";
import PetCard from "../components/pets/PetCard";

export default function AllPetsPage() {
    const [pets, setPets] = useState([]);
    const [search, setSearch] = useState("");
    const [species, setSpecies] = useState("");

    useEffect(() => {
        fetch(
            `http://localhost:8000/pets?search=${search}&species=${species}`
        )
            .then((res) => res.json())
            .then((data) => setPets(data));
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