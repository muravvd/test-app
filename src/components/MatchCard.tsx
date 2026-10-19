import { Text, View } from 'react-native';
import type { Match } from '../types/match';
import { formatStartsAt, getStatusLabel } from '../utils/matches';
import { FavoriteButton } from './FavoriteButton';
import { statusStyles, styles } from './styles/MatchCard.styles';

type Props = {
  match: Match;
  isFavorite: boolean;
  onToggleFavorite: (matchId: string) => void;
};

export function MatchCard({ match, isFavorite, onToggleFavorite }: Props) {
  const { home, away, score } = match;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.date}>{formatStartsAt(match.startsAt)}</Text>
        <View style={styles.headerRight}>
          <Text style={[styles.status, statusStyles[match.status]]}>{getStatusLabel(match)}</Text>
          <FavoriteButton active={isFavorite} onPress={() => onToggleFavorite(match.id)} />
        </View>
      </View>

      <View style={styles.line}>
        <Text style={[styles.team, styles.homeTeam]} numberOfLines={2}>
          {home.name}
        </Text>
        <Text style={styles.score}>{score ? `${score.home} : ${score.away}` : '– : –'}</Text>
        <Text style={[styles.team, styles.awayTeam]} numberOfLines={2}>
          {away.name}
        </Text>
      </View>
    </View>
  );
}
