export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'postponed' | 'unknown';

export type Team = {
  id: string;
  name: string;
  city: string | null;
};

export type Score = {
  home: number;
  away: number;
};

export type Match = {
  id: string;
  status: MatchStatus;
  // null — дата ещё не назначена (например, у перенесённого матча).
  startsAt: Date | null;
  // Минута матча, приходит только для live.
  minute: number | null;
  home: Team;
  away: Team;
  // null — счёта нет (матч не начался). 0:0 — это реальный счёт, а не его отсутствие.
  score: Score | null;
};

export type MatchesData = {
  round: number | null;
  matches: Match[];
};
