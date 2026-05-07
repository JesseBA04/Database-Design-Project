"use client";

import Link from "next/link";

type RestaurantCardProps = {
  restaurantId: number;
  name: string;
  foodCategory: string;
  priceCategory: string;
  youPassEligible: boolean;
  primaryAddress: string | null;
};

export default function RestaurantCard({
  restaurantId,
  name,
  foodCategory,
  priceCategory,
  youPassEligible,
  primaryAddress,
}: RestaurantCardProps) {
  return (
    <Link
      href={`/restaurants/${restaurantId}`}
      className="block bg-white rounded-lg shadow-sm border border-primary-100 hover:shadow-md hover:border-primary hover:scale-[1.02] transition-all duration-200 cursor-pointer"
    >
      <div className="p-5 flex flex-col">
        {/* Top row: name + price */}
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-primary">{name}</h3>
          <span className="text-sm text-gray-500 ml-2 shrink-0">
            {priceCategory}
          </span>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 mt-2">
          <span className="inline-block bg-primary-50 text-primary text-xs px-2 py-1 rounded-full">
            {foodCategory}
          </span>
          {youPassEligible && (
            <span className="inline-block bg-accent text-white text-xs px-2 py-1 rounded-full">
              YouPass ✓
            </span>
          )}
        </div>

        {/* Address */}
        {primaryAddress && (
          <p className="text-sm text-gray-600 mt-3">{primaryAddress}</p>
        )}
      </div>
    </Link>
  );
}
