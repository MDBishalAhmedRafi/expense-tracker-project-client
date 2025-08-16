"use client";

import { useRouter } from "next/navigation";

export default function CallToAction() {
  const router = useRouter();

  const handleStartNow = () => {
    router.push("/add-expense"); // Redirect to AddExpense page
  };

  return (
    <section className="bg-primary text-white py-16 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to take control of your finances?
      </h2>
      <p className="text-lg mb-6">
        Start tracking your expenses today and build a better financial future.
      </p>
      <button className="btn btn-accent" onClick={handleStartNow}>
        Start Now
      </button>
    </section>
  );
}
