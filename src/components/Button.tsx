import { Pressable, Text } from 'react-native';
import { styles } from './styles/Button.styles';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export function Button({ title, onPress, disabled }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [styles.button, (pressed || disabled) && styles.dimmed]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}
