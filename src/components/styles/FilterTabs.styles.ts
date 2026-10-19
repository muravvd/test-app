import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import type { Theme } from '../../styles/colors';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  label: {
    fontSize: 14,
  },
});

export const themedStyles = (theme: Theme) => ({
  tab: { backgroundColor: theme.surface } satisfies ViewStyle,
  tabSelected: { backgroundColor: theme.primary } satisfies ViewStyle,
  label: { color: theme.text } satisfies TextStyle,
  labelSelected: { color: theme.onPrimary } satisfies TextStyle,
});
