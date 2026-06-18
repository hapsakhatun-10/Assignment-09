const FilterSidebar = () => {


    return (
        <section className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-wrap items-center gap-4">
                <input
                    type="text"
                    placeholder="Search pets by name..."

                    className="flex-1 min-w-54 h-14 border border-gray-300 rounded-2xl px-5 outline-none focus:ring-2 focus:ring-purple-700"
                />

                <button className="bg-purple-700 text-white px-5 py-2 rounded-xl hover:bg-purple-800">
                    Search
                </button>
            </div>

        </section>
    );
};

export default FilterSidebar;