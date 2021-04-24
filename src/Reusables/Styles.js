import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  button: {
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: 'limegreen'
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
    flex: 1,
    padding: 10,
    maxHeight: 60,
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
  roboto: {
    fontFamily: 'Roboto'
  }
});