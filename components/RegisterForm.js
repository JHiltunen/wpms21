import React from 'react';
import PropTypes from 'prop-types';
import {Alert, KeyboardAvoidingView} from 'react-native';
import {Button, Input} from 'react-native-elements';
import useSignUpForm from '../hooks/RegisterHooks';
import {useUser} from '../hooks/ApiHooks';

const RegisterForm = ({navigation}) => {
  const {inputs, errors, handleInputChange, checkUsername} = useSignUpForm();
  const {register} = useUser();

  const doRegister = async () => {
    const serverResponse = await register(inputs);
    if (serverResponse) {
      Alert.alert(serverResponse.message);
    } else {
      Alert.alert('register failed');
    }
  };

  return (
    <KeyboardAvoidingView>
      <Input
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={(event) => {
          console.log('onEndEditing value', event.nativeEvent.text);
          checkUsername(event.nativeEvent.text);
        }}
        errorMessage={errors.username}
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
