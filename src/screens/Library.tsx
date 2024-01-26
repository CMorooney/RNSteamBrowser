import React, {useEffect, useCallback, useState} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {useAppSelector, useAppDispatch} from '../hooks/reduxHooks';
import {fetchUserLibrary} from '../reducers/libraryReducer';
import {SteamGame, getLastPlayed} from '../models/steamModels';
import {basicTableStyles, BASIC_TABLE_CELL_HEIGHT} from '../styles/shared';
import type {LibraryStackParamList} from '../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<LibraryStackParamList, 'Library'>;
const Library = ({navigation: {navigate}}: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(s => s.library.loading);
  const libraryGames = useAppSelector(s => s.library.games);
  const [displayGames, setDisplayGames] = useState<SteamGame[]>(libraryGames);

  const loadLibrary = useCallback(() => {
    dispatch(fetchUserLibrary());
  }, [dispatch]);

  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  useEffect(() => {
    setDisplayGames(
      [...libraryGames].sort((g: SteamGame, gg: SteamGame) => {
        return g.rtime_last_played > gg.rtime_last_played ? -1 : 1;
      }),
    );
  }, [libraryGames]);

  const itemSelected = useCallback(
    (game: SteamGame) => {
      navigate('GameDetails', {name: game.name});
    },
    [navigate],
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
    <View style={{flex: 1, backgroundColor: '#171a21'}}>
      {libraryGames && (
        <FlatList
          style={{flex: 1}}
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
