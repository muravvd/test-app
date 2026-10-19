import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import type { Theme } from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  round: {
    fontSize: 16,
    fontWeight: '400',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  hint: {
    fontSize: 14,
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
  },
  errorBannerText: {
    flex: 1,
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  separator: {
    height: 8,
  },
});

export const themedStyles = (theme: Theme) => ({
  title: { color: theme.text } satisfies TextStyle,
  round: { color: theme.textMuted } satisfies TextStyle,
  hint: { color: theme.textMuted } satisfies TextStyle,
  errorTitle: { color: theme.text } satisfies TextStyle,
  errorBanner: { backgroundColor: theme.errorSurface } satisfies ViewStyle,
  errorBannerText: { color: theme.errorText } satisfies TextStyle,
});
