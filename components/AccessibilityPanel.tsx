"use client";

import { useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";

const modes = ["default","deuteranopia","protanopia","tritanopia","highcontrast"];

export default function AccessibilityPanel() {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed top-20 right-5 z-[999]">
            <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 bg-yellow-400 text-black rounded-full text-xs"
            >
                Accessibility
            </button>

            {open && (
                <div className="mt-2 bg-black border p-3 rounded-xl">
                    {modes.map((m) => (
                        <button
                            key={m}
                            onClick={() => {
                                setTheme(m as any);
                                setOpen(false);
                            }}
                            className="block w-full text-left px-2 py-1 text-sm text-white hover:bg-white/10"
                        >
                            {m}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}