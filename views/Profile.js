import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Image, SafeAreaView, StyleSheet, Text} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';

const Profile = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('https://placekitten.com/400/400');

  const {getFilesByTag} = useTag();

  useEffect(() => {
    (async () => {
      try {
        const file = await getFilesByTag('avatar_' + user.user_id);
        setAvatar(uploadsUrl + file.pop().filename);
      } catch (e) {
        console.log('error', e.message);
      }
    })();
  }, [user]);

  const logout = async () => {
    setIsLoggedIn(false);
    AsyncStorage.clear();
    if (!isLoggedIn) {
      // this is to make sure isLoggedIn has changed, will be removed later
      navigation.navigate('Login');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Image source={{uri: avatar}} style={{width: 300, height: 300}} />
      <Text>Username: {user.username}</Text>
      <Text>Full name: {user.full_name}</Text>
      <Text>Email: {user.email}</Text>
      <Button title={'Logout'} onPress={logout} />
      <Button
        title={'My Files'}
        onPress={() => {
          navigation.navigate('My Files');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
