import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../styles/ThemeProvider';
import { styles, themedStyles } from './styles/ThemeToggle.styles';

const OPTIONS: { label: string; value: boolean | null }[] = [
  { label: 'Как в системе', value: null },
  { label: 'Светлая', value: false },
  { label: 'Тёмная', value: true },
];

export function ThemeToggle() {
  const { override, setOverride, theme } = useTheme();
  const themed = themedStyles(theme);

  return (
    <View style={[styles.row, themed.row]} accessibilityRole="radiogroup" accessibilityLabel="Тема оформления">
      {OPTIONS.map(({ label, value }) => {
        const selected = override === value;
        return (
          <Pressable
            key={label}
            onPress={() => setOverride(value)}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            style={[styles.option, selected && themed.optionSelected]}
          >
            <Text style={[styles.label, selected ? themed.labelSelected : themed.label]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
