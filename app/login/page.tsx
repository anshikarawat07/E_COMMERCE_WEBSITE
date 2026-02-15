"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const handleLogin = async () => {

        if (!email || !password) {
            setMsg("Enter email & password");
            return;
        }

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.error) {
                setMsg(data.error);
            } else {
                setMsg("Login successful");

                localStorage.setItem("token", data.token);

                setTimeout(() => {
                    router.push("/");
                }, 800);
            }

        } catch (err) {
            setMsg("Server error. Try again.");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-[#0b0b0b] text-white px-6 overflow-hidden">

            <div className="max-w-5xl w-full h-[620px] grid md:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">

                {/* LEFT IMAGE */}
                <div className="hidden md:block relative">
                    <img
                        src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-10">
                        <h1 className="text-3xl font-semibold tracking-widest">
                            URBAN THREAD
                        </h1>
                        <p className="text-gray-300 text-sm mt-2">
                            Premium fashion for modern generation
                        </p>
                    </div>
                </div>

                {/* RIGHT FORM */}
                <div className="bg-[#111] p-10 flex flex-col justify-center">

                    <h2 className="text-3xl font-semibold mb-2">
                        Welcome Back
                    </h2>

                    <p className="text-gray-400 text-sm mb-8">
                        Login to continue your fashion journey
                    </p>

                    {/* email */}
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-4 px-4 py-3 bg-transparent border border-white/20 rounded-lg outline-none focus:border-white"
                    />

                    {/* password */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-6 px-4 py-3 bg-transparent border border-white/20 rounded-lg outline-none focus:border-white"
                    />

                    {/* button */}
                    <button
                        onClick={handleLogin}
                        className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:scale-[1.02] transition"
                    >
                        Login
                    </button>

                    {/* msg */}
                    {msg && (
                        <p className="text-sm text-center mt-4 text-gray-300">
                            {msg}
                        </p>
                    )}

                    {/* signup link */}
                    <p className="text-gray-400 text-sm text-center mt-8">
                        Don’t have account?
                        <span
                            onClick={() => router.push("/signup")}
                            className="ml-2 text-white underline cursor-pointer"
                        >
                            Create account
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
}
