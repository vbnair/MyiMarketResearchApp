import { NextRequest, NextResponse } from 'next/server';
import { sanitizeKeywords, sanitizeGeo, sanitizeTimeframe, sanitizeTopFeatures } from '../../../lib/utils';
import { searchSubreddits } from '../../../lib/reddit';
import { fetchGoogleTrends } from '../../../lib/googleTrends';
import { scoreOpportunities } from '../../../lib/scoring';
// import { callHuggingFaceModel } from '../../../lib/huggingface'; // Uncomment if used

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const seedKeywords = sanitizeKeywords(body.seedKeywords);
    if (seedKeywords.length === 0) {
      return NextResponse.json({ error: 'Seed Keywords are required' }, { status: 400 });
    }

    const geo = sanitizeGeo(body.geo);
    const timeframe = sanitizeTimeframe(body.timeframe);
    const topFeatures = sanitizeTopFeatures(body.topFeatures);

    // Auto-discover subreddits
    let discoveredSubs: string[] = [];
    for (const kw of seedKeywords) {
      try {
        const subs = await searchSubreddits(kw);
        discoveredSubs = discoveredSubs.concat(subs);
      } catch (e) {
        console.warn(`Subreddit search failed for "${kw}": ${(e as Error).message}`);
      }
    }

    discoveredSubs = [...new Set(discoveredSubs)].slice(0, 5);
    if (discoveredSubs.length === 0) discoveredSubs = ['Entrepreneur', 'startups'];

    // Fetch Google Trends data
    const trendsData = await fetchGoogleTrends(seedKeywords, geo, timeframe);

    // Optional: Integrate Hugging Face model call below if needed
    /*
    const hfResult = await callHuggingFaceModel({ inputs: seedKeywords.join(', ') });
    */

    // Placeholder subreddit sentiment analysis
    const subredditSentimentData = [];

    // Score opportunities
    const scoredOpportunities = scoreOpportunities(trendsData, subredditSentimentData);

    // Pick top features to show
    const topOpportunities = scoredOpportunities
      .sort((a, b) => b.score - a.score)
      .slice(0, topFeatures);

    // Compose warnings
    const warnings = [];
    if (discoveredSubs.includes('Entrepreneur') && discoveredSubs.length <= 2) {
      warnings.push('No relevant subreddits found; default communities used.');
    }

    return NextResponse.json({
      insights: {
        topKeyword: topOpportunities[0]?.keyword ?? null,
        message: 'Top opportunity predicted based on trends and keywords.',
      },
      opportunities: topOpportunities,
      warnings,
    });
  } catch (err) {
    console.error('API handler error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
