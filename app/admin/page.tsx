import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function logout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  redirect("/admin/login");
}

export default function AdminPage() {
  return (
    <div className="flex flex-col h-screen" style={{ background: "var(--background)" }}>
      <header
        className="flex items-center justify-between px-6 py-3 shrink-0"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--card)" }}
      >
        <p className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>
          Admin · Grafana
        </p>
        <form action={logout}>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-xs font-medium transition-opacity duration-200 hover:opacity-70"
            style={{ background: "var(--border)", color: "var(--foreground)" }}
          >
            Log out
          </button>
        </form>
      </header>
      <iframe
        src="https://grafana.williamedwards.me"
        className="flex-1 w-full border-0"
        title="Grafana"
      />
    </div>
  );
}
