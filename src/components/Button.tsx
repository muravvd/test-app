import { Pressable, Text } from 'react-native';
import { useTheme } from '../styles/ThemeProvider';
import { styles, themedStyles } from './styles/Button.styles';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export function Button({ title, onPress, disabled }: Props) {
  const themed = themedStyles(useTheme().theme);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [styles.button, themed.button, (pressed || disabled) && styles.dimmed]}
    >
      <Text style={[styles.title, themed.title]}>{title}</Text>
    </Pressable>
  );
}
