"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from "@heroui/react";
import { FaPaw } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { Icon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
export default function SignUpPage() {


    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        if (user.password !== user.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (user.password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image,
        });

        if (error) {
            console.log(error);
            return;
        }

        router.push("/");
    };







    const handleGoogleSignin = async () => {
        await authClient.signIn.social({
            provider: "google"
        })

    }



    return (
        <div className="min-h-screen bg-purple-200 flex items-center justify-center px-4 py-10">

            <div className="relative w-full max-w-md">

                {/* Card */}
                <div className="backdrop-blur-xl bg-white/95 border border-white/30 rounded-[32px] shadow-2xl p-8">

                    {/* Logo */}
                    <div className="text-center mb-8">

                        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-r from-purple-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <FaPaw className="text-white text-4xl" />
                        </div>

                        <h1 className="text-3xl font-bold mt-5 text-gray-900">
                            Create Account
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Join PetHome and find your perfect companion.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={onSubmit} className="space-y-5">

                        <Input
                            name="name"
                            label="Full Name"
                            placeholder="John Doe"
                            variant="bordered"
                            className="w-full"
                        />

                        <Input
                            name="image"
                            type="url"
                            label="Image URL"
                            placeholder="https://example.com/pet.jpg"
                            variant="bordered"
                            className="w-full"
                        />
                        <Input
                            name="email"
                            type="email"
                            label="Email Address"
                            placeholder="john@example.com"
                            variant="bordered"
                            className="w-full"
                        />

                        <Input
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            variant="bordered"
                            className="w-full"
                        />

                        <Input
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            placeholder="••••••••"
                            variant="bordered"
                            className="w-full"

                        />

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold bg-purple-700 text-white shadow-lg shadow-purple-500/30"
                        >
                            Create Account
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="border-t border-gray-200"></div>
                        <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 text-sm text-gray-400">
                            OR
                        </span>
                    </div>

                    {/* Google Button */}
                    <Button onClick={handleGoogleSignin}
                        className="w-full" variant="tertiary">
                        <FcGoogle className="text-xl" /> Sign in with Google
                    </Button>

                    {/* Sign In */}
                    <p className="text-center text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link
                            href="/Login"
                            className="font-semibold text-purple-700 hover:text-purple-700"
                        >
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}