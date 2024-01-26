import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList, Pressable} from 'react-native';
import {useAppSelector, useAppDispatch} from '../hooks/reduxHooks';
import {fetchWishlist} from '../reducers/wishlistReducer';
import {SteamWishlistedGame} from '../models/steamModels';
import {basicTableStyles, BASIC_TABLE_CELL_HEIGHT} from '../styles/shared';
import type {WishlistStackParamList} from '../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<WishlistStackParamList, 'Wishlist'>;
const Wishlist = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(s => s.wishlist.loading);
  const wishlistGames = useAppSelector(s => s.wishlist.games);
  const [displayGames, setDisplayGames] =
    useState<SteamWishlistedGame[]>(wishlistGames);

  const loadWishlist = useCallback(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  useEffect(() => {
    setDisplayGames(
      [...wishlistGames].sort((g, gg) =>
        g.review_score > gg.review_score ? -1 : 1,
      ),
    );
  }, [wishlistGames]);

  const gameSelected = useCallback(
    (game: SteamWishlistedGame) => {
      navigation.navigate('GameDetails', {name: game.name});
    },
    [navigation],
  );

  const renderCell = useCallback(
    ({item}: {item: SteamWishlistedGame}) => (
      <Pressable onPress={() => gameSelected(item)}>
        <View style={basicTableStyles.cellContainer}>
          <View style={basicTableStyles.cellCard}>
            <View style={styles.cellLeftText}>
              <Text
                style={{...basicTableStyles.cellText, ...styles.gameNameText}}>
                {item.name}
              </Text>
              <Text style={styles.reviewDescription}>{item.review_desc}</Text>
            </View>
            <View style={styles.cellRightText}>
              <Text style={styles.tagsText}>
                {item.tags.slice(0, 2).reduce((acc, val) => acc + '\n' + val)}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    ),
    [gameSelected],
  );

  return (
    <View style={{backgroundColor: '#171a21'}}>
      {wishlistGames && (
        <FlatList
          data={displayGames}
          renderItem={renderCell}
          getItemLayout={(_, index) => ({
            length: BASIC_TABLE_CELL_HEIGHT,
            offset: BASIC_TABLE_CELL_HEIGHT * index,
            index,
          })}
          keyExtractor={item => `${item.name}`}
          initialNumToRender={15}
          refreshing={loading}
          onRefresh={loadWishlist}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cellLeftText: {
    display: 'flex',
    width: '50%',
  },
  gameNameText: {
    fontSize: 16,
  },
  reviewDescription: {
    fontSize: 12,
    color: '#66c0f4',
  },
  cellRightText: {},
  tagsText: {
    textAlign: 'right',
    color: '#c7d5e0',
    fontSize: 12,
  },
});

export default Wishlist;
