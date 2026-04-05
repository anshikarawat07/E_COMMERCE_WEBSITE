"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import AccessibilityPanel from "@/components/AccessibilityPanel";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    <CartProvider>

                        <Navbar />
                        <AccessibilityPanel />

                        {children}

                    </CartProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}