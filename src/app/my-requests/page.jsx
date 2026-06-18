

import Image from "next/image";
import CancelButton from "../components/CancelBtn";
import { FiClock, FiMapPin, FiMessageSquare } from "react-icons/fi";

const MyRequestsPage = async () => {
    const res = await fetch("http://localhost:8000/adoption-requests", {
        cache: "no-store",
    });

    let requests = [];

    if (res.ok) {
        requests = await res.json();

        console.log(requests)
    }






    return (
        <div className=" mx-auto px-6 py-10">

            <div className="mb-8">
                <p className="text-purple-500 font-semibold uppercase tracking-widest text-sm">
                    🐾 Adoption Tracker
                </p>

                <h1 className="text-4xl font-bold text-gray-900 mt-2">
                    My Requests
                </h1>

                <p className="text-gray-500 mt-2">
                    Track the status of your adoption requests.
                </p>
            </div>



            <div className="space-y-6">
                {requests.map((request) => (
                    <div
                        key={request._id}
                        className="group border border-purple-100 rounded-3xl p-6 bg-gradient-to-br from-white via-purple-50/30 to-white shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">


                            <div className="flex items-start gap-5">

                                {/* Image */}
                                {request.image ? (
                                    <Image
                                        src={request.image}
                                        alt={request.applicationName}
                                        width={90}
                                        height={90}
                                        className="rounded-2xl object-cover w-24 h-24 ring-2 ring-purple-200 group-hover:ring-purple-400 transition"
                                    />
                                ) : (
                                    <div className="w-24 h-24 flex items-center justify-center bg-purple-50 text-purple-400 rounded-2xl text-xs">
                                        No Image
                                    </div>
                                )}


                                <div className="space-y-1">

                                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition">
                                        {request.petName}
                                    </h2>


                                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                        <FiClock className="text-purple-500" />
                                        <span>
                                            Requested:{" "}
                                            <span className="font-medium text-gray-800">
                                                {request.requestedAt}
                                            </span>
                                        </span>
                                    </div>


                                    <div className="flex items-start gap-2 text-sm text-gray-600 mt-1">
                                        <FiMapPin className="text-purple-500 mt-0.5" />
                                        <span>
                                            <span className="font-medium text-gray-800">
                                                Address:
                                            </span>{" "}
                                            {request.address}
                                        </span>
                                    </div>

                                    {/* Message */}
                                    {request.message && (
                                        <div className="flex items-start gap-2 text-sm text-gray-500 mt-1">
                                            <FiMessageSquare className="text-purple-400 mt-0.5" />
                                            <span className="italic line-clamp-2">
                                                {request.message}
                                            </span>
                                        </div>
                                    )}

                                </div>
                            </div>


                            <div className="flex items-center">
                                <CancelButton id={request._id} />
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyRequestsPage;


