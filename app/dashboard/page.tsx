"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CartIconButton from "@/components/CartIconButton";
import { useCart } from "@/app/context/CartContext";
import { products, type Product } from "@/lib/products";

const categories = ["All", "Tops", "Bottoms", "Jackets", "Dresses", "Footwear", "Accessories"];

const cbFilters: Record<string, string> = {
    none: "none",
    deuteranopia: "url(#deuter)",
    protanopia: "url(#protan)",
    tritanopia: "url(#tritan)",
    highcontrast: "none",
};

export default function Dashboard() {
    const router = useRouter();
    const [userName, setUserName] = useState("User");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [cbMode, setCbMode] = useState("none");
    const [cbPanelOpen, setCbPanelOpen] = useState(false);
    const [addedId, setAddedId] = useState<number | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }
        const name = localStorage.getItem("name");
        if (name) setUserName(name);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        router.push("/");
    };

    const handleAddToCart = (product: Product) => {
        addToCart(product);
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 1000);
    };

    const handleBuyNow = (product: Product) => {
        addToCart(product);
        router.push("/cart");
    };

    const filtered = products.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.color.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === "All" || p.category === category;
        return matchSearch && matchCategory;
    });

    const isHighContrast = cbMode === "highcontrast";

    return (
        <>
            <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                    <filter id="deuter">
                        <feColorMatrix type="matrix" values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0" />
                    </filter>
                    <filter id="protan">
                        <feColorMatrix type="matrix" values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0" />
                    </filter>
                    <filter id="tritan">
                        <feColorMatrix type="matrix" values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0" />
                    </filter>
                </defs>
            </svg>

            <div
                style={{ filter: cbFilters[cbMode] }}
                className={`min-h-screen ${isHighContrast ? "bg-black text-white" : "bg-[#0b0b0b] text-white"}`}
            >
                {/* NAVBAR */}
                <nav className={`flex items-center justify-between px-8 py-4 border-b sticky top-0 z-50 ${isHighContrast ? "bg-black border-yellow-400" : "bg-[#0f0f0f] border-white/10"}`}>
                    <h1 className={`text-xl font-bold tracking-widest ${isHighContrast ? "text-yellow-400" : "text-white"}`}>
                        URBAN THREAD
                    </h1>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`px-4 py-2 rounded-lg text-sm outline-none w-48 ${isHighContrast
                                ? "bg-black border-2 border-yellow-400 text-yellow-400 placeholder-yellow-600"
                                : "bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:border-white"
                                }`}
                        />
                        <div className="relative">
                            <button
                                onClick={() => setCbPanelOpen(!cbPanelOpen)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition ${isHighContrast
                                    ? "border-yellow-400 text-yellow-400 bg-black"
                                    : "border-white/20 text-gray-300 hover:border-white hover:text-white"
                                    }`}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
                                </svg>
                                Accessibility
                            </button>
                            {cbPanelOpen && (
                                <div className={`absolute right-0 top-11 w-64 rounded-xl border p-4 z-50 shadow-xl ${isHighContrast ? "bg-black border-yellow-400" : "bg-[#1a1a1a] border-white/20"}`}>
                                    <p className={`text-xs mb-3 font-medium uppercase tracking-wider ${isHighContrast ? "text-yellow-400" : "text-gray-400"}`}>
                                        Colorblind mode
                                    </p>
                                    {["none", "deuteranopia", "protanopia", "tritanopia", "highcontrast"].map((mode) => (
                                        <button
                                            key={mode}
                                            onClick={() => { setCbMode(mode); setCbPanelOpen(false); }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition ${cbMode === mode
                                                ? isHighContrast ? "bg-yellow-400 text-black font-medium" : "bg-white text-black font-medium"
                                                : isHighContrast ? "text-yellow-400 hover:bg-yellow-400/20" : "text-gray-300 hover:bg-white/10"
                                                }`}
                                        >
                                            {mode === "none" && "Default"}
                                            {mode === "deuteranopia" && "Deuteranopia (red-green)"}
                                            {mode === "protanopia" && "Protanopia (red-blind)"}
                                            {mode === "tritanopia" && "Tritanopia (blue-yellow)"}
                                            {mode === "highcontrast" && "High contrast"}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <CartIconButton isHighContrast={isHighContrast} />
                        <span className={`text-sm hidden md:block ${isHighContrast ? "text-yellow-400" : "text-gray-400"}`}>
                            Hi, {userName}
                        </span>
                        <button
                            onClick={handleLogout}
                            className={`text-sm px-4 py-2 rounded-lg border transition ${isHighContrast
                                ? "border-yellow-400 text-black bg-yellow-400 hover:bg-yellow-300"
                                : "border-white/20 text-white hover:bg-white hover:text-black"
                                }`}
                        >
                            Logout
                        </button>
                    </div>
                </nav>

                {/* CATEGORY FILTER */}
                <div className={`flex flex-wrap gap-3 px-8 py-4 border-b ${isHighContrast ? "border-yellow-400" : "border-white/10"}`}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${category === cat
                                ? isHighContrast ? "bg-yellow-400 text-black border-yellow-400" : "bg-white text-black border-white"
                                : isHighContrast ? "border-yellow-400 text-yellow-400 hover:bg-yellow-400/20" : "border-white/20 text-gray-400 hover:border-white hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                    <span className={`ml-auto text-sm self-center ${isHighContrast ? "text-yellow-400" : "text-gray-500"}`}>
                        {filtered.length} products
                    </span>
                </div>

                {/* PRODUCT GRID */}
                <main className="px-8 py-8">
                    {filtered.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            No products found for "{search}"
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filtered.map((p) => (
                                <div
                                    key={p.id}
                                    className={`rounded-2xl overflow-hidden border transition hover:scale-[1.02] cursor-pointer ${isHighContrast
                                        ? "bg-black border-yellow-400"
                                        : "bg-[#111] border-white/10 hover:border-white/30"
                                        }`}
                                >
                                    <div className="relative">
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="w-full h-56 object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = `https://placehold.co/400x300/1a1a1a/555555?text=${encodeURIComponent(p.name)}`;
                                            }}
                                        />
                                        <span className={`absolute bottom-2 left-2 text-xs px-2 py-1 rounded-full font-medium ${isHighContrast ? "bg-yellow-400 text-black" : "bg-black/70 text-white"}`}>
                                            {p.color}
                                        </span>
                                        <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${isHighContrast ? "bg-yellow-400 text-black font-bold" : "bg-white/90 text-black"}`}>
                                            {p.pattern}
                                        </span>
                                    </div>
                                    <div className="p-4">
                                        <p className={`font-medium text-sm mb-1 ${isHighContrast ? "text-yellow-400" : "text-white"}`}>
                                            {p.name}
                                        </p>
                                        <p className={`text-xs mb-1 ${isHighContrast ? "text-yellow-600" : "text-gray-500"}`}>
                                            {p.category}
                                        </p>
                                        <p className={`font-semibold mb-3 ${isHighContrast ? "text-white" : "text-white"}`}>
                                            ₹{p.price.toLocaleString()}
                                        </p>
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => handleAddToCart(p)}
                                                className={`w-full py-2 rounded-lg text-sm font-semibold transition ${addedId === p.id
                                                    ? "bg-green-500 text-white"
                                                    : isHighContrast
                                                        ? "bg-yellow-400 text-black hover:bg-yellow-300"
                                                        : "bg-white text-black hover:opacity-90"
                                                    }`}
                                            >
                                                {addedId === p.id ? "Added ✓" : "Add to Cart"}
                                            </button>

                                            {/* BUY NOW */}
                                            <button
                                                onClick={() => handleBuyNow(p)}
                                                className={`w-full py-2 rounded-lg text-sm font-semibold transition ${isHighContrast
                                                    ? "bg-yellow-400 text-black hover:bg-yellow-300"
                                                    : "bg-white text-black hover:opacity-90"
                                                    }`}
                                            >
                                                Buy Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
