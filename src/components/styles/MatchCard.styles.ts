import { StyleSheet, type TextStyle } from 'react-native';
import { colors } from '../../styles/colors';
import type { MatchStatus } from '../../types/match';

export const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.surface,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  date: {
    fontSize: 13,
    color: colors.textMuted,
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
    color: colors.text,
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
    color: colors.text,
  },
});

export const statusStyles = StyleSheet.create({
  scheduled: { color: colors.info },
  live: { color: colors.accent },
  finished: { color: colors.textMuted },
  postponed: { color: colors.warning },
  unknown: { color: colors.textMuted },
}) satisfies Record<MatchStatus, TextStyle>;
