import PetDetailsSection from "@/app/components/PetDetailSec";
import PetImage from "@/app/components/PetImage";
import PetInfoGrid from "@/app/components/PetInfo";
import RequestPetFrom from "@/app/components/ReqPetFrom";

const PetDetailsPage = async ({ params }) => {
    const { id } = await params; // ✅ IMPORTANT FIX

    const res = await fetch(`http://localhost:8000/pets/${id}`, {
        cache: "no-store",
    });

    const pet = await res.json();

    return (
        <div className="min-h-screen bg-purple-100 py-10 px-4">

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: Info Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="lg:col-span-1">
                        <PetImage pet={pet} />
                    </div>
                    <PetInfoGrid pet={pet} />
                    <PetDetailsSection pet={pet} />
                </div>

                {/* RIGHT: Form Section */}
                <div className="lg:col-span-1">
                    <div className="sticky top-10">
                        <RequestPetFrom pet={pet} />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default PetDetailsPage;