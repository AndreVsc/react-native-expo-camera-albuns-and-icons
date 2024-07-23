import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    flexDirection:'row',
    alignContent:'center',
    justifyContent:'center',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  buttonContainerBack:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  buttonBack:{
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    margin:30,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  photoButtons:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'flex-end',
    margin:10,
    gap:20,
  }
});
