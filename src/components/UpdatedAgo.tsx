import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { styles } from './styles/UpdatedAgo.styles';

type Props = {
  // Момент последней успешной загрузки данных.
  since: Date;
};

// Подпись «Обновлено N сек назад».
export function UpdatedAgo({ since }: Props) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
  }, []);

  return <Text style={styles.text}>Обновлено {seconds} сек назад</Text>;
}
