import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { MatchesScreen } from './src/screens/MatchesScreen';
import { styles, themedStyles } from './src/styles/App.styles';
import { ThemeProvider, useTheme } from './src/styles/ThemeProvider';

function AppContent() {
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.root, themedStyles(theme).root]}>
      <MatchesScreen />
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
