"use client";

export default function FilterSidebar({
    search,
    setSearch,
    species,
    setSpecies,
}) {
    return (
        <div className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-4 items-center">

            {/* Search */}
            <input
                type="text"
                placeholder="Search pet..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full"
            />

            {/* Species Filter */}
            <select
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                className="border rounded-lg px-4 py-2 min-w-[180px]"
            >
                <option value="">All Species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
            </select>

        </div>
    );
}