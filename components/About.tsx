export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-sm font-mono mb-4 tracking-widest uppercase" style={{ color: "var(--accent)" }}>
            About me
          </p>
          <h2 className="text-4xl font-bold mb-6 tracking-tight">I build the whole stack.</h2>
          <p className="text-lg mb-4" style={{ color: "rgba(232,232,240,0.65)" }}>
            I started as an apprentice software engineer at STFC, spending four years working
            professionally while completing my degree and learning in production from day one.
            Since moving into a full junior engineering role, I&apos;ve worked across large-scale systems
            modernising legacy architecture, improving performance, meeting compliance requirements,
            and building out observability across services.
          </p>
          <p className="text-lg" style={{ color: "rgba(232,232,240,0.65)" }}>
            I care as much about the infrastructure running the code as the code itself.
            If something can be automated, I&apos;ll automate it. If something can be observed, I&apos;ll instrument it.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {[
            { label: "Experience", value: "4 years apprentice engineer · 1 year 8 months junior engineer" },
            { label: "Based in", value: "London, UK" },
            { label: "Status", value: "Open to new opportunities" },
          ].map((item) => (
            <div key={item.label} style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "1rem" }}>
              <p className="text-xs font-mono mb-1" style={{ color: "var(--accent)" }}>{item.label}</p>
              <p className="text-sm" style={{ color: "rgba(232,232,240,0.75)" }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
