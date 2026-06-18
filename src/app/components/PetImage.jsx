export default function PetImage({ pet }) {
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
            <div className="h-[520px] overflow-hidden">
                <img
                    src={pet.image || "https://via.placeholder.com/800"}
                    alt={pet.petName}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
            </div>
        </div>
    );
}