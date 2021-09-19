import React from 'react';
import PropTypes from 'prop-types';
import {KeyboardAvoidingView} from 'react-native';
import {Button, Input} from 'react-native-elements';

const UploadForm = ({
  title,
  handleSubmit,
  handleInputChange,
  uploadErrors,
  loading,
}) => {
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
        disabled={
          uploadErrors.title !== null || uploadErrors.description !== null
        }
      />
    </KeyboardAvoidingView>
  );
};

UploadForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  uploadErrors: PropTypes.object.isRequired,
};

export default UploadForm;
