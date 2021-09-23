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
  image,
  inputs,
}) => {
  return (
    <KeyboardAvoidingView>
      <Input
        autoCapitalize="none"
        placeholder="title"
        onChangeText={(txt) => handleInputChange('title', txt)}
        errorMessage={uploadErrors.title}
        value={inputs.title}
      />
      <Input
        autoCapitalize="none"
        placeholder="description"
        multiline={true}
        onChangeText={(txt) => handleInputChange('description', txt)}
        errorMessage={uploadErrors.description}
        value={inputs.description}
      />

      <Button
        raised
        title={title}
        onPress={handleSubmit}
        loading={loading}
        disabled={
          uploadErrors.title !== null ||
          uploadErrors.description !== null ||
          image === null
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
  image: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
      headers: PropTypes.objectOf(PropTypes.string),
    }),
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.shape({
        uri: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        headers: PropTypes.objectOf(PropTypes.string),
      })
    ),
  ]),
  inputs: PropTypes.object.isRequired,
};

export default UploadForm;
