"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const cbFilters: Record<string, string> = {
    none: "none",
    deuteranopia: "url(#deuter)",
    protanopia: "url(#protan)",
    tritanopia: "url(#tritan)",
    highcontrast: "none",
};

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [cbMode, setCbMode] = useState("none");
    const [cbPanelOpen, setCbPanelOpen] = useState(false);

    const isHighContrast = cbMode === "highcontrast";

    const handleLogin = async () => {
        if (!email || !password) {
            setMsg("Enter email & password");
            return;
        }

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.error) {
                setMsg(data.error);
            } else {
                setMsg("Login successful");

                localStorage.setItem("token", data.token);
                if (data.name) localStorage.setItem("name", data.name);

                setTimeout(() => router.push("/dashboard"), 800);
            }
        } catch (err) {
            setMsg("Server error. Try again.");
        }
    };

    return (
        <>
            {/* SVG FILTERS */}
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
                className={`h-screen flex flex-col items-center justify-center px-6 relative ${
                    isHighContrast ? "bg-black text-white" : "bg-[#0b0b0b] text-white"
                }`}
            >
                {/* BACK BUTTON */}
                <button
                    onClick={() => router.push("/")}
                    className="absolute top-5 left-6 px-3 py-2 rounded-lg text-xs border text-gray-300 bg-[#111]"
                >
                    ← Back
                </button>

                {/* ACCESSIBILITY BUTTON */}
                <div className="absolute top-5 right-6">
                    <button
                        onClick={() => setCbPanelOpen(!cbPanelOpen)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border shadow-md transition-all ${
                            cbPanelOpen
                                ? "bg-yellow-400 text-black border-yellow-400 scale-105"
                                : "bg-yellow-500 text-black border-yellow-500 hover:scale-105"
                        }`}
                    >
                        Accessibility
                    </button>

                    {cbPanelOpen && (
                        <div className="absolute right-0 top-12 w-64 rounded-2xl border p-4 shadow-2xl bg-[#1a1a1a]">
                            <p className="text-xs mb-3 text-gray-400">Color Mode</p>

                            {["none", "deuteranopia", "protanopia", "tritanopia", "highcontrast"].map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => {
                                        setCbMode(mode);
                                        setCbPanelOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 ${
                                        cbMode === mode
                                            ? "bg-yellow-400 text-black font-semibold"
                                            : "text-gray-300 hover:bg-white/10"
                                    }`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* LOGIN CARD */}
                <div className="max-w-md w-full p-8 bg-[#111] rounded-2xl shadow-xl">
                    <h2 className="text-2xl mb-4">Login</h2>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-3 p-3 rounded bg-black text-white border border-gray-700"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-4 p-3 rounded bg-black text-white border border-gray-700"
                    />

                    <button
                        onClick={handleLogin}
                        className="w-full py-3 bg-white text-black rounded-lg"
                    >
                        Login
                    </button>

                    {msg && <p className="mt-3 text-sm">{msg}</p>}
                </div>
            </div>
        </>
    );
}