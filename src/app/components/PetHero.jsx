import React from 'react';

const PetHero = () => {
    return (

        <section className="relative overflow-hidden bg-purple-50 h-68">
            <div className="max-w-7xl mx-auto px-6 py-8">

                <div className="mb-5">
                    <h1 className="text-3xl font-bold text-purple-800">
                        Find Your Perfect Pet Companion
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Explore loving pets waiting for a new home and give them a better life.
                    </p>
                </div>



                <div className="flex gap-4">
                    {/* Pets Count */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                            🐾
                        </div>

                        <div>
                            <h3 className="font-bold text-lg">13+ Pets</h3>
                            <p className="text-gray-500 text-sm">Available now</p>
                        </div>
                    </div>





                    {/* Species Count */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                            🐾
                        </div>

                        <div>
                            <h3 className="font-bold text-lg">5 Species</h3>
                            <p className="text-gray-500 text-sm">Dog, Cat & More</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Circles */}
            <div className="absolute -right-10 -top-10 w-72 h-72 rounded-full bg-purple-200 opacity-40"></div>
            <div className="absolute right-52 -top-5 w-52 h-52 rounded-full bg-purple-100 opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-purple-700"></div>



        </section>
    );
};

export default PetHero;