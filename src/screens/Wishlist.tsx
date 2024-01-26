import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useAppSelector, useAppDispatch} from '../hooks/reduxHooks';
import {fetchWishlist} from '../reducers/wishlistReducer';
import {SteamWishlistedGame} from '../models/steamModels';
import {basicTableStyles, BASIC_TABLE_CELL_HEIGHT} from '../styles/shared';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(s => s.wishlist.loading);
  const wishlistGames = useAppSelector(s => s.wishlist.games);
  const [displayGames, setDisplayGames] =
    useState<SteamWishlistedGame[]>(wishlistGames);

  const loadLibrary = useCallback(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  useEffect(() => {
    setDisplayGames(
      [...wishlistGames].sort((g, gg) =>
        g.review_score > gg.review_score ? -1 : 1,
      ),
    );
  }, [wishlistGames]);

  const renderCell = useCallback(
    ({item}: {item: SteamWishlistedGame}) => (
      <View style={basicTableStyles.cellContainer}>
        <View style={basicTableStyles.cellCard}>
          <Text style={basicTableStyles.cellText}>{item.name}</Text>
        </View>
      </View>
    ),
    [],
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
          onRefresh={loadLibrary}
        />
      )}
    </View>
  );
};

export default Wishlist;
