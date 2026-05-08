const projects = [
  {
    title: "AFK Bot Network",
    description:
      "A fleet of 16 Minecraft bots built with Mineflayer. Fully containerised with Docker, deployed on a VPS, and monitored with a full Grafana + Prometheus + Loki observability stack. Structured JSON logging, per-bot metrics, and live log streaming.",
    tags: ["Node.js", "Docker", "Grafana", "Prometheus", "Loki"],
    status: "Live",
  },
  {
    title: "More coming soon",
    description: "Building in public — new projects on the way.",
    tags: [],
    status: "Soon",
    placeholder: true,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm font-mono mb-4 tracking-widest uppercase" style={{ color: "var(--accent)" }}>
          Projects
        </p>
        <h2 className="text-4xl font-bold mb-16 tracking-tight">Things I&apos;ve built.</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group p-8 rounded-2xl transition-colors duration-200"
              style={{
                background: project.placeholder ? "transparent" : "var(--card)",
                border: project.placeholder ? "1px dashed var(--border)" : "1px solid var(--border)",
                opacity: project.placeholder ? 0.5 : 1,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <span
                  className="text-xs font-mono px-3 py-1 rounded-full"
                  style={{
                    background: project.status === "Live" ? "rgba(99,102,241,0.15)" : "rgba(63,63,90,0.4)",
                    color: project.status === "Live" ? "var(--accent)" : "var(--muted)",
                  }}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-sm mb-6" style={{ color: "rgba(232,232,240,0.55)" }}>
                {project.description}
              </p>
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-3 py-1 rounded-full"
                      style={{ background: "var(--border)", color: "rgba(232,232,240,0.6)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
