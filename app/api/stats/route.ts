import { NextResponse } from "next/server";

const PROMETHEUS_URL = process.env.PROMETHEUS_URL ?? "http://prometheus:9090";

async function queryMetric(metric: string) {
  const res = await fetch(`${PROMETHEUS_URL}/api/v1/query?query=${encodeURIComponent(metric)}`, {
    next: { revalidate: 0 },
  });
  const json = await res.json();
  return json.data.result as { metric: { username: string }; value: [number, string] }[];
}

export async function GET() {
  try {
    const [onlinePerBot, uptime, downtime] = await Promise.all([
      queryMetric("afkbot_bot_online"),
      queryMetric("afkbot_uptime_seconds_total"),
      queryMetric("afkbot_downtime_seconds_total"),
    ]);

    const botsMap: Record<string, { online: boolean; uptimeSecs: number; downtimeSecs: number }> = {};

    const empty = () => ({ online: false, uptimeSecs: 0, downtimeSecs: 0 });

    for (const item of onlinePerBot) {
      const u = item.metric.username;
      if (!botsMap[u]) botsMap[u] = empty();
      botsMap[u].online = parseFloat(item.value[1]) === 1;
    }

    for (const item of uptime) {
      const u = item.metric.username;
      if (!botsMap[u]) botsMap[u] = empty();
      botsMap[u].uptimeSecs = Math.round(parseFloat(item.value[1]));
    }

    for (const item of downtime) {
      const u = item.metric.username;
      if (!botsMap[u]) botsMap[u] = empty();
      botsMap[u].downtimeSecs = Math.round(parseFloat(item.value[1]));
    }

    const bots = Object.entries(botsMap)
      .map(([username, data]) => ({ username, ...data }))
      .sort((a, b) => b.uptimeSecs - a.uptimeSecs);

    return NextResponse.json({ bots });
  } catch {
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 });
  }
}
