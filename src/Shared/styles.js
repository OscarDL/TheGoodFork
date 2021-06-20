import { Platform, StyleSheet } from 'react-native';

import { colors } from './colors';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
  },

  title: {
    fontSize: 24,
    marginTop: 6,
    paddingBottom: 4,
    fontWeight: '700',
    paddingHorizontal: 20,
    color: colors.accentPrimary
  },
  
  button: {
    paddingHorizontal: 12,
    backgroundColor: colors.accentPrimary,
    borderRadius: Platform.OS === 'ios' ? 10 : 5
  },
  
  link: {
    fontSize: 16,
    color: colors.blue,
    textAlign: 'center'
  },
  delete: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.red,
    textAlign: 'center'
  },

  card: {
    padding: 10,
    borderRadius: 6,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'white'
  },
  homeCard: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: Platform.OS === 'ios' ? 10 : 5
  },

  fab: {
    right: 0,
    bottom: 0,
    margin: 16,
    position: 'absolute',
    backgroundColor: colors.accentSecondary
  },

  item: {
    flex: 1,
    margin: 5,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  itemInvisible: {
    color: 'transparent',
    backgroundColor: 'transparent'
  },

  bookingRow: {
    paddingVertical: 4,
    marginHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
    borderBottomColor: colors.accentPrimary
  },

  orderItemRow: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: '#e3e3e3',
    justifyContent: 'space-evenly'
  },
  orderItemButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },

  orderStrip: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  orderDetailsView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderDetailsRow: {
    flexShrink: 1,
    marginRight: 10,
    fontWeight: '400'
  },

  sectionTitle: {
    flex: 1,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionText: {
    flexGrow: 1,
    fontSize: 20,
    color: '#111',
    textAlign: 'center'
  },
  emptySection: {
    padding: 20,
    fontSize: 16,
    width: '100%',
    textAlign: 'center'
  },

  searchBarBg: {
    margin: 10,
    flexShrink: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: Platform.OS === 'ios' ? 10 : 5
  },
  searchBarInput: {
    flex: 1,
    padding: 10,
    color: '#444'
  },
  searchBarCancel: {
    padding: 10,
    fontSize: 16,
    paddingLeft: 0,
    color: colors.blue
  },

  pickerView: {
    height: 45,
    width: '50%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#bbb',
    backgroundColor: 'white'
  },
  pickerInput: {
    height: '100%',
    paddingLeft: 12,
    paddingRight: 36,
    color: colors.text
  },
  pickerIconContainer: {
    height: '100%',
    paddingHorizontal: 6
  },

  iosDateBackdrop: {
    top: 0,
    zIndex: 99,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  iosDateBg: {
    shadowRadius: 4,
    shadowOpacity: 1,
    shadowColor: '#eee',
    backgroundColor: '#eee',
    shadowOffset: {height: -20}
  }
});