"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

export default function CartIconButton({
  isHighContrast = false,
  className = "",
}: {
  isHighContrast?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const { totalItems } = useCart();

  return (
    <button
      type="button"
      onClick={() => router.push("/cart")}
      className={`relative p-2 rounded-lg border transition ${isHighContrast
        ? "border-yellow-400 text-yellow-400"
        : "border-white/20 text-white hover:border-white"}`}
      aria-label="Open cart"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>

      {totalItems > 0 && (
        <span
          className={`absolute -top-1 -right-1 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold ${
            isHighContrast
              ? "bg-yellow-400 text-black"
              : "bg-white text-black"
          }`}
        >
          {totalItems}
        </span>
      )}

      {className}
    </button>
  );
}

