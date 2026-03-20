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

export default function Signup() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [errors, setErrors] = useState<any>({});
    const [msg, setMsg] = useState("");

    const [cbMode, setCbMode] = useState("none");
    const [cbPanelOpen, setCbPanelOpen] = useState(false);

    const isHighContrast = cbMode === "highcontrast";

    const validate = () => {
        let newErrors: any = {};

        if (!name) newErrors.name = "Enter username";

        if (!email) newErrors.email = "Enter email";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            newErrors.email = "Invalid email format";

        if (!password) newErrors.password = "Enter password";
        else if (password.length < 6)
            newErrors.password = "Min 6 characters";
        else if (!/^(?=.*[A-Za-z])(?=.*\d)/.test(password))
            newErrors.password = "Must contain letter + number";

        if (confirm !== password)
            newErrors.confirm = "Passwords not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async () => {

        const isValid = validate();

        if (!isValid) {
            setMsg("Fill above details correctly");
            return;
        }

        setMsg("Creating account...");

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (data.error) {
                setMsg(data.error);
            } else {
                setMsg("Account created successfully");

                setTimeout(() => {
                    // Persist the entered name so the dashboard greeting uses it.
                    localStorage.setItem("name", name);
                    router.push("/login");
                }, 800);
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
                className={`h-screen flex items-center justify-center px-6 overflow-hidden relative ${isHighContrast ? "bg-black text-white" : "bg-[#0b0b0b] text-white"}`}
            >

                {/* BACK HOME BUTTON */}
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
                        Accessibility
                    </button>

                    {cbPanelOpen && (
                        <div className={`absolute right-0 top-11 w-64 rounded-xl border p-4 shadow-xl ${
                            isHighContrast ? "bg-black border-yellow-400" : "bg-[#1a1a1a] border-white/20"
                        }`}>
                            <p className={`text-xs mb-3 font-medium uppercase tracking-wider ${
                                isHighContrast ? "text-yellow-400" : "text-gray-400"
                            }`}>
                                Colorblind mode
                            </p>

                            {["none", "deuteranopia", "protanopia", "tritanopia", "highcontrast"].map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => {
                                        setCbMode(mode);
                                        setCbPanelOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition ${
                                        cbMode === mode
                                            ? isHighContrast
                                                ? "bg-yellow-400 text-black font-medium"
                                                : "bg-white text-black font-medium"
                                            : isHighContrast
                                                ? "text-yellow-400 hover:bg-yellow-400/20"
                                                : "text-gray-300 hover:bg-white/10"
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

                {/* CARD */}
                <div className={`max-w-5xl w-full h-[620px] grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border ${
                    isHighContrast ? "border-yellow-400" : "border-white/10"
                }`}>

                    {/* LEFT IMAGE */}
                    <div className="hidden md:block relative">
                        <img
                            src="https://www.bringitonline.in/uploads/2/2/4/5/22456530/good-vibes-only-creative-photography-12_orig.jpg"
                            className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-10">
                            <h1 className={`text-3xl font-semibold tracking-widest ${
                                isHighContrast ? "text-yellow-400" : "text-white"
                            }`}>
                                URBAN THREAD
                            </h1>
                        </div>
                    </div>

                    {/* RIGHT FORM */}
                    <div className={`p-10 flex flex-col justify-center ${
                        isHighContrast ? "bg-black" : "bg-[#111]"
                    }`}>

                        <h2 className="text-3xl font-semibold mb-2">
                            Join the Fashion Community
                        </h2>

                        <p className="text-gray-400 text-sm mb-8">
                            Create your account and explore premium fashion
                        </p>

                        <input
                            type="text"
                            placeholder="Username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mb-3 px-4 py-3 border border-white/20 rounded-lg bg-transparent"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mb-3 px-4 py-3 border border-white/20 rounded-lg bg-transparent"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mb-3 px-4 py-3 border border-white/20 rounded-lg bg-transparent"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="w-full mb-6 px-4 py-3 border border-white/20 rounded-lg bg-transparent"
                        />

                        <button
                            onClick={handleSignup}
                            className={`w-full py-3 rounded-lg font-semibold ${
                                isHighContrast
                                    ? "bg-yellow-400 text-black"
                                    : "bg-white text-black"
                            }`}
                        >
                            Create Account
                        </button>

                        {msg && (
                            <p className="text-sm text-center mt-4">{msg}</p>
                        )}

                        <p className="text-gray-400 text-sm text-center mt-8">
                            Already have account?
                            <span
                                onClick={() => router.push("/login")}
                                className="ml-2 underline cursor-pointer"
                            >
                                Log in
                            </span>
                        </p>

                    </div>
                </div>
            </div>
        </>
    );
}