import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { FilterTabs } from '../components/FilterTabs';
import { MatchCard } from '../components/MatchCard';
import { UpdatedAgo } from '../components/UpdatedAgo';
import { useMatches } from '../hooks/useMatches';
import { matchesFilter, sortByStartTime, type MatchFilter } from '../utils/matches';
import { styles } from './styles/MatchesScreen.styles';

const EMPTY_FILTER_TEXT: Record<MatchFilter, string> = {
  all: 'В этом туре пока нет матчей.',
  live: 'Сейчас матчи не идут.',
  upcoming: 'Предстоящих матчей нет.',
  finished: 'Завершённых матчей пока нет.',
};

// Экран «Матчи тура» — задание в README.md, часть 1.
export function MatchesScreen() {
  const { data, error, isLoading, isRefreshing, updatedAt, refresh, retry } = useMatches();
  const [filter, setFilter] = useState<MatchFilter>('all');

  const sortedMatches = useMemo(() => sortByStartTime(data?.matches ?? []), [data]);
  const visibleMatches = useMemo(
    () => sortedMatches.filter((match) => matchesFilter(match, filter)),
    [sortedMatches, filter],
  );
  const counts = useMemo(() => {
    const count = (f: MatchFilter) => sortedMatches.filter((match) => matchesFilter(match, f)).length;
    return { all: count('all'), live: count('live'), upcoming: count('upcoming'), finished: count('finished') };
  }, [sortedMatches]);

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Матчи тура</Text>
        {isLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" />
            <Text style={styles.hint}>Загружаем матчи…</Text>
          </View>
        ) : (
          <View style={styles.centered}>
            <Text style={styles.errorTitle}>Не удалось загрузить матчи</Text>
            {error && <Text style={styles.hint}>{error}</Text>}
            <Button title="Повторить" onPress={retry} />
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Матчи тура{data.round !== null && <Text style={styles.round}> · {data.round} тур</Text>}
        </Text>
        <Button title={isRefreshing ? 'Обновляем…' : 'Обновить'} onPress={refresh} disabled={isRefreshing} />
      </View>

      {updatedAt && <UpdatedAgo since={updatedAt} />}

      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>Не удалось обновить: {error}</Text>
          <Button title="Повторить" onPress={retry} />
        </View>
      )}

      <FilterTabs value={filter} counts={counts} onChange={setFilter} />

      <FlatList
        data={visibleMatches}
        keyExtractor={(match) => match.id}
        renderItem={({ item }) => <MatchCard match={item} />}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={visibleMatches.length === 0 ? styles.emptyContent : styles.listContent}
        ListEmptyComponent={
          <Text style={styles.hint}>{EMPTY_FILTER_TEXT[counts.all === 0 ? 'all' : filter]}</Text>
        }
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
      />
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}
