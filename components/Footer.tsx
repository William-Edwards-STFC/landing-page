export default function Footer() {
  return (
    <footer
      className="py-8 px-6 text-center text-sm"
      style={{ borderTop: "1px solid var(--border)", color: "rgba(232,232,240,0.35)" }}
    >
      <p>© {new Date().getFullYear()} William Edwards. Built with Next.js.</p>
    </footer>
  );
}
