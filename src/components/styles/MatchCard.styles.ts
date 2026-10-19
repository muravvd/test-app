import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import type { Theme } from '../../styles/colors';
import type { MatchStatus } from '../../types/match';

export const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
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

export const themedStyles = (theme: Theme) => ({
  card: { backgroundColor: theme.surface } satisfies ViewStyle,
  date: { color: theme.textMuted } satisfies TextStyle,
  text: { color: theme.text } satisfies TextStyle,
  status: {
    scheduled: { color: theme.info },
    live: { color: theme.accent },
    finished: { color: theme.textMuted },
    postponed: { color: theme.warning },
    unknown: { color: theme.textMuted },
  } satisfies Record<MatchStatus, TextStyle>,
});
