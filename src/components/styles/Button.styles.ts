import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  dimmed: {
    opacity: 0.6,
  },
  title: {
    color: colors.onPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
});
