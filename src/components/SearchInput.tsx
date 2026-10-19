import { Pressable, Text, TextInput, View } from 'react-native';
import { useTheme } from '../styles/ThemeProvider';
import { styles, themedStyles } from './styles/SearchInput.styles';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchInput({ value, onChange, placeholder }: Props) {
  const { theme } = useTheme();
  const themed = themedStyles(theme);

  return (
    <View style={[styles.container, themed.container]}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.textSubtle}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        accessibilityLabel={placeholder}
        style={[styles.input, themed.input]}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChange('')} hitSlop={12} accessibilityRole="button" accessibilityLabel="Очистить поиск">
          <Text style={[styles.clear, themed.clear]}>×</Text>
        </Pressable>
      )}
    </View>
  );
}
