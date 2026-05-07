type OrderDetail = {
  Order_id: number;
  Order_date: string;
  Order_status: string;
  Order_price: number | string;
  Order_details: string | null;
  restaurant_name: string | null;
};

async function getOrders(): Promise<OrderDetail[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/orders`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to load order');
  }

  return res.json();
}

export default async function OrderConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  const orders = await getOrders();
  const order = orders.find((o) => String(o.Order_id) === params.id);

  if (!order) {
    return (
      <main className="min-h-screen bg-purple-50 px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 text-center shadow">
          <h1 className="text-2xl font-bold text-purple-900">
            Order not found
          </h1>
          <p className="mt-2 text-gray-600">
            We could not find this order.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-purple-50 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
        <div className="mb-6 rounded-lg bg-purple-100 p-4 text-purple-900">
          <h1 className="text-3xl font-bold">Order placed</h1>
          <p className="mt-1 text-sm">
            Your pickup order has been submitted successfully.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Order</p>
            <p className="text-xl font-semibold text-purple-900">
              #{order.Order_id}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Restaurant</p>
            <p className="font-medium">
              {order.restaurant_name || 'Unknown restaurant'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
              {order.Order_status}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-500">Items</p>
            <p className="text-gray-700">
              {order.Order_details || 'No item details available'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold text-purple-900">
              ${Number(order.Order_price).toFixed(2)}
                        </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="text-gray-700">
              {new Date(order.Order_date).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}