"use client";

import { useCart } from "@/app/context/CartContext";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CartPage() {
  const router = useRouter();
  const {
    lines,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
  } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(to right, #000000, #111827)" }}
    >
      <Navbar />

      <main className="pt-24 px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-wide">
              Your Cart
            </h1>
          </div>

          {totalItems === 0 ? (
            <div className="mt-10 text-gray-400 text-center py-16 border border-white/10 rounded-2xl bg-black/10">
              Cart is empty. Add products from the dashboard.
            </div>
          ) : (
            <>
              {/* BUY NOW (left side) */}
              <div className="mt-8 mb-6 flex justify-start">
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      `Proceeding to payment. Total: ₹${totalPrice.toLocaleString()}`
                    )
                  }
                  className="px-6 py-3 rounded-lg text-sm font-semibold bg-white text-black hover:opacity-90 transition"
                >
                  Buy Now
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {lines.map((line) => {
                  const { product, quantity } = line;
                  const lineTotal = product.price * quantity;

                  return (
                    <div
                      key={product.id}
                      className="flex items-center gap-6 p-4 rounded-2xl border border-white/10 bg-black/10"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/160x160/1a1a1a/555555?text=No+Image";
                        }}
                      />

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          ₹{product.price.toLocaleString()} each
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, -1)
                          }
                          disabled={quantity <= 1}
                          className={`w-9 h-9 rounded-lg border transition text-lg font-semibold ${
                            quantity <= 1
                              ? "opacity-40 cursor-not-allowed border-white/10"
                              : "border-white/20 hover:border-white"
                          }`}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>

                        <span className="min-w-8 text-center font-semibold">
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, 1)
                          }
                          className="w-9 h-9 rounded-lg border border-white/20 hover:border-white transition text-lg font-semibold"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">
                          ₹{lineTotal.toLocaleString()}
                        </p>

                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          className="mt-2 text-xs px-3 py-2 rounded-lg border border-red-400/30 text-red-200 hover:border-red-400 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 flex justify-end">
                <div className="w-full max-w-sm p-4 rounded-2xl border border-white/10 bg-black/10">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total</span>
                    <span className="text-lg font-semibold">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    Cart updates are saved to localStorage.
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

