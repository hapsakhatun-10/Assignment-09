import Image from "next/image";

export default function Banner() {
    return (
        <section className="relative h-[300px] md:h-[400px]">
            {/* Background Image */}
            <Image
                src="/bannerimgage.jpg"
                alt="Pet Banner"
                fill
                priority
                className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4">

                {/* Heading */}
                <h1 className="mt-12 md:mt-16 text-3xl sm:text-5xl md:text-6xl font-bold text-white text-center">
                    Find Your New Best Friend
                </h1>

                <p className="mt-3 md:mt-4 text-base sm:text-xl text-white text-center max-w-3xl">
                    Browse thousands of pets waiting for a loving home.
                </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-purple-700"></div>

        </section>
    );
}