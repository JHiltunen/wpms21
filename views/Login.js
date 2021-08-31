import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn} = useContext(MainContext);
  console.log('Login isLoggedIn', isLoggedIn);

  const logIn = async () => {
    await AsyncStorage.setItem('userToken', 'valid token value');
    setIsLoggedIn(true);
    //navigation.navigate('Home');
  };

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('logIn asyncstorage token', userToken);

    if (userToken === 'valid token value') {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
