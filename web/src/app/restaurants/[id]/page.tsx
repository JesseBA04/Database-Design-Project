"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useCurrentUser } from "@/contexts/UserContext";

type Restaurant = {
  restaurantId: number;
  name: string;
  foodCategory: string;
  priceCategory: string;
  youPassEligible: boolean;
};

type Location = {
  address: string;
  operatingHours: string;
};

type MenuItem = {
  foodItemId: number;
  itemName: string;
  itemDescription: string | null;
  allergyInformation: string | null;
  preparationEdits: string | null;
  price: number | null;
};

type Review = {
  stars: number;
  reviewText: string | null;
  foodItemId: number;
  itemName: string | null;
  reviewerName: string | null;
};

type DetailData = {
  restaurant: Restaurant;
  locations: Location[];
  menu: MenuItem[];
  reviews: Review[];
};

function StarRating({ stars }: { stars: number }) {
  const filled = Math.round(stars);
  return (
    <span className="text-yellow-500" aria-label={`${stars} stars`}>
      {Array.from({ length: 5 }, (_, i) =>
        i < filled ? "★" : "☆"
      ).join("")}
    </span>
  );
}

function MenuItemCard({
  item,
  restaurantId,
  restaurantName,
}: {
  item: MenuItem;
  restaurantId: number;
  restaurantName: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(
      {
        foodItemId: item.foodItemId,
        itemName: item.itemName,
        price: item.price ?? 0,
      },
      restaurantId,
      restaurantName
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white p-5 rounded-lg border border-primary-100">
      {/* Top row: name + price */}
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-primary">{item.itemName}</h3>
        {item.price != null && (
          <span className="text-lg font-semibold text-gray-700 ml-2 shrink-0">
            ${item.price.toFixed(2)}
          </span>
        )}
      </div>

      {/* Description */}
      {item.itemDescription && (
        <p className="text-sm text-gray-600 mt-1">{item.itemDescription}</p>
      )}

      {/* Allergy info */}
      {item.allergyInformation && (
        <p className="text-xs text-gray-500 italic mt-2">
          ⚠ {item.allergyInformation}
        </p>
      )}

      {/* Preparation edits */}
      {item.preparationEdits && (
        <p className="text-xs text-gray-500 mt-1">
          🔧 {item.preparationEdits}
        </p>
      )}

      {/* Add to cart */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleAdd}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            added
              ? "bg-green-500 text-white"
              : "bg-primary text-white hover:bg-primary-600"
          }`}
        >
          {added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default function RestaurantDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { currentUser } = useCurrentUser();

  const [data, setData] = useState<DetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Favorite state
  const [favorited, setFavorited] = useState(false);
  const [favLoading, setFavLoading] = useState(true);

  // Fetch restaurant detail
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/restaurants/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Restaurant not found`);
        return res.json();
      })
      .then((d: DetailData) => setData(d))
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch favorite status
  const fetchFavorite = useCallback(() => {
    if (!currentUser) {
      setFavLoading(false);
      return;
    }
    setFavLoading(true);
    fetch(
      `/api/favorites?userId=${currentUser.userId}&restaurantId=${id}`
    )
      .then((res) => res.json())
      .then((d) => setFavorited(d.favorited === true))
      .catch(() => setFavorited(false))
      .finally(() => setFavLoading(false));
  }, [currentUser, id]);

  useEffect(() => {
    fetchFavorite();
  }, [fetchFavorite]);

  const toggleFavorite = () => {
    if (!currentUser) return;
    const newVal = !favorited;
    setFavorited(newVal); // optimistic
    fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: currentUser.userId,
        restaurantId: Number(id),
        favorited: newVal,
      }),
    }).catch(() => {
      setFavorited(!newVal); // revert on error
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-center text-gray-500 py-16">
          Loading restaurant…
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8 text-center">
        <p className="text-red-600 mb-4">{error ?? "Something went wrong"}</p>
        <Link
          href="/restaurants"
          className="text-primary hover:underline text-sm"
        >
          ← Back to restaurants
        </Link>
      </div>
    );
  }

  const { restaurant, locations, menu, reviews } = data;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Back link */}
      <Link
        href="/restaurants"
        className="text-sm text-primary hover:underline mb-4 inline-block"
      >
        ← All restaurants
      </Link>

      {/* Restaurant header */}
      <h1 className="text-4xl font-bold text-primary">{restaurant.name}</h1>
      <div className="flex gap-2 flex-wrap items-center mt-2">
        <span className="inline-block bg-primary-50 text-primary text-xs px-2 py-1 rounded-full">
          {restaurant.foodCategory}
        </span>
        <span className="inline-block bg-primary-50 text-primary text-xs px-2 py-1 rounded-full">
          {restaurant.priceCategory}
        </span>
        {restaurant.youPassEligible && (
          <span className="inline-block bg-accent text-white text-xs px-2 py-1 rounded-full">
            YouPass ✓
          </span>
        )}
        {/* Favorite button */}
        <button
          onClick={toggleFavorite}
          disabled={favLoading}
          aria-label={
            favorited ? "Remove from favorites" : "Add to favorites"
          }
          className="text-2xl hover:scale-110 transition-transform ml-1"
        >
          {favorited ? (
            <span className="text-accent">♥</span>
          ) : (
            <span className="text-gray-400">♡</span>
          )}
        </button>
      </div>

      {/* Locations */}
      {locations.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold text-primary mb-2">
            Locations
          </h2>
          <div className="space-y-2">
            {locations.map((loc, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-lg border border-primary-100"
              >
                <p className="font-medium">{loc.address}</p>
                <p className="text-sm text-gray-600">{loc.operatingHours}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Menu */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-primary mb-4">Menu</h2>
        {menu.length === 0 ? (
          <p className="text-gray-500">No menu items available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menu.map((item) => (
              <MenuItemCard
                key={item.foodItemId}
                item={item}
                restaurantId={restaurant.restaurantId}
                restaurantName={restaurant.name}
              />
            ))}
          </div>
        )}
      </section>

      {/* Reviews */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-primary mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-3">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-lg border border-primary-100"
              >
                <div className="flex items-center justify-between">
                  <StarRating stars={review.stars} />
                  <span className="text-sm text-gray-600">
                    {review.reviewerName ?? "Anonymous"}
                    {review.itemName && ` on ${review.itemName}`}
                  </span>
                </div>
                {review.reviewText && (
                  <p className="text-gray-700 mt-2">{review.reviewText}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
