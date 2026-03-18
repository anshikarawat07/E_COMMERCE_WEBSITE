"use client";
import { createContext, useContext, useState, useEffect } from "react";

type ThemeKey = "default" | "deuteranopia" | "protanopia" | "tritanopia" | "highcontrast";

type ThemeContextType = {
    theme: ThemeKey;
    setTheme: (t: ThemeKey) => void;
};

const ThemeContext = createContext<ThemeContextType>({
    theme: "default",
    setTheme: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<ThemeKey>("default");

    // Load saved theme on first render
    useEffect(() => {
        const saved = localStorage.getItem("ut-theme") as ThemeKey;
        if (saved) setThemeState(saved);
    }, []);

    const setTheme = (t: ThemeKey) => {
        setThemeState(t);
        localStorage.setItem("ut-theme", t); // persist across pages
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);