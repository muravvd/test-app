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

      <TeamRow name={home.name} goals={score?.home} />
      <TeamRow name={away.name} goals={score?.away} />
    </View>
  );
}

function TeamRow({ name, goals }: { name: string; goals: number | undefined }) {
  return (
    <View style={styles.teamRow}>
      <Text style={styles.teamName} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.goals}>{goals ?? '–'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  date: {
    fontSize: 13,
    color: '#6b7280',
  },
  status: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  teamName: {
    flex: 1,
    fontSize: 16,
  },
  goals: {
    fontSize: 16,
    fontWeight: '700',
    minWidth: 20,
    textAlign: 'right',
  },
});

const STATUS_COLORS: Record<MatchStatus, string> = {
  scheduled: '#2563eb',
  live: '#ef3124',
  finished: '#6b7280',
  postponed: '#d97706',
  unknown: '#6b7280',
};
