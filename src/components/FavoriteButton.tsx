import { Pressable, Text } from 'react-native';
import { styles } from './styles/FavoriteButton.styles';

type Props = {
  active: boolean;
  onPress: () => void;
};

// Звёздочка «в избранное».
export function FavoriteButton({ active, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel={active ? 'Убрать из избранного' : 'Добавить в избранное'}
    >
      <Text style={[styles.star, active && styles.active]}>{active ? '★' : '☆'}</Text>
    </Pressable>
  );
}
