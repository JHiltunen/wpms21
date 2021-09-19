import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button, Card} from 'react-native-elements';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {checkToken} = useUser();
  const [registerFormToggle, setRegisterFormToggle] = useState(false);

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('logIn asyncstorage token', userToken);

    if (userToken) {
      try {
        const userInfo = await checkToken(userToken);
        if (userInfo.user_id) {
          setUser(userInfo);
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.log('getToken', e.message);
      }
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      {registerFormToggle ? (
        <Card>
          <Card.Divider />
          <Card.Title h4>Register</Card.Title>
          <RegisterForm navigation={navigation} />
        </Card>
      ) : (
        <Card>
          <Card.Title h4>Login</Card.Title>
          <LoginForm navigation={navigation} />
        </Card>
      )}
      {/* TODO: add link/button & event handler to change state: setRegromtoggle(!regformtoggle);*/}
      <Button
        title={
          registerFormToggle
            ? 'Already registered? Login here.'
            : 'No account? Register here.'
        }
        onPress={() => {
          setRegisterFormToggle(!registerFormToggle);
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
