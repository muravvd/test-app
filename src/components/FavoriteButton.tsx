import { Pressable, Text } from 'react-native';
import { useTheme } from '../styles/ThemeProvider';
import { styles, themedStyles } from './styles/FavoriteButton.styles';

type Props = {
  active: boolean;
  onPress: () => void;
};

// Звёздочка «в избранное».
export function FavoriteButton({ active, onPress }: Props) {
  const themed = themedStyles(useTheme().theme);

  return (
    <Pressable
      onPress={onPress}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel={active ? 'Убрать из избранного' : 'Добавить в избранное'}
    >
      <Text style={[styles.star, themed.star, active && themed.active]}>{active ? '★' : '☆'}</Text>
    </Pressable>
  );
}
