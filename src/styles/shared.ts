import {StyleSheet} from 'react-native';

export const BASIC_TABLE_CELL_HEIGHT = 65;
export const basicTableStyles = StyleSheet.create({
  cellContainer: {
    height: BASIC_TABLE_CELL_HEIGHT,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  cellCard: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#1b2838',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#66c0f4',
  },
  cellText: {
    color: '#c7d5e0',
    fontWeight: 'bold',
    fontSize: 18,
    maxWidth: '75%',
  },
  cellLastPlayedContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  cellLastPlayedText: {
    color: '#c7d5e0',
    textAlign: 'right',
  },
});
