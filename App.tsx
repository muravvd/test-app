import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { MatchesScreen } from './src/screens/MatchesScreen';
import { styles } from './src/styles/App.styles';

export default function App() {
  return (
    <View style={styles.root}>
      <MatchesScreen />
      <StatusBar style="auto" />
    </View>
  );
}
