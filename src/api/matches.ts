import { MATCHES_URL } from '../config';
import type { Match, MatchStatus, MatchesData, Score, Team } from '../types/match';

const KNOWN_STATUSES: readonly MatchStatus[] = ['scheduled', 'live', 'finished', 'postponed'];

export async function fetchMatches(signal?: AbortSignal): Promise<MatchesData> {
  let response: Response;
  try {
    response = await fetch(MATCHES_URL, { signal, cache: 'no-store' });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new Error('Не удалось связаться с сервером. Проверьте подключение к интернету.');
  }

  if (!response.ok) {
    throw new Error(`Сервер вернул ошибку ${response.status}.`);
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch {
    throw new Error('Сервер вернул некорректные данные.');
  }

  return parseMatchesResponse(json);
}

export function parseMatchesResponse(json: unknown): MatchesData {
  if (!isRecord(json) || !Array.isArray(json.matches)) {
    throw new Error('Сервер вернул данные в неожиданном формате.');
  }

  return {
    round: typeof json.round === 'number' ? json.round : null,
    matches: json.matches.map(parseMatch).filter((match): match is Match => match !== null),
  };
}

// Битая запись не должна ронять весь список — такие матчи просто пропускаем.
function parseMatch(raw: unknown): Match | null {
  if (!isRecord(raw) || typeof raw.id !== 'string') return null;

  const home = parseTeam(raw.home);
  const away = parseTeam(raw.away);
  if (!home || !away) return null;

  return {
    id: raw.id,
    status: parseStatus(raw.status),
    startsAt: parseDate(raw.startsAt),
    minute: typeof raw.minute === 'number' ? raw.minute : null,
    home,
    away,
    score: parseScore(raw.score),
  };
}

function parseTeam(raw: unknown): Team | null {
  if (!isRecord(raw) || typeof raw.id !== 'string' || typeof raw.name !== 'string') return null;
  return { id: raw.id, name: raw.name, city: typeof raw.city === 'string' ? raw.city : null };
}

function parseScore(raw: unknown): Score | null {
  if (!isRecord(raw) || typeof raw.home !== 'number' || typeof raw.away !== 'number') return null;
  return { home: raw.home, away: raw.away };
}

function parseDate(raw: unknown): Date | null {
  if (typeof raw !== 'string') return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseStatus(raw: unknown): MatchStatus {
  return KNOWN_STATUSES.find((status) => status === raw) ?? 'unknown';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
