

import PetHero from "../components/PetHero";
import FilterSidebar from "../components/pets/FilterSidebar";
import PetCard from "../components/pets/PetCard";


const AllPetsPage = async () => {
    const res = await fetch('http://localhost:8000/pets')


    const pets = await res.json();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <PetHero />

            {/* Search & Filters */}
            <FilterSidebar />

            <PetCard pets={pets} />





        </div>
    );
}



export default AllPetsPage;