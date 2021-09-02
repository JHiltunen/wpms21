import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Settings} from 'react-native-feather';
import List from './components/List';

const App = () => {
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <StatusBar animated={true} backgroundColor="#89AAE6" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <Settings stroke="white" width={35} height={35} />
          </View>
          <ImageBackground
            source={{uri: 'https://placekitten.com/300/200'}}
            resizeMode="cover"
            style={styles.image}
            imageStyle={styles.headerImageBackground}
          ></ImageBackground>
          <Text style={styles.kitten_slogan}>Lost and found kittens</Text>
        </View>
        <List style={styles.list} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22232c',
  },
  icon: {
    position: 'absolute',
    margin: 25,
    right: 20,
    top: 15,
    zIndex: 1,
  },
  image: {
    flex: 1,
  },
  header: {
    flexBasis: 300,
    marginBottom: 20,
  },
  headerImageBackground: {
    margin: 20,
    borderRadius: 50,
  },
  kitten_slogan: {
    margin: 20,
    width: 220,
    height: 50,
    backgroundColor: 'rgba(137, 170, 230, 0.7)',
    position: 'absolute',
    bottom: 15,
    left: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 19,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
    fontWeight: 'bold',
    color: '#f4f4f4',
    fontFamily: 'Roboto',
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

export default App;
