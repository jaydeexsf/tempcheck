'use client';

export interface UserSession {
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'scale';
  monthlyQuota: number;
  isLoggedIn: boolean;
}

export interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  requestsUsed: number;
  status: 'active' | 'revoked';
}

export interface ApiRequestLog {
  id: string;
  email: string;
  domain: string;
  disposable: boolean;
  keyName: string;
  latencyMs: number;
  timestamp: string;
}

const SESSION_KEY = 'tempcheck_session';
const API_KEYS_KEY = 'tempcheck_apikeys';
const LOGS_KEY = 'tempcheck_logs';

// Initial default session
const DEFAULT_SESSION: UserSession = {
  email: 'developer@company.com',
  name: 'Alex Mercer',
  plan: 'free',
  monthlyQuota: 1000,
  isLoggedIn: true
};

// Initial default API keys (Total used: 650 + 200 = 850 / 1000)
const DEFAULT_API_KEYS: ApiKeyItem[] = [
  {
    id: 'key_1',
    name: 'Production App Backend',
    key: 'tc_live_9f8a3c4b1d2e5f6a7b8c9d0e',
    createdAt: '2026-08-15',
    requestsUsed: 650,
    status: 'active'
  },
  {
    id: 'key_2',
    name: 'Staging Testing Server',
    key: 'tc_live_1a2b3c4d5e6f7a8b9c0d1e2f',
    createdAt: '2026-08-28',
    requestsUsed: 200,
    status: 'active'
  }
];

// Initial default request logs
const DEFAULT_LOGS: ApiRequestLog[] = [
  {
    id: 'log_1',
    email: 'user@tempmail.com',
    domain: 'tempmail.com',
    disposable: true,
    keyName: 'Production App Backend',
    latencyMs: 18,
    timestamp: '2 mins ago'
  },
  {
    id: 'log_2',
    email: 'sarah.connor@gmail.com',
    domain: 'gmail.com',
    disposable: false,
    keyName: 'Production App Backend',
    latencyMs: 14,
    timestamp: '5 mins ago'
  },
  {
    id: 'log_3',
    email: 'test@10minutemail.com',
    domain: '10minutemail.com',
    disposable: true,
    keyName: 'Staging Testing Server',
    latencyMs: 22,
    timestamp: '12 mins ago'
  },
  {
    id: 'log_4',
    email: 'dev@acmecorp.io',
    domain: 'acmecorp.io',
    disposable: false,
    keyName: 'Production App Backend',
    latencyMs: 16,
    timestamp: '25 mins ago'
  }
];

export function getSession(): UserSession {
  if (typeof window === 'undefined') return DEFAULT_SESSION;
  const stored = localStorage.getItem(SESSION_KEY);
  if (!stored) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(DEFAULT_SESSION));
    return DEFAULT_SESSION;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_SESSION;
  }
}

export function setSession(session: UserSession): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  const session = getSession();
  session.isLoggedIn = false;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getApiKeys(): ApiKeyItem[] {
  if (typeof window === 'undefined') return DEFAULT_API_KEYS;
  const stored = localStorage.getItem(API_KEYS_KEY);
  if (!stored) {
    localStorage.setItem(API_KEYS_KEY, JSON.stringify(DEFAULT_API_KEYS));
    return DEFAULT_API_KEYS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_API_KEYS;
  }
}

export function saveApiKeys(keys: ApiKeyItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(API_KEYS_KEY, JSON.stringify(keys));
}

export function createNewApiKey(name: string): ApiKeyItem {
  const keys = getApiKeys();
  const randomHash = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  const newKey: ApiKeyItem = {
    id: `key_${Date.now()}`,
    name: name || 'New API Key',
    key: `tc_live_${randomHash}`,
    createdAt: new Date().toISOString().split('T')[0],
    requestsUsed: 0,
    status: 'active'
  };
  const updated = [newKey, ...keys];
  saveApiKeys(updated);
  return newKey;
}

export function revokeApiKey(id: string): ApiKeyItem[] {
  const keys = getApiKeys();
  const updated = keys.map(k => k.id === id ? { ...k, status: 'revoked' as const } : k);
  saveApiKeys(updated);
  return updated;
}

export function getRequestLogs(): ApiRequestLog[] {
  if (typeof window === 'undefined') return DEFAULT_LOGS;
  const stored = localStorage.getItem(LOGS_KEY);
  if (!stored) {
    localStorage.setItem(LOGS_KEY, JSON.stringify(DEFAULT_LOGS));
    return DEFAULT_LOGS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_LOGS;
  }
}
