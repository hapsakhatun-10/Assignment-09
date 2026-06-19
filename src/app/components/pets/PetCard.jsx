import Image from "next/image";
import Link from "next/link";

const PetCard = ({ pets }) => {
    return (
        <div className="  px-6 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {pets?.map((pet) => (
                    <div
                        key={pet._id}
                        className="group bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-md hover:shadow-2xl hover:border-purple-300 transition-all duration-300"
                    >
                        {/* Image */}
                        <div className="relative overflow-hidden">
                            {pet.image ? (
                                <Image
                                    src={pet.image?.trim() ? pet.image : "/placeholder.png"}
                                    alt={pet.petName || "Pet"}
                                    width={600}
                                    height={300}
                                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-44 flex items-center justify-center bg-purple-50 text-purple-700 font-medium">
                                    No Image Available
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-2xl text-gray-900">
                                        {pet.petName}
                                    </h3>

                                    <p className="text-purple-700 font-medium mt-1">
                                        {pet.shelterName}
                                    </p>
                                </div>

                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                                    {pet.gender}
                                </span>
                            </div>

                            <div className="mt-4 flex items-center justify-between text-gray-600">
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-gray-400">
                                        Location
                                    </p>
                                    <p className="font-medium">{pet.location}</p>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs uppercase tracking-wide text-gray-400">
                                        Adoption Fee
                                    </p>
                                    <p className="text-2xl font-bold text-purple-700">
                                        ${pet.adoptionFee}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <Link
                                    href={`/all-pets/${pet._id}`}
                                    className="w-full block text-center bg-purple-600 hover:bg-purple-800 text-white font-semibold py-3 rounded-xl transition-all duration-300"
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