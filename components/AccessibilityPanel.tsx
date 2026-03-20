"use client";
import { useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";
const modes = [
    { key: "default", label: "Default", desc: "Original colors", dot: "bg-white" },
    { key: "deuteranopia", label: "Deuteranopia", desc: "Red-green adjusted", dot: "bg-blue-400" },
    { key: "protanopia", label: "Protanopia", desc: "Red-blind adjusted", dot: "bg-green-400" },
    { key: "tritanopia", label: "Tritanopia", desc: "Blue-yellow adjusted", dot: "bg-orange-400" },
    { key: "highcontrast", label: "High Contrast", desc: "Black & yellow", dot: "bg-yellow-400" },
] as const;

export default function AccessibilityPanel() {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const isHC = theme === "highcontrast";

    return (
        <div className="fixed top-5 right-5 z-[999]">
            <button
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border shadow-xl transition-all duration-300 ${isHC
                    ? "bg-yellow-400 text-black border-yellow-400"
                    : "bg-black/80 backdrop-blur-md text-white border-white/20 hover:border-white"
                    }`}
            >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                </svg>
                Vision Mode
            </button>

            {open && (
                <div className={`absolute right-0 top-12 w-56 rounded-2xl border p-4 shadow-2xl transition-all duration-300 ${isHC ? "bg-black border-yellow-400" : "bg-[#111] border-white/20"
                    }`}>
                    <p className={`text-xs uppercase tracking-widest mb-3 font-medium ${isHC ? "text-yellow-400" : "text-gray-500"}`}>
                        Vision Mode
                    </p>

                    {modes.map(({ key, label, desc, dot }) => (
                        <button
                            key={key}
                            onClick={() => { setTheme(key); setOpen(false); }}
                            className={`w-full text-left px-3 py-2.5 rounded-xl mb-1 flex items-center gap-3 transition-all duration-200 ${theme === key
                                ? isHC
                                    ? "bg-yellow-400/20 border border-yellow-400"
                                    : "bg-white/10 border border-white/30"
                                : "border border-transparent hover:bg-white/5"
                                }`}
                        >
                            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${dot}`} />
                            <div>
                                <p className={`text-sm font-medium ${theme === key
                                    ? isHC ? "text-yellow-400" : "text-white"
                                    : isHC ? "text-yellow-200" : "text-gray-300"
                                    }`}>
                                    {label}
                                </p>
                                <p className={`text-xs ${isHC ? "text-yellow-600" : "text-gray-600"}`}>
                                    {desc}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}