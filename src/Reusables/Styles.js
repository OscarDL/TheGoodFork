import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 12,
    backgroundColor: 'limegreen',
    borderRadius: Platform.OS === 'ios' ? 8 : 4
  },
  title: {
    fontSize: 24,
    marginTop: 6,
    paddingBottom: 4,
    fontWeight: '700',
    paddingHorizontal: 20,
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
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  fab: {
    right: 0,
    bottom: 0,
    margin: 16,
    position: 'absolute',
    backgroundColor: '#56aadb'
  },
  pickerView: {
    height: 45,
    padding: 1,
    width: '50%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#bbb',
    backgroundColor: 'white'
  },
  item: {
    flex: 1,
    margin: 5,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  itemInvisible: {
    color: 'transparent',
    backgroundColor: 'transparent'
  },
  orderStrip: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    textAlign: 'center'
  },
  emptySection: {
    padding: 10,
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
    color: '#27e',
    paddingLeft: 0
  },
  roboto: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto'
  }
});