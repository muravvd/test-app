import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import type { Theme } from '../../styles/colors';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderRadius: 10,
    padding: 2,
  },
  option: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
  },
});

export const themedStyles = (theme: Theme) => ({
  row: { backgroundColor: theme.surface } satisfies ViewStyle,
  optionSelected: { backgroundColor: theme.primary } satisfies ViewStyle,
  label: { color: theme.text } satisfies TextStyle,
  labelSelected: { color: theme.onPrimary } satisfies TextStyle,
});
