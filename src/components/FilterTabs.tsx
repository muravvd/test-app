import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../styles/ThemeProvider';
import { FILTER_LABELS, FILTERS, type MatchFilter } from '../utils/matches';
import { styles, themedStyles } from './styles/FilterTabs.styles';

type Props = {
  value: MatchFilter;
  counts: Record<MatchFilter, number>;
  onChange: (filter: MatchFilter) => void;
};

export function FilterTabs({ value, counts, onChange }: Props) {
  const themed = themedStyles(useTheme().theme);

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
            style={[styles.tab, selected ? themed.tabSelected : themed.tab]}
          >
            <Text style={[styles.label, selected ? themed.labelSelected : themed.label]}>
              {`${FILTER_LABELS[filter]} (${counts[filter]})`}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
