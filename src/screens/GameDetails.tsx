import React, {useEffect, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  View,
  Text,
} from 'react-native';
import {useAppSelector, useAppDispatch} from '../hooks/reduxHooks';
import {queryGame} from '../reducers/gameDetailsReducer';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {LibraryStackParamList} from '../../App';

type Props = NativeStackScreenProps<LibraryStackParamList, 'GameDetails'>;
const GameDetails = ({
  route: {
    params: {name},
  },
}: Props) => {
  const dispatch = useAppDispatch();
  const apiCallLoading = useAppSelector(s => s.gameDetails.loading);
  const gameDetails = useAppSelector(s => s.gameDetails.game);

  const loading = useMemo(
    () => apiCallLoading || gameDetails?.name !== name,
    [apiCallLoading, name, gameDetails],
  );
  const loadGameDetails = useCallback(() => {
    dispatch(queryGame(name));
  }, [dispatch, name]);

  useEffect(() => {
    loadGameDetails();
  }, [loadGameDetails]);
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTextContentContainer}>
            <Text style={styles.gameNameHeaderText}>{name}</Text>
            {!loading && (
              <>
                <Text style={styles.gameRatingHeaderText}>
                  {gameDetails.rating_top === 0
                    ? 'not rated'
                    : `${gameDetails.rating}/${gameDetails.rating_top}`}
                </Text>
                <Text style={styles.headerSubHeader}>Developers:</Text>
                <Text style={styles.headerSubList}>
                  {gameDetails.developers
                    .map(p => p.name)
                    .reduce((acc, val) => acc + '\n' + val)}
                </Text>
                <Text style={styles.headerSubHeader}>Platforms:</Text>
                <Text style={styles.headerSubList}>
                  {gameDetails.platforms
                    .map(p => p.platform.name)
                    .reduce((acc, val) => acc + '\n' + val)}
                </Text>
                <Text style={styles.headerReleaseDateText}>{`Released: ${
                  gameDetails.released ?? 'unknown'
                }`}</Text>
              </>
            )}
          </View>
          {loading && <ActivityIndicator style={{marginRight: '20%'}} />}
          {!loading && (
            <Image
              style={styles.headerImage}
              source={{uri: gameDetails.background_image}}
            />
          )}
        </View>
        {!loading && (
          <Text style={styles.gameDescription}>
            {gameDetails.description_raw}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

var styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#171a21',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#171a21',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
  },
  headerTextContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingRight: 10,
    maxWidth: '60%',
  },
  gameNameHeaderText: {
    marginTop: 16,
    fontSize: 35,
    color: '#c7d5e0',
    fontWeight: 'bold',
  },
  gameRatingHeaderText: {
    fontSize: 18,
    color: '#66c0f4',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  headerSubHeader: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#c7d5e0',
  },
  headerSubList: {
    color: '#66c0f4',
    fontSize: 10,
  },
  headerReleaseDateText: {
    marginTop: 10,
    color: '#c7d5e0',
    fontSize: 10,
  },
  headerImage: {
    width: '50%',
    height: 250,
  },
  gameDescription: {
    padding: 16,
    color: '#c7d5e0',
  },
});

export default GameDetails;
