export default function Features() {
  const features = [
    {
      title: "Easy Tracking",
      desc: "Add your daily expenses in just a few clicks.",
      icon: "💰",
    },
    {
      title: "Smart Reports",
      desc: "Visualize your spending with clear charts and insights.",
      icon: "📊",
    },
    {
      title: "Stay Organized",
      desc: "Categorize your expenses for better management.",
      icon: "🗂️",
    },
  ];

  return (
    <section className="py-12 px-4 bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-10">
        Why Choose <span className="text-primary">Us?</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="card bg-base-200 shadow-md p-6 text-center hover:shadow-lg transition"
          >
            <div className="text-5xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
