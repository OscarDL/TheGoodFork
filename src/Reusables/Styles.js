import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  button: {
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: 'limegreen'
  },
  title: {
    fontSize: 24,
    paddingBottom: 4,
    fontWeight: '700',
    paddingHorizontal: 20,
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
    borderRadius: 6,
    marginBottom: 10,
    marginHorizontal: 5, 
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  itemInvisible: {
    color: 'transparent',
    backgroundColor: 'transparent'
  },
  roboto: {
    fontFamily: 'Roboto'
  }
});

export {styles};