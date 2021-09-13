import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {KeyboardAvoidingView, Platform} from 'react-native';
import UploadForm from '../components/UploadForm';
import {Button, Image} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';

const Upload = (props) => {
  const [image, setImage] = useState(require('../assets/icon.png'));
  const {inputs, handleInputChange} = useUploadForm();

  const doUpload = () => {
    console.log('do uploads', inputs);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {status} =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage({uri: result.uri});
    }
  };

  return (
    <KeyboardAvoidingView>
      <Image source={image} style={{width: 400, height: 200}} />
      <Button title="Select media" onPress={pickImage} />
      <UploadForm
        title="Upload"
        handleSubmit={doUpload}
        handleInputChange={handleInputChange}
      ></UploadForm>
    </KeyboardAvoidingView>
  );
};

Upload.propTypes = {};

export default Upload;
