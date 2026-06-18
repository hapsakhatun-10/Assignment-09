"use client";


import { Button, Input, TextArea } from "@heroui/react";

import React from "react";

const AddPetPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const pet = Object.fromEntries(formData.entries());

        const res = await fetch("http://localhost:8000/pets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pet),
        });

        const data = await res.json();

        if (res.ok) {
            window.location.href = "/all-pets";
        }
        console.log(data);
    };



    return (
        <div className="min-h-screen bg-purple-700 py-8 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-6 md:p-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Add New Pet
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Fill in the details below to list a pet for adoption.
                    </p>
                </div>

                <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Pet Name */}
                    <Input
                        label="Pet Name"
                        name="petName"
                        placeholder="Enter pet name"
                        variant="bordered"
                    />

                    {/* Breed */}
                    <Input
                        label="Breed"
                        name="breed"
                        placeholder="Mixed Breed"
                        variant="bordered"
                    />

                    {/* Age */}
                    <Input
                        label="Age"
                        name="age"
                        placeholder="Puppy, Adult, Senior"
                        variant="bordered"
                    />

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Gender
                        </label>
                        <select
                            name="gender"
                            className="w-full h-14 px-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    {/* Size */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Size
                        </label>
                        <select
                            name="size"
                            className="w-full h-14 px-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select Size</option>
                            <option value="Small">Small (0-25 lbs)</option>
                            <option value="Medium">Medium (26-50 lbs)</option>
                            <option value="Large">Large (50+ lbs)</option>
                        </select>
                    </div>

                    {/* Color */}
                    <Input
                        label="Color"
                        name="color"
                        placeholder="Brown / Chocolate"
                        variant="bordered"
                    />

                    {/* Location */}
                    <Input
                        label="Location"
                        name="location"
                        placeholder="Corbin, KY"
                        variant="bordered"
                    />

                    {/* Image URL */}
                    <Input
                        label="Image URL"
                        name="image"
                        placeholder="https://example.com/pet.jpg"
                        variant="bordered"
                    />

                    {/* Vaccinated */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Vaccinated
                        </label>
                        <select
                            name="vaccinated"
                            className="w-full h-14 px-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select Status</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    {/* Adoption Fee */}
                    <Input
                        label="Adoption Fee"
                        name="adoptionFee"
                        placeholder="$120"
                        variant="bordered"
                    />

                    {/* Pet Story */}
                    <div className="md:col-span-2">
                        <TextArea
                            label="Pet Story"
                            name="description"
                            placeholder="Tell us about this pet..."
                            variant="bordered"

                        />
                    </div>

                    {/* Shelter Section */}
                    <div className="md:col-span-2 mt-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Shelter Information
                        </h2>
                    </div>

                    {/* Shelter Name */}
                    <Input
                        label="Shelter Name"
                        name="shelterName"
                        placeholder="Knox-Whitley Animal Shelter"
                        variant="bordered"
                    />

                    {/*  Email */}
                    <Input
                        type="email"
                        label="Shelter Email"
                        name="shelterEmail"
                        placeholder="example@gmail.com"
                        variant="bordered"
                    />

                    {/* Shelter Phone */}
                    <Input
                        label="Shelter Phone"
                        name="shelterPhone"
                        placeholder="+1 123456789"
                        variant="bordered"
                    />

                    {/* Shelter Address */}
                    <Input
                        label="Shelter Address"
                        name="shelterAddress"
                        placeholder="66 Busy Lane, Corbin, KY"
                        variant="bordered"
                    />

                    <div className="md:col-span-2">
                        <TextArea
                            label="Adoption Policy"
                            name="adoptionPolicy"
                            placeholder="Write shelter adoption policy..."
                            variant="bordered"

                        />
                    </div>

                    <div className="md:col-span-2">
                        <Button
                            type="submit"
                            className="w-full bg-purple-700 text-white font-semibold h-12"
                        >
                            Add Pet
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddPetPage;