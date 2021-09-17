import React from 'react';
import PropTypes from 'prop-types';
import {KeyboardAvoidingView} from 'react-native';
import {Button, Input} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';

const UploadForm = ({title, handleSubmit, loading}) => {
  const {uploadErrors, handleInputChange} = useUploadForm();
  return (
    <KeyboardAvoidingView>
      <Input
        autoCapitalize="none"
        placeholder="title"
        onChangeText={(txt) => handleInputChange('title', txt)}
        errorMessage={uploadErrors.title}
      />
      <Input
        autoCapitalize="none"
        placeholder="description"
        onChangeText={(txt) => handleInputChange('description', txt)}
        errorMessage={uploadErrors.description}
      />

      <Button
        raised
        title={title}
        onPress={handleSubmit}
        loading={loading}
        disabled={uploadErrors.title || uploadErrors.description}
      />
    </KeyboardAvoidingView>
  );
};

UploadForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default UploadForm;
