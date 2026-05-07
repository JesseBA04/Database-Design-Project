import { sql } from "@/lib/db";
import RestaurantCard from "@/components/RestaurantCard";

export const dynamic = "force-dynamic";

type Restaurant = {
  restaurantId: number;
  name: string;
  foodCategory: string;
  priceCategory: string;
  youPassEligible: boolean;
  primaryAddress: string | null;
};

export default async function RestaurantsPage() {
  const rows = await sql`
    SELECT
      r."Restaurant_id",
      r."Name",
      r."Food_Category",
      r."Price_Category",
      r."YouPass_eligible",
      (SELECT l."Address"
       FROM "Locations" l
       WHERE l."Restaurant_id" = r."Restaurant_id"
       LIMIT 1) AS primary_address
    FROM "Restaurants" r
    ORDER BY r."Name"
  `;

  const restaurants: Restaurant[] = rows.map((row) => ({
    restaurantId: row.Restaurant_id,
    name: row.Name,
    foodCategory: row.Food_Category,
    priceCategory: row.Price_Category,
    youPassEligible: row.YouPass_eligible,
    primaryAddress: row.primary_address,
  }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-2">Restaurants</h1>
      <p className="text-gray-600 mb-8">
        {restaurants.length} spots near you
      </p>

      {restaurants.length === 0 ? (
        <p className="text-center text-gray-500 py-16">
          No restaurants found
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {restaurants.map((r) => (
            <RestaurantCard key={r.restaurantId} {...r} />
          ))}
        </div>
      )}
    </div>
  );
}
