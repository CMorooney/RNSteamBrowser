import React, {useCallback, memo} from 'react';
import {StyleSheet, Pressable, Text, View, Switch} from 'react-native';
import {useAppSelector, useAppDispatch} from '../hooks/reduxHooks';
import {
  setShowPlayedGames,
  setShowUnplayedGames,
  setReverseSort,
  setSortBy,
} from '../reducers/libraryFilterReducer';

const LibraryFilter = () => {
  const dispatch = useAppDispatch();
  const showPlayedGames = useAppSelector(s => s.libraryFilter.showPlayedGames);
  const showUnplayedGames = useAppSelector(
    s => s.libraryFilter.showUnplayedGames,
  );
  const reverseSort = useAppSelector(s => s.libraryFilter.reverseSort);
  const sortBy = useAppSelector(s => s.libraryFilter.sortBy);

  const setShowPlayedGamesInternal = useCallback(
    (newValue: boolean) => {
      dispatch(setShowPlayedGames(newValue));
    },
    [dispatch],
  );

  const setShowUnplayedGamesInternal = useCallback(
    (newValue: boolean) => {
      dispatch(setShowUnplayedGames(newValue));
    },
    [dispatch],
  );

  const setReverseSortInternal = useCallback(
    (newValue: boolean) => {
      dispatch(setReverseSort(newValue));
    },
    [dispatch],
  );

  const setSortByInternal = useCallback(
    (newValue: 'last played' | 'playtime' | 'name') => {
      dispatch(setSortBy(newValue));
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <SwitchControlContainer
        label={'Show Played Games'}
        enabled={showPlayedGames}
        onChange={setShowPlayedGamesInternal}
      />
      <SwitchControlContainer
        label={'Show Unplayed Games'}
        enabled={showUnplayedGames}
        onChange={setShowUnplayedGamesInternal}
      />
      <Text style={styles.sortByHeader}>Sort By:</Text>
      <View style={styles.sortByContainer}>
        <SortByOptionContainer
          name="Last Played"
          selected={sortBy === 'last played'}
          setSelected={setSortByInternal}
        />
        <SortByOptionContainer
          name="Name"
          selected={sortBy === 'name'}
          setSelected={setSortByInternal}
        />
        <SortByOptionContainer
          name="Playtime"
          selected={sortBy === 'playtime'}
          setSelected={setSortByInternal}
        />
      </View>
      <SwitchControlContainer
        label={'Reverse Sort'}
        enabled={reverseSort}
        onChange={setReverseSortInternal}
      />
    </View>
  );
};

const SwitchControlContainer = memo(
  ({
    label,
    enabled,
    onChange,
  }: {
    label: string;
    enabled: boolean;
    onChange: (newValue: boolean) => void;
  }) => {
    return (
      <View style={styles.switchControlContainer}>
        <Text style={styles.switchLabel}>{label}</Text>
        <Switch value={enabled} onValueChange={onChange} />
      </View>
    );
  },
);

const SortByOptionContainer = memo(
  ({
    name,
    selected,
    setSelected,
  }: {
    name: 'Name' | 'Last Played' | 'Playtime';
    selected: boolean;
    setSelected: (newValue: 'name' | 'last played' | 'playtime') => void;
  }) => {
    return (
      <Pressable
        onPress={() => setSelected(name.toLowerCase())}
        style={selected ? styles.sortByOptionSelected : styles.sortByOption}>
        <Text
          style={
            selected ? styles.sortByOptionTextSelected : styles.sortByOptionText
          }>
          {name}
        </Text>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    backgroundColor: '#171a21',
  },
  switchControlContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  switchLabel: {
    color: '#c7d5e0',
    fontWeight: 'bold',
    fontSize: 15,
  },
  sortByHeader: {
    marginTop: 30,
    color: '#c7d5e0',
    fontWeight: 'bold',
    fontSize: 18,
  },
  sortByContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 50,
  },
  sortByOption: {
    flex: 1,
    padding: 5,
    borderColor: '#c7d5e0',
    borderWidth: 1,
    borderRadius: 5,
  },
  sortByOptionSelected: {
    flex: 1,
    padding: 5,
    borderColor: '#66c0f4',
    borderWidth: 1,
    borderRadius: 5,
  },
  sortByOptionText: {
    color: '#c7d5e0',
    textAlign: 'center',
  },
  sortByOptionTextSelected: {
    color: '#66c0f4',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LibraryFilter;
