import { StyleSheet, Text, View } from 'react-native';
import type { Match, MatchStatus } from '../types/match';
import { formatStartsAt, getStatusLabel } from '../utils/matches';

type Props = {
  match: Match;
};

export function MatchCard({ match }: Props) {
  const { home, away, score } = match;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.date}>{formatStartsAt(match.startsAt)}</Text>
        <Text style={[styles.status, { color: STATUS_COLORS[match.status] }]}>{getStatusLabel(match)}</Text>
      </View>

      <View style={styles.line}>
        <Text style={[styles.team, styles.homeTeam]} numberOfLines={2}>
          {home.name}
        </Text>
        <Text style={styles.score}>{score ? `${score.home} : ${score.away}` : '– : –'}</Text>
        <Text style={[styles.team, styles.awayTeam]} numberOfLines={2}>
          {away.name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 13,
    color: '#6b7280',
  },
  status: {
    fontSize: 13,
    fontWeight: '600',
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  team: {
    flex: 1,
    fontSize: 18,
  },
  homeTeam: {
    textAlign: 'right',
  },
  awayTeam: {
    textAlign: 'left',
  },
  score: {
    fontSize: 20,
    fontWeight: '700',
    minWidth: 64,
    textAlign: 'center',
  },
});

const STATUS_COLORS: Record<MatchStatus, string> = {
  scheduled: '#2563eb',
  live: '#ef3124',
  finished: '#6b7280',
  postponed: '#d97706',
  unknown: '#6b7280',
};
