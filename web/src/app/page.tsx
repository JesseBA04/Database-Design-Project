import Link from "next/link";

const perks = [
  {
    title: "Skip the queue",
    body: "Your order is ready when you arrive.",
  },
  {
    title: "Member-only deals",
    body: "Discounts at YouPass-eligible spots.",
  },
  {
    title: "No fees",
    body: "No service fees on YouPass orders.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-accent py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Order ahead. Skip the line.
          </h1>
          <p className="text-xl text-primary-100 mt-4 max-w-2xl">
            YouDash brings your favorite local spots to you — pick up faster
            with YouPass.
          </p>
          <Link
            href="/restaurants"
            className="mt-8 inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Browse Restaurants
          </Link>
        </div>
      </section>

      {/* Why YouPass? */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-primary mb-8">Why YouPass?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {perks.map((perk) => (
            <div
              key={perk.title}
              className="bg-white p-6 rounded-lg shadow-sm border border-primary-100"
            >
              <h3 className="text-lg font-semibold text-primary mb-2">
                {perk.title}
              </h3>
              <p className="text-gray-600">{perk.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
