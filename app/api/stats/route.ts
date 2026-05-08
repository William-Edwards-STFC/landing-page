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
    const [coins, fruits, rewards] = await Promise.all([
      queryMetric("afkbot_coins_earned_total"),
      queryMetric("afkbot_fruits_earned_total"),
      queryMetric("afkbot_daily_rewards_total"),
    ]);

    const botsMap: Record<string, { coins: number; fruits: number; rewards: number }> = {};

    for (const item of coins) {
      const u = item.metric.username;
      if (!botsMap[u]) botsMap[u] = { coins: 0, fruits: 0, rewards: 0 };
      botsMap[u].coins = Math.round(parseFloat(item.value[1]));
    }

    for (const item of fruits) {
      const u = item.metric.username;
      if (!botsMap[u]) botsMap[u] = { coins: 0, fruits: 0, rewards: 0 };
      botsMap[u].fruits = Math.round(parseFloat(item.value[1]));
    }

    for (const item of rewards) {
      const u = item.metric.username;
      if (!botsMap[u]) botsMap[u] = { coins: 0, fruits: 0, rewards: 0 };
      botsMap[u].rewards = Math.round(parseFloat(item.value[1]));
    }

    const bots = Object.entries(botsMap)
      .map(([username, data]) => ({ username, ...data }))
      .sort((a, b) => b.coins - a.coins);

    return NextResponse.json({ bots });
  } catch {
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 });
  }
}
