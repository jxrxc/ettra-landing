/**
 * Security monitoring and rate limiting utilities for ettra-landing
 * Simplified version for landing page - uses in-memory rate limiting
 */

/**
 * Security event types for monitoring
 */
export type SecurityEventType = 
  | 'rate_limit_exceeded'
  | 'invalid_request'
  | 'unauthorized_access'
  | 'suspicious_activity'
  | 'failed_authentication'
  | 'api_abuse';

/**
 * Security event log entry
 */
export interface SecurityEvent {
  type: SecurityEventType;
  endpoint: string;
  ip?: string;
  userAgent?: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

/**
 * Simple in-memory rate limiter
 */
class SimpleRateLimiter {
  private requests = new Map<string, number[]>();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number, windowSeconds: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowSeconds * 1000;
    
    // Clean up old entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, timestamps] of this.requests.entries()) {
      const filtered = timestamps.filter(ts => now - ts < this.windowMs);
      if (filtered.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, filtered);
      }
    }
  }

  checkLimit(key: string): { allowed: boolean; retryAfter?: number } {
    const now = Date.now();
    const timestamps = this.requests.get(key) || [];
    
    // Remove old timestamps outside the window
    const recentTimestamps = timestamps.filter(ts => now - ts < this.windowMs);
    
    if (recentTimestamps.length >= this.maxRequests) {
      // Calculate retry after (oldest request + window - now)
      const oldest = Math.min(...recentTimestamps);
      const retryAfter = Math.ceil((oldest + this.windowMs - now) / 1000);
      return { allowed: false, retryAfter };
    }
    
    // Add current request
    recentTimestamps.push(now);
    this.requests.set(key, recentTimestamps);
    
    return { allowed: true };
  }
}

// Rate limiters per endpoint
const rateLimiters = {
  '/api/waitlist': new SimpleRateLimiter(5, 60), // 5 requests per minute
  default: new SimpleRateLimiter(30, 60), // 30 requests per minute
};

/**
 * Extract client IP from request
 * Handles Vercel's proxy headers and X-Forwarded-For
 */
export function getClientIP(request: Request): string | null {
  // Check X-Forwarded-For header (Vercel sets this)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Take the first IP (original client)
    return forwardedFor.split(',')[0].trim();
  }
  
  // Fallback to X-Real-IP
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }
  
  // Check CF-Connecting-IP (Cloudflare)
  const cfIP = request.headers.get('cf-connecting-ip');
  if (cfIP) {
    return cfIP.trim();
  }
  
  return null;
}

/**
 * Generate rate limit key from IP and endpoint
 */
export function getRateLimitKey(ip: string | null, endpoint: string): string {
  if (ip) {
    return `ratelimit:${endpoint}:${ip}`;
  }
  // Fallback to endpoint-only if no IP (shouldn't happen in production)
  return `ratelimit:${endpoint}:unknown`;
}

/**
 * Check rate limit for a request
 * Returns true if allowed, false if rate limited
 */
export function checkRateLimit(
  endpoint: string,
  request: Request
): { allowed: boolean; retryAfter?: number } {
  const ip = getClientIP(request);
  const rateLimitKey = getRateLimitKey(ip, endpoint);
  
  // Get rate limiter for endpoint or use default
  const limiter = rateLimiters[endpoint as keyof typeof rateLimiters] || rateLimiters.default;
  
  const result = limiter.checkLimit(rateLimitKey);
  
  if (!result.allowed) {
    // Log security event
    logSecurityEvent({
      type: 'rate_limit_exceeded',
      endpoint,
      ip: ip || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      details: {
        rateLimitKey,
      },
      timestamp: new Date(),
    });
  }
  
  return result;
}

/**
 * Log security event to console
 */
export function logSecurityEvent(event: SecurityEvent): void {
  // Always log to console for observability
  console.warn('[SECURITY]', {
    type: event.type,
    endpoint: event.endpoint,
    ip: event.ip,
    userAgent: event.userAgent,
    details: event.details,
    timestamp: event.timestamp.toISOString(),
  });
}

/**
 * Check if an IP address is suspicious based on simple heuristics
 */
export function isSuspiciousIP(ip: string | null): boolean {
  if (!ip) {
    return false;
  }
  
  // Check for private/localhost IPs (shouldn't reach production)
  if (
    ip.startsWith('127.') ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip === 'localhost' ||
    ip === '::1'
  ) {
    return true;
  }
  
  return false;
}

/**
 * Get security headers for API responses
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };
}

