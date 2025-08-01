import fetch from 'node-fetch';

const subredditCache = new Map<string, string[]>();

async function getRedditAccessToken(): Promise<string> {
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  const userAgent = process.env.REDDIT_USER_AGENT || 'market-research-spa/0.1';

  if (!clientId || !clientSecret) throw new Error('Reddit API credentials missing');

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const resp = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': userAgent,
    },
    body: 'grant_type=client_credentials',
  });

  if (!resp.ok) throw new Error(`Failed to get Reddit access token: ${resp.status}`);

  const data = await resp.json();
  return data.access_token;
}

export async function searchSubreddits(keyword: string): Promise<string[]> {
  if (!keyword) return [];

  if (subredditCache.has(keyword)) {
    return subredditCache.get(keyword)!;
  }

  const accessToken = await getRedditAccessToken();
  const userAgent = process.env.REDDIT_USER_AGENT || 'market-research-spa/0.1';

  const params = new URLSearchParams({ q: keyword, limit: '5' });
  const res = await fetch(`https://oauth.reddit.com/subreddits/search?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': userAgent,
    },
  });

  if (!res.ok) {
    console.warn(`Failed to search subreddits for "${keyword}": status ${res.status}`);
    return [];
  }

  const json = await res.json();

  const subs = (json.data?.children ?? []).map((entry: any) => entry.data.display_name);

  // Cache for 1 hour
  subredditCache.set(keyword, subs);
  setTimeout(() => subredditCache.delete(keyword), 60 * 60 * 1000);

  return subs;
}
