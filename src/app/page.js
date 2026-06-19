"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import Banner from "./components/Banner";
import { authClient } from "@/lib/auth-client";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

export default function Home() {
  const [pets, setPets] = useState([]);
  const scrollRef = useRef(null);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/pets`);
        if (!res.ok) throw new Error("Failed to fetch pets");
        const data = await res.json();
        if (Array.isArray(data)) {
          setPets(data.slice(0, 6));
        }
      } catch {
        toast.error("Failed to load featured pets");
      }
    };
    fetchPets();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <Banner />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Featured Pets</h2>
          <p className="text-gray-500 mt-2">
            Meet some of our lovely pets looking for a forever home.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="group bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-md hover:shadow-2xl hover:border-purple-300 transition-all duration-300 min-w-[280px] flex-shrink-0 snap-start"
              >
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
                      href={user ? `/all-pets/${pet._id}` : "/signup"}
                      className="w-full block text-center bg-purple-600 hover:bg-purple-800 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Why Adopt Pets */}
      <section className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Adopt Pets?</h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              Adopting a pet saves a life and brings unconditional love into your home.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Save a Life",
                text: "Every adoption gives a homeless pet a second chance at a happy, healthy life.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Find a Companion",
                text: "Pets reduce stress, improve mental health, and fill your home with joy.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Affordable Love",
                text: "Adoption fees are much lower than buying from breeders and often include vet care.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-md border border-purple-100 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
            <p className="text-gray-500 mt-2">Heartwarming tales of pets finding their forever homes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Bella & The Johnson Family",
                story: "Bella was rescued from a shelter and adopted by the Johnsons. She now enjoys daily walks in the park and has become best friends with their youngest daughter.",
                tag: "Adopted 2024",
              },
              {
                name: "Max's New Beginning",
                story: "After spending six months at the shelter, Max found his forever home with a retired couple. He now spends his days napping on the porch and going on road trips.",
                tag: "Adopted 2023",
              },
              {
                name: "Luna Heals a Heart",
                story: "Luna helped her new owner through a difficult time. Their bond is unbreakable, proving that sometimes the pet chooses you when you need them most.",
                tag: "Adopted 2024",
              },
            ].map((story) => (
              <div key={story.name} className="bg-purple-50 rounded-2xl p-8 border border-purple-100 relative">
                <span className="text-6xl text-purple-300 absolute top-4 left-6 leading-none">&ldquo;</span>
                <p className="text-gray-600 leading-relaxed mt-6 mb-6 italic">{story.story}</p>
                <div className="border-t border-purple-200 pt-4">
                  <p className="font-bold text-gray-900">{story.name}</p>
                  <p className="text-sm text-purple-700 font-medium">{story.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pet Care Tips */}
      <section className="bg-gradient-to-r from-purple-700 to-fuchsia-700 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Pet Care Tips</h2>
            <p className="text-purple-200 mt-2">Expert advice to keep your furry friends happy and healthy.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Nutrition Matters",
                text: "Feed your pet a balanced diet with high-quality food appropriate for their age, size, and activity level.",
              },
              {
                title: "Regular Exercise",
                text: "Daily walks and playtime keep your pet physically fit and mentally stimulated.",
              },
              {
                title: "Vet Checkups",
                text: "Annual veterinary visits help catch health issues early and keep vaccinations up to date.",
              },
              {
                title: "Love & Patience",
                text: "Pets thrive on affection and routine. Spend quality time together every single day.",
              },
            ].map((tip) => (
              <div key={tip.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">{tip.title}</h3>
                <p className="text-purple-200 text-sm leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-500 mt-2">Finding your perfect companion is easy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Browse Pets", text: "Explore our list of adorable pets waiting for a home." },
              { step: "02", title: "Meet Them", text: "Schedule a visit to connect with your potential new friend." },
              { step: "03", title: "Apply to Adopt", text: "Submit your adoption application online." },
              { step: "04", title: "Bring Them Home", text: "Welcome your new family member into your home." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Get Involved</h2>
            <p className="text-gray-500 mt-2">There are many ways to make a difference beyond adoption.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                ),
                title: "Volunteer",
                text: "Donate your time at local shelters — walk dogs, socialize cats, and help with events.",
                action: "Find Opportunities",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Donate",
                text: "Your contributions help provide food, medical care, and shelter for pets in need.",
                action: "Donate Now",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                title: "Foster",
                text: "Open your home temporarily to pets awaiting adoption and give them love and care.",
                action: "Learn About Fostering",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-md border border-purple-100 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-5">{item.text}</p>
                <button className="text-purple-700 font-semibold hover:text-purple-900 transition-colors">
                  {item.action} &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
