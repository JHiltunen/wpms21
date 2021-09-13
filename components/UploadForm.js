import React from 'react';
import PropTypes from 'prop-types';
import {KeyboardAvoidingView} from 'react-native';
import {Button, Input} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';

const UploadForm = ({title, handleSubmit, handleInputChange}) => {
  return (
    <KeyboardAvoidingView>
      <Input
        autoCapitalize="none"
        placeholder="title"
        onChangeText={(txt) => handleInputChange('title', txt)}
      />
      <Input
        autoCapitalize="none"
        placeholder="description"
        onChangeText={(txt) => handleInputChange('description', txt)}
      />

      <Button raised title={title} onPress={handleSubmit} />
    </KeyboardAvoidingView>
  );
};

UploadForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default UploadForm;
