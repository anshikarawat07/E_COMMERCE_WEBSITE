"use client";

import Link from "next/link";
import CartIconButton from "./CartIconButton";
import { useTheme } from "@/app/context/ThemeContext";

export default function Navbar() {
    const { theme } = useTheme();
    const isHC = theme === "highcontrast";

    return (
        <nav className={`w-full fixed top-0 left-0 z-50 backdrop-blur-md border-b ${
            isHC ? "bg-black border-yellow-400" : "bg-black/30 border-white/10"
        }`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

                <Link href="/">
                    <h1 className="text-xl tracking-[0.3em] font-semibold text-white">
                        URBAN THREAD
                    </h1>
                </Link>

                <div className="hidden md:flex gap-10 text-sm text-gray-300">
                    <Link href="/">Home</Link>
                    <Link href="/shop">Shop</Link>
                    <Link href="/new">New</Link>
                    <Link href="/#contact">Contact</Link>
                </div>

                <div className="flex items-center gap-4">
                    <CartIconButton isHighContrast={isHC} />

                    <Link href="/login">
                        <button className="border px-5 py-2 rounded-full text-sm">
                            Login
                        </button>
                    </Link>

                    <Link href="/signup">
                        <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold">
                            Signup
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}