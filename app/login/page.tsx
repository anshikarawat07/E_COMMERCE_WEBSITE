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
            {/* SVG Colorblind Filters */}
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
                className={`h-screen flex flex-col items-center justify-center px-6 overflow-hidden relative ${isHighContrast ? "bg-black text-white" : "bg-[#0b0b0b] text-white"}`}
            >
                {/* BACK HOME BUTTON — top left */}
                <button
                    onClick={() => router.push("/")}
                    className={`absolute top-5 left-6 z-50 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition ${
                        isHighContrast
                            ? "border-yellow-400 text-yellow-400 bg-black hover:bg-yellow-400/20"
                            : "border-white/20 text-gray-300 hover:border-white hover:text-white bg-[#111]"
                    }`}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                    Back to Home
                </button>

                {/* ACCESSIBILITY BUTTON */}
                <div className="absolute top-5 right-6 z-50">
                    <button
                        onClick={() => setCbPanelOpen(!cbPanelOpen)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition ${
                            isHighContrast
                                ? "border-yellow-400 text-yellow-400 bg-black"
                                : "border-white/20 text-gray-300 hover:border-white hover:text-white bg-[#111]"
                        }`}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 8v4m0 4h.01" />
                        </svg>
                        Accessibility
                    </button>

                    {cbPanelOpen && (
                        <div
                            className={`absolute right-0 top-11 w-64 rounded-xl border p-4 z-50 shadow-xl ${
                                isHighContrast ? "bg-black border-yellow-400" : "bg-[#1a1a1a] border-white/20"
                            }`}
                        >
                            <p className={`text-xs mb-3 font-medium uppercase tracking-wider ${isHighContrast ? "text-yellow-400" : "text-gray-400"}`}>
                                Colorblind mode
                            </p>
                            {["none", "deuteranopia", "protanopia", "tritanopia", "highcontrast"].map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => { setCbMode(mode); setCbPanelOpen(false); }}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition ${
                                        cbMode === mode
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

                {/* LOGIN CARD */}
                <div
                    className={`max-w-5xl w-full h-[620px] grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border ${
                        isHighContrast ? "border-yellow-400" : "border-white/10"
                    }`}
                >
                    {/* LEFT IMAGE */}
                    <div className="hidden md:block relative">
                        <img
                            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800"
                            className="h-full w-full object-cover"
                            alt="Fashion model"
                        />
                        <div className={`absolute inset-0 flex flex-col justify-end p-10 ${isHighContrast ? "bg-black/70" : "bg-black/40"}`}>
                            <h1 className={`text-3xl font-semibold tracking-widest ${isHighContrast ? "text-yellow-400" : "text-white"}`}>
                                URBAN THREAD
                            </h1>
                            <p className={`text-sm mt-2 ${isHighContrast ? "text-yellow-200" : "text-gray-300"}`}>
                                Premium fashion for modern generation
                            </p>
                        </div>
                    </div>

                    {/* RIGHT FORM */}
                    <div className={`p-10 flex flex-col justify-center ${isHighContrast ? "bg-black" : "bg-[#111]"}`}>
                        <h2 className={`text-3xl font-semibold mb-2 ${isHighContrast ? "text-yellow-400" : "text-white"}`}>
                            Welcome Back
                        </h2>
                        <p className={`text-sm mb-8 ${isHighContrast ? "text-yellow-200" : "text-gray-400"}`}>
                            Login to continue your fashion journey
                        </p>

                        {/* Email */}
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full mb-4 px-4 py-3 rounded-lg outline-none transition ${
                                isHighContrast
                                    ? "bg-black border-2 border-yellow-400 text-yellow-400 placeholder-yellow-700"
                                    : "bg-transparent border border-white/20 text-white placeholder-gray-500 focus:border-white"
                            }`}
                        />

                        {/* Password */}
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full mb-6 px-4 py-3 rounded-lg outline-none transition ${
                                isHighContrast
                                    ? "bg-black border-2 border-yellow-400 text-yellow-400 placeholder-yellow-700"
                                    : "bg-transparent border border-white/20 text-white placeholder-gray-500 focus:border-white"
                            }`}
                        />

                        {/* Button */}
                        <button
                            onClick={handleLogin}
                            className={`w-full py-3 rounded-lg font-semibold hover:scale-[1.02] transition ${
                                isHighContrast
                                    ? "bg-yellow-400 text-black hover:bg-yellow-300 border-2 border-yellow-400"
                                    : "bg-white text-black hover:opacity-90"
                            }`}
                        >
                            Login
                        </button>

                        {/* Message */}
                        {msg && (
                            <p className={`text-sm text-center mt-4 ${
                                isHighContrast
                                    ? msg === "Login successful" ? "text-yellow-400" : "text-red-400"
                                    : "text-gray-300"
                            }`}>
                                {msg}
                            </p>
                        )}

                        {/* Signup link */}
                        <p className={`text-sm text-center mt-8 ${isHighContrast ? "text-yellow-200" : "text-gray-400"}`}>
                            Don't have account?
                            <span
                                onClick={() => router.push("/signup")}
                                className={`ml-2 underline cursor-pointer ${isHighContrast ? "text-yellow-400" : "text-white"}`}
                            >
                                Create account
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
