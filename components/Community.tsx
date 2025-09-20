export default function Community() {
  const stats = [
    {
      icon: "/icons/trust_shield.svg",
      label: "New verified members",
      value: "+1 284",
      hint: "last 30 days",
    },
    {
      icon: "/icons/handshake.svg",
      label: "Confirmed bookings",
      value: "3 921",
      hint: "98.4% on-time check-ins",
    },
    {
      icon: "/globe.svg",
      label: "Countries with active exchanges",
      value: "22",
      hint: "Top: Lisbon · Berlin · Amsterdam",
    },
  ];

  const quotes = [
    { text: "I spent 3 months in Berlin without rent — the membership paid for itself in a week.", author: "Sofia · Lisbon" },
    { text: "Hosting was simple, and the insurance gave me peace of mind.", author: "Alex · Amsterdam" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900 text-center">Community</h2>
        <p className="mt-2 text-slate-600 text-center">A European network of fair exchange — verified, secure and active.</p>

        {/* Stats */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {stats.map((s, i) => (
            <div key={i} className="rounded-2xl border bg-white p-6 shadow-sm flex items-start gap-4">
              <img src={s.icon} alt="" className="h-12 w-12" />
              <div>
                <p className="text-sm text-slate-500">{s.label}</p>
                <p className="text-xl font-semibold">{s.value}</p>
                <p className="text-xs text-slate-500">{s.hint}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quotes */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {quotes.map((q, i) => (
            <blockquote key={i} className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-slate-800">“{q.text}”</p>
              <footer className="mt-3 text-sm text-slate-500">— {q.author}</footer>
            </blockquote>
          ))}
        </div>

        {/* Transparency */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
          <span>🛡️ Community fund: <b>€142 300</b></span>
          <span className="text-slate-300">•</span>
          <span>✅ 97% incidents resolved &lt; 7 days</span>
        </div>
      </div>
    </section>
  );
}
