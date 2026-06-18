import {
    PawPrint,
    Cake,
    Mars,
    Ruler,
    Palette,
    BadgeDollarSign,
    Syringe,
} from "lucide-react";

export default function PetInfoGrid({ pet }) {
    return (
        <>

            <h2 className=" w-full px-6 py-4 rounded-2xl border bg-white border-purple-500 text-purple-600 font-bold text-2xl">
                {pet.petName}
            </h2>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">

                <Info icon={<PawPrint />} label="Breed" value={pet.breed || "Not specified"} />
                <Info icon={<Cake />} label="Age" value={pet.age} />
                <Info icon={<Mars />} label="Gender" value={pet.gender} />
                <Info icon={<Ruler />} label="Size" value={pet.size} />
                <Info icon={<Palette />} label="Color" value={pet.color} />
                <Info icon={<BadgeDollarSign />} label="Fee" value={`৳ ${pet.adoptionFee}`} />
                <Info icon={<Syringe />} label="Vaccinated" value={pet.vaccinated} />

            </div>
        </>
    );
}

function Info({ icon, label, value }) {
    return (
        <div className="bg-gray-50 p-4 rounded-xl border flex gap-3 items-start">
            <div className="text-purple-600 mt-1">{icon}</div>
            <div>
                <p className="text-gray-500 text-sm">{label}</p>
                <p className="font-semibold text-gray-900">{value}</p>
            </div>
        </div>
    );
}