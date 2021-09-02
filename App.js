import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {ImageBackground, Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import List from './components/List';

const App = () => {
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ImageBackground
            source={{uri: 'https://placekitten.com/300/200'}}
            resizeMode="cover"
            style={styles.image}
            imageStyle={styles.headerImageBackground}
          ></ImageBackground>
          <Text style={styles.kitten_slogan}>Lost and found kittens</Text>
        </View>
        <List />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
  },
  headerImageBackground: {
    borderBottomRightRadius: 50,
  },
  kitten_slogan: {
    width: 200,
    height: 50,
    backgroundColor: 'rgba(42, 215, 250, 0.4)',
    position: 'absolute',
    bottom: '20%',
    left: 0,
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  header: {
    flexBasis: 300,
    position: 'relative',
  },
});

export default App;
