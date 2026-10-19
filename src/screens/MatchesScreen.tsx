import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { FilterTabs } from '../components/FilterTabs';
import { MatchCard } from '../components/MatchCard';
import { UpdatedAgo } from '../components/UpdatedAgo';
import { useMatches } from '../hooks/useMatches';
import { matchesFilter, sortByStartTime, type MatchFilter } from '../utils/matches';

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

function Button({ title, onPress, disabled }: { title: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [styles.button, (pressed || disabled) && styles.buttonDimmed]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  round: {
    fontSize: 16,
    fontWeight: '400',
    color: '#6b7280',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  hint: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fee2e2',
  },
  errorBannerText: {
    flex: 1,
    fontSize: 14,
    color: '#991b1b',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#111827',
  },
  buttonDimmed: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  separator: {
    height: 8,
  },
});
