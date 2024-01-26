import React, {useEffect, useCallback, useState} from 'react';
import {View, Button, Text, FlatList, Pressable} from 'react-native';
import {useAppSelector, useAppDispatch} from '../hooks/reduxHooks';
import {fetchUserLibrary} from '../reducers/libraryReducer';
import {SteamGame, getLastPlayed} from '../models/steamModels';
import {basicTableStyles, BASIC_TABLE_CELL_HEIGHT} from '../styles/shared';
import type {LibraryStackParamList} from '../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<LibraryStackParamList, 'Library'>;
const Library = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(s => s.library.loading);
  const libraryGames = useAppSelector(s => s.library.games);
  const showPlayedGames = useAppSelector(s => s.libraryFilter.showPlayedGames);
  const showUnplayedGames = useAppSelector(
    s => s.libraryFilter.showUnplayedGames,
  );
  const reverseSort = useAppSelector(s => s.libraryFilter.reverseSort);
  const sortBy = useAppSelector(s => s.libraryFilter.sortBy);

  const [displayGames, setDisplayGames] = useState<SteamGame[]>(libraryGames);

  const loadLibrary = useCallback(() => {
    dispatch(fetchUserLibrary());
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="f"
          onPress={() => {
            navigation.navigate('LibraryFilter');
          }}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  useEffect(() => {
    setDisplayGames(
      [...libraryGames]
        .filter(
          g =>
            (g.playtime_forever > 0 && showPlayedGames) ||
            (g.playtime_forever <= 0 && showUnplayedGames),
        )
        .sort((g: SteamGame, gg: SteamGame) => {
          const modifier = reverseSort ? -1 : 1;
          switch (sortBy) {
            case 'last played':
              return (
                (g.rtime_last_played > gg.rtime_last_played ? -1 : 1) * modifier
              );
            case 'name':
              return (g.name > gg.name ? 1 : -1) * modifier;
            case 'playtime':
              return (
                (g.playtime_forever > gg.playtime_forever ? -1 : 1) * modifier
              );
            default:
              return (
                (g.rtime_last_played > gg.rtime_last_played ? -1 : 1) * modifier
              );
          }
        }),
    );
  }, [libraryGames, sortBy, reverseSort, showPlayedGames, showUnplayedGames]);

  const itemSelected = useCallback(
    (game: SteamGame) => {
      navigation.navigate('GameDetails', {name: game.name});
    },
    [navigation],
  );

  const renderCell = useCallback(
    ({item}: {item: SteamGame}) => (
      <Pressable onPress={() => itemSelected(item)}>
        <View style={basicTableStyles.cellContainer}>
          <View style={basicTableStyles.cellCard}>
            <Text style={basicTableStyles.cellText}>{item.name}</Text>
            <View style={basicTableStyles.cellLastPlayedContainer}>
              <Text style={basicTableStyles.cellLastPlayedText}>
                Last Played
              </Text>
              {item.rtime_last_played > 0 && (
                <Text style={basicTableStyles.cellLastPlayedText}>
                  {getLastPlayed(item)}
                </Text>
              )}
              {item.rtime_last_played <= 0 && (
                <Text style={basicTableStyles.cellLastPlayedText}>Never!</Text>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    ),
    [itemSelected],
  );

  return (
    <View style={{backgroundColor: '#171a21'}}>
      {libraryGames && (
        <FlatList
          data={displayGames}
          renderItem={renderCell}
          getItemLayout={(_, index) => ({
            length: BASIC_TABLE_CELL_HEIGHT,
            offset: BASIC_TABLE_CELL_HEIGHT * index,
            index,
          })}
          keyExtractor={item => `${item.appid}`}
          initialNumToRender={15}
          refreshing={loading}
          onRefresh={loadLibrary}
        />
      )}
    </View>
  );
};

export default Library;
