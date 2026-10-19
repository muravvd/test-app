import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FILTER_LABELS, FILTERS, type MatchFilter } from '../utils/matches';

type Props = {
  value: MatchFilter;
  counts: Record<MatchFilter, number>;
  onChange: (filter: MatchFilter) => void;
};

export function FilterTabs({ value, counts, onChange }: Props) {
  return (
    <View style={styles.row} accessibilityRole="tablist">
      {FILTERS.map((filter) => {
        const selected = filter === value;
        return (
          <Pressable
            key={filter}
            onPress={() => onChange(filter)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            style={[styles.tab, selected && styles.tabSelected]}
          >
            <Text style={[styles.label, selected && styles.labelSelected]}>
              {`${FILTER_LABELS[filter]} (${counts[filter]})`}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#f3f4f6',
  },
  tabSelected: {
    backgroundColor: '#111827',
  },
  label: {
    fontSize: 14,
    color: '#111827',
  },
  labelSelected: {
    color: '#fff',
  },
});
