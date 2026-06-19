"use client";

import { Card, Button, Separator } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaPaw } from "react-icons/fa";
import toast from "react-hot-toast";

const LoginPage = () => {


    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());



        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,

        });

        if (data) {
            router.push("/");
        }
        else {
            toast.error("Login failed!");
        }
        console.log(user)


    }


    const handleGoogleSignin = async () => {
        await authClient.signIn.social({
            provider: "google"
        })

    }





    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-200 px-4">

            <Card className="w-full max-w-md p-8 rounded-3xl shadow-2xl bg-white/95 backdrop-blur-xl">

                {/* Logo */}
                <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-700 flex items-center justify-center shadow-lg">
                        <FaPaw className="text-white text-2xl" />
                    </div>

                    <h1 className="text-3xl font-bold mt-4 text-purple-700">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Login to continue your pet journey
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="space-y-4">

                    <input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        className="w-full border border-purple-200 focus:border-purple-500 px-4 py-3 rounded-xl outline-none"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full border border-purple-200 focus:border-purple-500 px-4 py-3 rounded-xl outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-xl font-semibold transition"
                    >
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <Separator className="bg-purple-200" />
                </div>

                {/* Google */}
                <Button onClick={handleGoogleSignin}
                    className="w-full" variant="tertiary">
                    <FcGoogle className="text-xl" /> Sign in with Google
                </Button>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-purple-700 font-semibold hover:underline">
                        Sign up
                    </a>
                </p>

            </Card>
        </div>
    );
};

export default LoginPage;