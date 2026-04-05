"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useTheme } from "@/app/context/ThemeContext";
import { products } from "@/app/lib/products";

export default function Dashboard() {
    const router = useRouter();
    const { addToCart } = useCart();
    const { theme } = useTheme();

    const [userName, setUserName] = useState("User");
    const [search, setSearch] = useState("");

    const isHC = theme === "highcontrast";

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) router.push("/login");

        const name = localStorage.getItem("name");
        if (name) setUserName(name);
    }, [router]);

    return (
        <div className={`min-h-screen pt-24 px-8 ${
            isHC ? "bg-black text-white" : "bg-[#0b0b0b] text-white"
        }`}>

            <h1 className="text-2xl mb-4">Welcome, {userName}</h1>

            <input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-6 px-4 py-2 rounded bg-black border"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products
                    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
                    .map(p => (
                        <div key={p.id} className="bg-[#111] p-4 rounded-xl">

                            <img src={p.image} className="h-40 w-full object-cover mb-3" />

                            <p>{p.name}</p>
                            <p>₹{p.price}</p>

                            <button
                                onClick={() => addToCart(p)}
                                className="mt-2 w-full bg-white text-black py-2 rounded"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}