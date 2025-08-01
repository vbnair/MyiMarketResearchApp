type Opportunity = {
  keyword: string;
  score: number;
  demand: number;
  monetization: number;
  competitionGap: number;
};

const DEMAND_WEIGHT = 0.4;
const MONETIZATION_WEIGHT = 0.3;
const COMPETITION_WEIGHT = 0.3;

export function scoreOpportunities(
  trendsData: { keyword: string; score: number }[],
  subredditSentimentData: any[]
): Opportunity[] {
  // Placeholder scoring

  return trendsData.map(t => {
    const demand = (t.score || 0) / 100;
    const monetization = 0.5;
    const competitionGap = Math.random();

    const totalScore = 
      demand * DEMAND_WEIGHT +
      monetization * MONETIZATION_WEIGHT +
      competitionGap * COMPETITION_WEIGHT;

    return {
      keyword: t.keyword,
      score: totalScore,
      demand,
      monetization,
      competitionGap,
    };
  });
}
