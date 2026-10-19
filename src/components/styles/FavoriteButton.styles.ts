import { StyleSheet, type TextStyle } from 'react-native';
import type { Theme } from '../../styles/colors';

export const styles = StyleSheet.create({
  star: {
    fontSize: 22,
  },
  active: {},
});

export const themedStyles = (theme: Theme) => ({
  star: { color: theme.textSubtle } satisfies TextStyle,
  active: { color: theme.accent } satisfies TextStyle,
});
