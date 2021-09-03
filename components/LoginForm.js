import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {useLogin} from '../hooks/ApiHooks';
import {Button, View} from 'react-native';
import FormTextInput from './FormTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useLoginForm from '../hooks/LoginHooks';

const LoginForm = ({navigation}) => {
  const {setUser, setIsLoggedIn} = useContext(MainContext);
  const {login} = useLogin();

  const doLogin = async () => {
    try {
      const loginInfo = await login(JSON.stringify(inputs));
      console.log('doLogin response', loginInfo);
      await AsyncStorage.setItem('userToken', loginInfo.token);
      // TODO: Save user info (loginInfo.user) to MainContext
      setUser(loginInfo.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('doLogin error', error);
    }
    // navigation.navigate('Home');
  };

  const {inputs, handleInputChange} = useLoginForm();

  return (
    <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />

      <Button title="Login!" onPress={doLogin} />
    </View>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginForm;