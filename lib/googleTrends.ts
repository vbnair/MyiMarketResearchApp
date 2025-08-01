// Stub for Google Trends: replace with actual integration
export type TrendData = {
  keyword: string;
  score: number;
  geo: string;
  timeframe: string;
};

export async function fetchGoogleTrends(
  keywords: string[],
  geo: string,
  timeframe: string
): Promise<TrendData[]> {
  // Simulated data
  return keywords.map(kw => ({
    keyword: kw,
    score: Math.random() * 100,
    geo,
    timeframe,
  }));
}
