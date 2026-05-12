"use client";
import { useEffect, useState, useCallback } from "react";

type Bot = { username: string; online: boolean; uptimeSecs: number; downtimeSecs: number };

function formatDowntime(secs: number) {
  if (secs < 60) return `${secs}s`;
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

const NICKNAMES: Record<string, string> = {
  Alunewie:     "Alunewie",
  Semi2412:     "semi2412",
  Babetr0n4497: "Babetron",
  Yogan1260:    "yogan1260",
  henry979:     "henry979",
  alt66:        "v1perrex",
  alt77:        "Kulsts",
  alt8:         "oolonglebg",
  alt9:         "8uuav",
  alt10:        "sznurek",
  alt11:        "fnaflol12",
  alt12:        "Aquilaurea",
  alt13:        "kfln",
  alt14:        "Mookra",
  alt15:        "Matuzali",
  alt1:         "painkakes",
};

export default function StatsPage() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [error, setError] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/stats");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setBots(data.bots);
      setUpdatedAt(new Date().toLocaleTimeString());
      setError(false);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30 * 1000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  const botsOnline = bots.filter((b) => b.online).length;
  const totalUptime = bots.reduce((sum, b) => sum + b.uptimeSecs, 0);
  const totalDowntime = bots.reduce((sum, b) => sum + b.downtimeSecs, 0);

  return (
    <div className="min-h-screen px-6 py-24 max-w-4xl mx-auto" style={{ color: "var(--foreground)" }}>
      <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>
        Live · updates every 30s
      </p>
      <h1 className="text-3xl font-bold mb-10 tracking-tight">Bot Stats</h1>

      {error ? (
        <p className="text-sm" style={{ color: "#f87171" }}>Could not reach metrics server.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="p-6 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>Bots AFK</p>
              <p className="text-4xl font-bold">{botsOnline} <span className="text-lg font-normal" style={{ color: "rgba(232,232,240,0.4)" }}>/ {bots.length}</span></p>
            </div>
            <div className="p-6 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>Total Uptime</p>
              <p className="text-4xl font-bold">{formatDowntime(totalUptime)}</p>
            </div>
            <div className="p-6 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>Total Downtime</p>
              <p className="text-4xl font-bold">{formatDowntime(totalDowntime)}</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-x-auto" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full text-sm" style={{ minWidth: "520px" }}>
              <thead>
                <tr style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
                  <th className="text-left px-5 py-3 font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>Account</th>
                  <th className="text-center px-5 py-3 font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>Status</th>
                  <th className="text-right px-5 py-3 font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>Uptime</th>
                  <th className="text-right px-5 py-3 font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>Downtime</th>
                </tr>
              </thead>
              <tbody>
                {bots.map((bot, i) => (
                  <tr
                    key={bot.username}
                    style={{
                      background: i % 2 === 0 ? "var(--background)" : "var(--card)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <td className="px-5 py-3 font-mono">{NICKNAMES[bot.username] ?? bot.username}</td>
                    <td className="px-5 py-3 text-center text-xs font-mono" style={{ color: bot.online ? "#4ade80" : "#f87171" }}>
                      {bot.online ? "online" : "offline"}
                    </td>
                    <td className="px-5 py-3 text-right font-mono text-xs" style={{ color: "rgba(232,232,240,0.7)" }}>
                      {formatDowntime(bot.uptimeSecs)}
                    </td>
                    <td className="px-5 py-3 text-right font-mono text-xs" style={{ color: bot.downtimeSecs > 0 ? "#f87171" : "rgba(232,232,240,0.4)" }}>
                      {formatDowntime(bot.downtimeSecs)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {updatedAt && (
            <p className="text-xs mt-4 text-right font-mono" style={{ color: "rgba(232,232,240,0.3)" }}>
              Last updated {updatedAt}
            </p>
          )}
        </>
      )}
    </div>
  );
}
