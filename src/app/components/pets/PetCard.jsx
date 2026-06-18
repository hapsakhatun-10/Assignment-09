import Image from "next/image";
import Link from "next/link";

const PetCard = ({ pets }) => {


    console.log("pets:", pets);


    return (
        <div className="max-w-7xl mx-auto px-6 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pets?.map((pet) => (
                    <div
                        key={pet._id}
                        className="bg-white rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition"
                    >
                        <div className="relative">
                            {pet.image ? (
                                <Image
                                    src={pet.image}
                                    alt={pet.petName}
                                    width={600}
                                    height={400}
                                    className="w-full h-64 object-cover"
                                />
                            ) : (
                                <div className="w-full h-64 flex items-center justify-center bg-gray-100 text-gray-500 font-medium">
                                    No Image Available
                                </div>
                            )}

                        </div>

                        <div className="p-5">
                            <h3 className="font-bold text-xl">
                                {pet.petName}
                            </h3>


                            <p className="text-gray-500">
                                {pet.shelterName}

                            </p>

                            <div className="mt-4 flex items-center justify-between text-gray-600 text-sm">
                                <span>
                                    Gender: <span className="font-semibold">{pet.gender}</span>
                                </span>

                                <span>
                                    Location: <span className="font-semibold">{pet.location}</span>
                                </span>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-purple-700 font-bold text-xl">
                                    ${pet.adoptionFee}
                                </span>

                                <Link
                                    href={`/all-pets/${pet._id}`}
                                    className="bg-purple-700 text-white px-4 py-2 rounded-xl inline-block"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PetCard;