"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useCurrentUser } from "@/contexts/UserContext";
import { useState } from "react";

export default function CartPage() {
  const {
    cart,
    itemCount,
    subtotal,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = async () => {
    if (!currentUser || cart.restaurantId === null || cart.items.length === 0)
      return;

    setPlacing(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.userId,
          restaurantId: cart.restaurantId,
          items: cart.items.map((i) => ({
            foodItemId: i.foodItemId,
            quantity: i.quantity,
            itemPrice: i.price,
            itemName: i.itemName,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Failed to place order");
      }
      clearCart();
      router.push(`/orders/${data.orderId}`);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setPlacing(false);
    }
  };

  if (itemCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <p className="text-xl text-gray-500 mb-6">Your cart is empty</p>
        <Link
          href="/restaurants"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
        >
          Browse restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-primary">Your Cart</h1>
      <p className="text-gray-600 mb-6">
        From {cart.restaurantName}
      </p>

      {/* Cart items */}
      <div className="space-y-3">
        {cart.items.map((item) => (
          <div
            key={item.foodItemId}
            className="bg-white p-4 rounded-lg border border-primary-100 flex items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-primary truncate">
                {item.itemName}
              </p>
              <p className="text-sm text-gray-500">
                ${item.price.toFixed(2)} each
              </p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQuantity(item.foodItemId, item.quantity - 1)
                }
                className="w-8 h-8 flex items-center justify-center border border-primary text-primary rounded hover:bg-primary-50 transition-colors text-sm font-semibold"
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  updateQuantity(item.foodItemId, item.quantity + 1)
                }
                className="w-8 h-8 flex items-center justify-center border border-primary text-primary rounded hover:bg-primary-50 transition-colors text-sm font-semibold"
              >
                +
              </button>
            </div>

            {/* Line total */}
            <span className="text-sm font-semibold text-gray-700 w-16 text-right">
              ${(item.price * item.quantity).toFixed(2)}
            </span>

            {/* Remove button */}
            <button
              onClick={() => removeItem(item.foodItemId)}
              className="text-gray-400 hover:text-red-500 transition-colors text-lg"
              aria-label={`Remove ${item.itemName}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Subtotal + Place Order */}
      <div className="mt-8 border-t border-primary-100 pt-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-semibold text-primary">Subtotal</span>
          <span className="text-xl font-semibold text-gray-700">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={placing || !currentUser}
          className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {placing ? "Placing order…" : "Place Order"}
        </button>
      </div>
    </div>
  );
}
