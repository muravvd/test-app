import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import type { Theme } from '../../styles/colors';

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  dimmed: {
    opacity: 0.6,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export const themedStyles = (theme: Theme) => ({
  button: { backgroundColor: theme.primary } satisfies ViewStyle,
  title: { color: theme.onPrimary } satisfies TextStyle,
});
