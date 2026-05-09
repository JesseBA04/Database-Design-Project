"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/contexts/UserContext";
import RestaurantCard from "@/components/RestaurantCard";

type Profile = {
  userId: number;
  name: string | null;
  age: number | null;
  creationDate: string | null;
  profilePicture: string | null;
  youPassStatus: boolean;
  notificationPreferences: string | null;
};

type Address = {
  address: string;
  nickname: string | null;
  isHome: boolean;
  isWork: boolean;
};

type PaymentMethod = {
  issuer: string;
  cardLast4: string;
  cardExpiration: string;
  cardName: string;
};

type FavoriteRestaurant = {
  restaurantId: number;
  name: string;
  foodCategory: string;
  priceCategory: string;
  youPassEligible: boolean;
};

type OrderSummary = {
  orderCount: number;
  totalSpent: number;
};

type ProfileData = {
  profile: Profile;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  favoriteRestaurants: FavoriteRestaurant[];
  orderSummary: OrderSummary;
};

function formatMemberSince(dateStr: string | null): string {
  if (!dateStr) return "Unknown";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function ProfilePage() {
  const { currentUser, loading: userLoading } = useCurrentUser();
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userLoading || !currentUser) return;

    setLoading(true);
    setError(null);

    fetch(`/api/profile?userId=${currentUser.userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load profile");
        return res.json();
      })
      .then((d) => setData(d))
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [currentUser, userLoading]);

  if (userLoading || !currentUser || loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-gray-500 text-center">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const { profile, addresses, paymentMethods, favoriteRestaurants, orderSummary } = data;
  const initial = (profile.name ?? "?")[0].toUpperCase();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Section A: Profile header */}
      <div className="bg-white rounded-lg p-6 border border-primary-100 shadow-sm relative">
        {profile.youPassStatus && (
          <span className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
            YouPass Member ✓
          </span>
        )}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
            <span className="text-3xl font-bold text-primary">{initial}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">
              {profile.name ?? "Unknown User"}
            </h1>
            {profile.age != null && (
              <p className="text-sm text-gray-600">{profile.age} years old</p>
            )}
            <p className="text-sm text-gray-500">
              Member since {formatMemberSince(profile.creationDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Section B: Stats row */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-5 rounded-lg border border-primary-100">
          <p className="text-3xl font-bold text-primary">
            {orderSummary.orderCount}
          </p>
          <p className="text-sm text-gray-600">Total Orders</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-primary-100">
          <p className="text-3xl font-bold text-primary">
            ${orderSummary.totalSpent.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">Total Spent</p>
        </div>
      </div>

      {/* Section C: Saved addresses */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-primary mb-3">Saved Addresses</h2>
        {addresses.length === 0 ? (
          <p className="text-gray-500">No saved addresses.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {addresses.map((addr, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-lg border border-primary-100"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary">
                    {addr.nickname ?? "Address"}
                  </span>
                  <div className="flex gap-1">
                    {addr.isHome && (
                      <span className="bg-primary-50 text-primary text-xs px-2 py-1 rounded-full">
                        Home
                      </span>
                    )}
                    {addr.isWork && (
                      <span className="bg-primary-50 text-primary text-xs px-2 py-1 rounded-full">
                        Work
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-2">{addr.address}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section D: Payment methods */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-primary mb-3">Payment Methods</h2>
        {paymentMethods.length === 0 ? (
          <p className="text-gray-500">No payment methods saved.</p>
        ) : (
          <div className="space-y-2">
            {paymentMethods.map((pm, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-lg border border-primary-100 flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-primary">{pm.issuer}</span>
                  <span className="text-gray-700 font-mono ml-3">
                    •••• •••• •••• {pm.cardLast4}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{pm.cardName}</p>
                  <p className="text-xs text-gray-500">Exp {pm.cardExpiration}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section E: Favorite restaurants */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-primary mb-3">
          Favorite Restaurants
        </h2>
        {favoriteRestaurants.length === 0 ? (
          <div>
            <p className="text-gray-500">No favorites yet.</p>
            <Link
              href="/restaurants"
              className="text-accent hover:underline text-sm mt-1 inline-block"
            >
              Browse restaurants
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteRestaurants.map((r) => (
              <RestaurantCard
                key={r.restaurantId}
                restaurantId={r.restaurantId}
                name={r.name}
                foodCategory={r.foodCategory}
                priceCategory={r.priceCategory}
                youPassEligible={r.youPassEligible}
                primaryAddress={null}
              />
            ))}
          </div>
        )}
      </section>

      {/* Section F: Notification preferences */}
      <section className="mt-8 mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">
          Notification Preferences
        </h2>
        {!profile.notificationPreferences ? (
          <p className="text-gray-500">No preferences set.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {profile.notificationPreferences
              .split(",")
              .map((pref) => pref.trim())
              .filter(Boolean)
              .map((pref, i) => (
                <span
                  key={i}
                  className="bg-primary-50 text-primary px-3 py-1 rounded-full text-sm"
                >
                  {pref}
                </span>
              ))}
          </div>
        )}
      </section>
    </div>
  );
}
