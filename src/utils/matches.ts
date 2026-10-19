import type { Match, MatchStatus } from '../types/match';

export type MatchFilter = 'all' | 'live' | 'upcoming' | 'finished';

export const FILTERS: MatchFilter[] = ['all', 'live', 'upcoming', 'finished'];

export const FILTER_LABELS: Record<MatchFilter, string> = {
  all: 'Все',
  live: 'Текущие',
  upcoming: 'Предстоящие',
  finished: 'Завершённые',
};

const STATUS_LABELS: Record<MatchStatus, string> = {
  scheduled: 'Запланирован',
  live: 'Идёт',
  finished: 'Завершён',
  postponed: 'Перенесён',
  unknown: 'Статус неизвестен',
};

// Предстоящие — ещё не начатые: запланированные и перенесённые.
// Матчи с неизвестным статусом показываем только во «Все», чтобы не гадать.
export function matchesFilter(match: Match, filter: MatchFilter): boolean {
  switch (filter) {
    case 'all':
      return true;
    case 'live':
      return match.status === 'live';
    case 'upcoming':
      return match.status === 'scheduled' || match.status === 'postponed';
    case 'finished':
      return match.status === 'finished';
  }
}

export function getStatusLabel(match: Match): string {
  if (match.status === 'live' && match.minute !== null) {
    return `${STATUS_LABELS.live} · ${match.minute}'`;
  }
  return STATUS_LABELS[match.status];
}

// По времени начала; матчи без даты — в конец.
export function sortByStartTime(matches: Match[]): Match[] {
  return [...matches].sort((a, b) => {
    if (!a.startsAt) return b.startsAt ? 1 : 0;
    if (!b.startsAt) return -1;
    return a.startsAt.getTime() - b.startsAt.getTime();
  });
}

// Без явного timeZone Intl использует часовой пояс устройства.
const startsAtFormatter = new Intl.DateTimeFormat('ru-RU', {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
});

export function formatStartsAt(startsAt: Date | null): string {
  return startsAt ? startsAtFormatter.format(startsAt) : 'Дата не назначена';
}
