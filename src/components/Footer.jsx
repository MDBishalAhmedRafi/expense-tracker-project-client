import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-gray-700 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Brand */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-primary">Expense Tracker</h2>
        </div>

        {/* Navigation */}
        <div className="flex gap-6 mb-4 md:mb-0">
          <Link href="/add-expense" className="hover:text-primary transition">
            Add Expense
          </Link>
          <Link href="/expenses" className="hover:text-primary transition">
            Expense List
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
