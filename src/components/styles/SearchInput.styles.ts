import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import type { Theme } from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  clear: {
    fontSize: 20,
    paddingLeft: 8,
  },
});

export const themedStyles = (theme: Theme) => ({
  container: { backgroundColor: theme.surface } satisfies ViewStyle,
  input: { color: theme.text } satisfies TextStyle,
  clear: { color: theme.textMuted } satisfies TextStyle,
});
