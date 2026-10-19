import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

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
    backgroundColor: colors.surface,
  },
  tabSelected: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 14,
    color: colors.text,
  },
  labelSelected: {
    color: colors.onPrimary,
  },
});
