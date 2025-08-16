export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center text-center px-6"
      style={{
        backgroundImage:
          "url('https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2022/04/6-Best-Expense-Tracking-Apps-for-Android.jpg')",
      }}
    >
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-primary">Expense Tracker</span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Track your daily expenses, stay in control of your budget, and save
          more efficiently with our simple and easy-to-use tool.
        </p>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </section>
  );
}
