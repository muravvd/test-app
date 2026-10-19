import { Text, View } from 'react-native';
import { useTheme } from '../styles/ThemeProvider';
import type { Match } from '../types/match';
import { formatStartsAt, getStatusLabel } from '../utils/matches';
import { FavoriteButton } from './FavoriteButton';
import { styles, themedStyles } from './styles/MatchCard.styles';

type Props = {
  match: Match;
  isFavorite: boolean;
  onToggleFavorite: (matchId: string) => void;
};

export function MatchCard({ match, isFavorite, onToggleFavorite }: Props) {
  const { home, away, score } = match;
  const themed = themedStyles(useTheme().theme);

  return (
    <View style={[styles.card, themed.card]}>
      <View style={styles.header}>
        <Text style={[styles.date, themed.date]}>{formatStartsAt(match.startsAt)}</Text>
        <View style={styles.headerRight}>
          <Text style={[styles.status, themed.status[match.status]]}>{getStatusLabel(match)}</Text>
          <FavoriteButton active={isFavorite} onPress={() => onToggleFavorite(match.id)} />
        </View>
      </View>

      <View style={styles.line}>
        <Text style={[styles.team, styles.homeTeam, themed.text]} numberOfLines={2}>
          {home.name}
        </Text>
        <Text style={[styles.score, themed.text]}>{score ? `${score.home} : ${score.away}` : '– : –'}</Text>
        <Text style={[styles.team, styles.awayTeam, themed.text]} numberOfLines={2}>
          {away.name}
        </Text>
      </View>
    </View>
  );
}
