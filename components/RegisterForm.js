import React from 'react';
import PropTypes from 'prop-types';
import {Alert, KeyboardAvoidingView} from 'react-native';
import {Button, Input} from 'react-native-elements';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {useUser} from '../hooks/ApiHooks';

const RegisterForm = ({navigation}) => {
  const doRegister = async () => {
    const {register} = useUser();
    const serverResponse = await register(inputs);
    if (serverResponse) {
      Alert.alert(serverResponse.message);
    } else {
      Alert.alert('register failed');
    }
  };

  const {inputs, handleInputChange} = useSignUpForm(); // makes inputs and handleInput change visible from RegisterHooks.js

  return (
    <KeyboardAvoidingView>
      <Input
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <Input
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Input
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <Input
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button raised title="Register!" onPress={doRegister} />
    </KeyboardAvoidingView>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default RegisterForm;
