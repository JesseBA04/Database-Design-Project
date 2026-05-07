"use client";

import { useEffect, useState } from "react";

type HealthResponse =
  | { status: "ok"; restaurantCount: number }
  | { status: "error"; message: string };

export default function HealthPage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data: HealthResponse) => setHealth(data))
      .catch((err) =>
        setHealth({ status: "error", message: (err as Error).message })
      );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-primary mb-6">System Health</h1>

        {health === null ? (
          <p className="text-gray-500 text-lg animate-pulse">
            Checking database…
          </p>
        ) : health.status === "ok" ? (
          <div className="text-primary">
            <p className="text-lg mb-1">Database connected ✓</p>
            <p className="text-lg">
              Restaurants in DB:{" "}
              <span className="font-semibold">{health.restaurantCount}</span>
            </p>
          </div>
        ) : (
          <div className="text-red-600">
            <h2 className="text-xl font-bold mb-3">Connection Error</h2>
            <p className="text-sm break-words">{health.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
