type Order = {
  Order_id: number;
  Order_date: string;
  Order_status: string;
  Order_price: number | string;
  Order_details: string | null;
  restaurant_name: string | null;
  User_Id: number;
};

async function getOrders(): Promise<Order[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/orders`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to load orders');
  }

  return res.json();
}

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <main className="min-h-screen bg-purple-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold text-purple-900">
          Order History
        </h1>
        <p className="mb-8 text-gray-600">
          Recent YouDash pickup orders.
        </p>

        {orders.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow">
            <p className="text-gray-600">No orders found yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.Order_id}
                className="rounded-xl border border-purple-100 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-purple-900">
                      Order #{order.Order_id}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {order.restaurant_name || 'Unknown restaurant'}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      {order.Order_date
                        ? new Date(order.Order_date).toLocaleString()
                        : 'No date available'}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                      {order.Order_status}
                    </span>
                    <p className="mt-3 text-lg font-bold text-purple-900">
                      ${Number(order.Order_price).toFixed(2)}
                    </p>
                  </div>
                </div>

                {order.Order_details && (
                  <p className="mt-4 text-sm text-gray-700">
                    {order.Order_details}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}