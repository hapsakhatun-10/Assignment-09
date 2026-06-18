import { User, Mail, Phone, MapPin } from "lucide-react";

export default function PetDetailsSection({ pet }) {
    return (
        <>
            {/* SHELTER */}
            <div className="bg-white rounded-3xl shadow-lg p-8 mt-6">

                <h2 className="text-xl font-semibold mb-6">
                    Shelter Information
                </h2>

                <div className="grid md:grid-cols-2 gap-5">

                    <Box icon={<User />} label="Name" value={pet.shelterName} />
                    <Box icon={<Mail />} label="Email" value={pet.shelterEmail} />
                    <Box icon={<Phone />} label="Phone" value={pet.shelterPhone} />
                    <Box icon={<MapPin />} label="Address" value={pet.shelterAddress} />

                </div>
            </div>

            {/* STORY */}
            <div className="bg-white rounded-3xl shadow-lg p-8 mt-6">

                <h2 className="text-2xl font-bold mb-4">
                    {pet.petName}s Story
                </h2>

                <p className="text-gray-600 whitespace-pre-line">
                    {pet.description}
                </p>

                <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                    <h3 className="font-semibold mb-2">
                        Adoption Policy
                    </h3>
                    <p className="text-gray-600 whitespace-pre-line">
                        {pet.adoptionPolicy}
                    </p>
                </div>
            </div>
        </>
    );
}

function Box({ icon, label, value }) {
    return (
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border">
            <div className="text-purple-600 mt-1">{icon}</div>
            <div>
                <p className="text-gray-500 text-sm">{label}</p>
                <p className="font-semibold">{value}</p>
            </div>
        </div>
    );
}