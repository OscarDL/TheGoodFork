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
  roboto: {
    fontFamily: 'Roboto'
  }
});

export {styles};