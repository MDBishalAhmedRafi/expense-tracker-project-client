import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-gray-700 border-t border-gray-300 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        {/* Logo / Brand */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">Expense Tracker</h2>
          <p className="text-sm text-gray-500">
            Track your spending. Build your future.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center md:justify-start gap-6">
          <Link href="/add-expense" className="hover:text-primary transition duration-200">
            Add Expense
          </Link>
          <Link href="/expenses" className="hover:text-primary transition duration-200">
            Expense List
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500 md:text-right">
          &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
