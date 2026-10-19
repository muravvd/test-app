import { useEffect, useState } from 'react';
import { loadFavorites, saveFavorites } from '../storage/favoritesStorage';

// Избранные матчи (по id). Сохраняются на устройстве между запусками.
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadFavorites()
      .then((stored) => {
        // Объединяем, а не заменяем: пользователь мог нажать звезду раньше, чем дочиталось хранилище.
        if (!cancelled) setFavorites((prev) => [...new Set([...stored, ...prev])]);
      })
      .catch((error) => console.warn('Не удалось прочитать избранное', error))
      .finally(() => {
        if (!cancelled) setIsLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // До загрузки не сохраняем, иначе пустой стартовый список затрёт сохранённый.
  useEffect(() => {
    if (!isLoaded) return;
    saveFavorites(favorites).catch((error) => console.warn('Не удалось сохранить избранное', error));
  }, [favorites, isLoaded]);

  const isFavorite = (id: string) => favorites.includes(id);

  // Новый массив вместо мутации: иначе React видит ту же ссылку и не перерисовывает экран.
  const toggle = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((favoriteId) => favoriteId !== id) : [...prev, id]));
  };

  return { favorites, isFavorite, toggle };
}
