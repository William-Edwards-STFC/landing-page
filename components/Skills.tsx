const skillGroups = [
  { category: "Languages",      skills: ["TypeScript", "JavaScript (ES6+)", "Python", "C#", "Java"] },
  { category: "Frontend",       skills: ["React", "Next.js", "Vite", "Tailwind CSS"] },
  { category: "Backend",        skills: ["Node.js", "Express", "Flask"] },
  { category: "Databases",      skills: ["PostgreSQL", "Oracle DB"] },
  { category: "DevOps & Cloud", skills: ["Docker", "Kubernetes", "Jenkins", "OpenStack", "CI/CD"] },
  { category: "Observability",  skills: ["Grafana", "Loki", "Tempo", "Mimir"] },
  { category: "Tools",          skills: ["Git", "GitLab", "GitHub", "Jira", "Confluence"] },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm font-mono mb-4 tracking-widest uppercase" style={{ color: "var(--accent)" }}>
          Skills
        </p>
        <h2 className="text-4xl font-bold mb-16 tracking-tight">What I work with.</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="p-6 rounded-2xl"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <p className="text-xs font-mono mb-4 tracking-widest uppercase" style={{ color: "var(--accent)" }}>
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1 rounded-full"
                    style={{ background: "var(--border)", color: "rgba(232,232,240,0.75)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
