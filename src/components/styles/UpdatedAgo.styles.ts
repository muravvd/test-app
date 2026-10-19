import { StyleSheet, type TextStyle } from 'react-native';
import type { Theme } from '../../styles/colors';

export const styles = StyleSheet.create({
  text: {
    fontSize: 13,
  },
});

export const themedStyles = (theme: Theme) => ({
  text: { color: theme.textMuted } satisfies TextStyle,
});
