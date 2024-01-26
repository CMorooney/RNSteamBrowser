import React, {useEffect, useCallback, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {LibraryStackParamList} from '../../App';

type Props = NativeStackScreenProps<LibraryStackParamList, 'GameDetails'>;
const GameDetails = ({route}: Props) => {
  return <View />;
};

var styles = StyleSheet.create({});

export default GameDetails;
