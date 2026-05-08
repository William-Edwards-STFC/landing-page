"use client";

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm font-mono mb-4 tracking-widest uppercase" style={{ color: "var(--accent)" }}>
          Contact
        </p>
        <h2 className="text-4xl font-bold mb-6 tracking-tight">Let&apos;s work together.</h2>
        <p className="text-lg mb-12 max-w-xl" style={{ color: "rgba(232,232,240,0.6)" }}>
          I&apos;m currently open to new opportunities. If you have a role or project that could be a good fit, feel free to reach out.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:we51264@gmail.com"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-medium transition-opacity duration-200 hover:opacity-85"
            style={{ background: "var(--accent)", color: "white" }}
          >
            Send me an email
          </a>
          <a
            href="https://www.linkedin.com/in/william-edwards-9905511b0/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-medium transition-colors duration-200 hover:border-indigo-400"
            style={{ border: "1px solid var(--border)", color: "var(--foreground)" }}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/William-Edwards-STFC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-medium transition-colors duration-200 hover:border-indigo-400"
            style={{ border: "1px solid var(--border)", color: "var(--foreground)" }}
          >
            GitHub
          </a>
          <a
            href="/william-edwards-cv.pdf"
            download
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-medium transition-colors duration-200 hover:border-indigo-400"
            style={{ border: "1px solid var(--border)", color: "var(--foreground)" }}
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
