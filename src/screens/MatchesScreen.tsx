import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { FilterTabs } from '../components/FilterTabs';
import { MatchCard } from '../components/MatchCard';
import { SearchInput } from '../components/SearchInput';
import { ThemeToggle } from '../components/ThemeToggle';
import { UpdatedAgo } from '../components/UpdatedAgo';
import { useFavorites } from '../hooks/useFavorites';
import { useMatches } from '../hooks/useMatches';
import { useTheme } from '../styles/ThemeProvider';
import { matchesFilter, matchesSearch, sortByStartTime, type MatchFilter } from '../utils/matches';
import { styles, themedStyles } from './styles/MatchesScreen.styles';

const EMPTY_FILTER_TEXT: Record<MatchFilter, string> = {
  all: 'В этом туре пока нет матчей.',
  live: 'Сейчас матчи не идут.',
  upcoming: 'Предстоящих матчей нет.',
  finished: 'Завершённых матчей пока нет.',
  favorites: 'В избранном пока ничего нет.',
};

// Экран «Матчи тура» — задание в README.md, часть 1.
export function MatchesScreen() {
  const { data, error, isLoading, isRefreshing, updatedAt, refresh, retry } = useMatches();
  const { favorites, isFavorite, toggle } = useFavorites();
  const themed = themedStyles(useTheme().theme);
  const [filter, setFilter] = useState<MatchFilter>('all');
  const [query, setQuery] = useState('');

  const favoriteIds = useMemo(() => new Set(favorites), [favorites]);
  const sortedMatches = useMemo(() => sortByStartTime(data?.matches ?? []), [data]);
  const searchedMatches = useMemo(
    () => sortedMatches.filter((match) => matchesSearch(match, query)),
    [sortedMatches, query],
  );
  const visibleMatches = useMemo(
    () => searchedMatches.filter((match) => matchesFilter(match, filter, favoriteIds)),
    [searchedMatches, filter, favoriteIds],
  );
  const counts = useMemo(() => {
    const count = (f: MatchFilter) =>
      searchedMatches.filter((match) => matchesFilter(match, f, favoriteIds)).length;
    return {
      all: count('all'),
      live: count('live'),
      upcoming: count('upcoming'),
      finished: count('finished'),
      favorites: count('favorites'),
    };
  }, [searchedMatches, favoriteIds]);

  const trimmedQuery = query.trim();
  const emptyText =
    sortedMatches.length === 0
      ? EMPTY_FILTER_TEXT.all
      : trimmedQuery
        ? `По запросу «${trimmedQuery}» ничего не найдено.`
        : EMPTY_FILTER_TEXT[filter];

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, themed.title]}>Матчи тура</Text>
        {isLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={themed.title.color} />
            <Text style={[styles.hint, themed.hint]}>Загружаем матчи…</Text>
          </View>
        ) : (
          <View style={styles.centered}>
            <Text style={[styles.errorTitle, themed.errorTitle]}>Не удалось загрузить матчи</Text>
            {error && <Text style={[styles.hint, themed.hint]}>{error}</Text>}
            <Button title="Повторить" onPress={retry} />
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, themed.title]}>
          Матчи тура{data.round !== null && <Text style={[styles.round, themed.round]}> · {data.round} тур</Text>}
        </Text>
        <Button title={isRefreshing ? 'Обновляем…' : 'Обновить'} onPress={refresh} disabled={isRefreshing} />
      </View>

      {updatedAt && <UpdatedAgo since={updatedAt} />}

      <ThemeToggle />

      {error && (
        <View style={[styles.errorBanner, themed.errorBanner]}>
          <Text style={[styles.errorBannerText, themed.errorBannerText]}>Не удалось обновить: {error}</Text>
          <Button title="Повторить" onPress={retry} />
        </View>
      )}

      <SearchInput value={query} onChange={setQuery} placeholder="Поиск по названию клуба" />

      <FilterTabs value={filter} counts={counts} onChange={setFilter} />

      <FlatList
        data={visibleMatches}
        keyExtractor={(match) => match.id}
        renderItem={({ item }) => (
          <MatchCard match={item} isFavorite={isFavorite(item.id)} onToggleFavorite={toggle} />
        )}
        extraData={favorites}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={visibleMatches.length === 0 ? styles.emptyContent : styles.listContent}
        ListEmptyComponent={<Text style={[styles.hint, themed.hint]}>{emptyText}</Text>}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
      />
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}
