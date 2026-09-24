type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const requests = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

export function rateLimit(key: string) {
  const now = Date.now();
  const existing = requests.get(key);

  if (!existing || existing.resetAt <= now) {
    requests.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return {
      success: true,
      remaining: MAX_REQUESTS - 1,
    };
  }

  if (existing.count >= MAX_REQUESTS) {
    return {
      success: false,
      remaining: 0,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;

  return {
    success: true,
    remaining: MAX_REQUESTS - existing.count,
  };
}