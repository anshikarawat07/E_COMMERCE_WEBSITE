"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">

            <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

                {/* LOGO */}
                <Link href="/">
                    <h1 className="text-xl tracking-[0.3em] font-semibold cursor-pointer">
                        URBAN THREAD
                    </h1>
                </Link>

                {/* CENTER LINKS */}
                <div className="hidden md:flex gap-10 text-sm text-gray-300">
                    <Link href="/" className="hover:text-white transition">Home</Link>
                    <Link href="#" className="hover:text-white transition">Shop</Link>
                    <Link href="#" className="hover:text-white transition">New</Link>
                    <Link href="#" className="hover:text-white transition">Contact</Link>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">

                    {/* LOGIN BUTTON */}
                    <Link href="/login">
                        <button className="border border-white/40 px-5 py-2 rounded-full text-sm 
            hover:bg-white hover:text-black transition">
                            Login
                        </button>
                    </Link>

                    {/* SIGNUP BUTTON */}
                    <Link href="/signup">
                        <button className="bg-white text-black px-5 py-2 rounded-full text-sm 
            font-semibold hover:scale-105 transition">
                            Signup
                        </button>
                    </Link>

                </div>

            </div>
        </nav>
    );
}
