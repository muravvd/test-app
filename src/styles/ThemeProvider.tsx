import { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme, type Theme } from './colors';

type ThemeContextValue = {
  theme: Theme;
  isDark: boolean;
  // null — следовать настройке системы.
  override: boolean | null;
  setOverride: (override: boolean | null) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const [override, setOverride] = useState<boolean | null>(null);

  const value = useMemo<ThemeContextValue>(() => {
    const isDark = override ?? colorScheme === 'dark';
    return { theme: isDark ? darkTheme : lightTheme, isDark, override, setOverride };
  }, [colorScheme, override]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme нужно вызывать внутри ThemeProvider');
  return value;
}
