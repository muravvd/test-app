import { StyleSheet, type ViewStyle } from 'react-native';
import type { Theme } from './colors';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 48,
  },
});

export const themedStyles = (theme: Theme) => ({
  root: { backgroundColor: theme.background } satisfies ViewStyle,
});
