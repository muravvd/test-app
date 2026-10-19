import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { styles } from './styles/UpdatedAgo.styles';

type Props = {
  // Момент последней успешной загрузки данных.
  since: Date;
};

// Подпись «Обновлено N сек назад».
export function UpdatedAgo({ since }: Props) {
  const [now, setNow] = useState(() => Date.now());

  // Таймер только перерисовывает компонент раз в секунду; сами секунды считаются от since.
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // max(0, …): после обновления since может оказаться чуть позже последнего тика now.
  const seconds = Math.max(0, Math.floor((now - since.getTime()) / 1000));

  return <Text style={styles.text}>Обновлено {seconds} сек назад</Text>;
}
