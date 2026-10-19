export type Theme = {
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  primary: string;
  onPrimary: string;
  accent: string;
  info: string;
  warning: string;
  errorSurface: string;
  errorText: string;
};

export const lightTheme: Theme = {
  background: '#fff',
  surface: '#f3f4f6',
  text: '#111827',
  textMuted: '#6b7280',
  textSubtle: '#9ca3af',
  primary: '#111827',
  onPrimary: '#fff',
  accent: '#ef3124',
  info: '#2563eb',
  warning: '#d97706',
  errorSurface: '#fee2e2',
  errorText: '#991b1b',
};

export const darkTheme: Theme = {
  background: '#0f172a',
  surface: '#1e293b',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
  textSubtle: '#64748b',
  primary: '#f1f5f9',
  onPrimary: '#0f172a',
  accent: '#f87171',
  info: '#60a5fa',
  warning: '#fbbf24',
  errorSurface: '#3f1d1d',
  errorText: '#fca5a5',
};
