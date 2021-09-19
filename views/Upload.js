import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {Platform, ActivityIndicator, Alert, ScrollView} from 'react-native';
import UploadForm from '../components/UploadForm';
import {Button, Card, Image} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import {useMedia, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import { appID } from '../utils/variables';
const Upload = ({navigation}) => {
  const [image, setImage] = useState(require('../assets/icon.png'));
  // const [type, setType] = useState('');
  const {inputs, handleInputChange, reset, uploadErrors} = useUploadForm();
  const {uploadMedia, loading} = useMedia();
  const {addTag} = useTag();
  const {update, setUpdate} = useContext(MainContext);

  const doUpload = async () => {
    const filename = image.uri.split('/').pop();
    // Infer the type of the image
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append('file', {uri: image.uri, name: filename, type});
    formData.append('title', inputs.title);
    formData.append('description', inputs.description);
    // console.log('doUpload', formData);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await uploadMedia(formData, userToken);
      console.log('doUpload', result);
      const tagResult = await addTag(result.file_id, appID, userToken);
      console.log('doUpload addTag', tagResult);
      if (tagResult.message) {
        Alert.alert(
          'Upload',
          result.message,
          [
            {
              text: 'Ok',
              onPress: () => {
                setUpdate(update + 1);
                doReset();
                navigation.navigate('Home');
              },
            },
          ],
          {cancelable: false}
        );
      }
    } catch (e) {
      console.log('doUpload error', e.message);
    }
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
      // setType(result.type);
    }
  };

  const doReset = () => {
    setImage(null);
    reset();
  };

  return (
    <ScrollView>
      <Card>
        <Image source={image} style={{width: '100%', height: 200}} />
        <Button title="Select media" onPress={pickImage} />
        <UploadForm
          title="Upload"
          handleSubmit={doUpload}
          handleInputChange={handleInputChange}
          loading={loading}
          uploadErrors={uploadErrors}
          image={image}
          inputs={inputs}
        />
        <Card.Divider />
        <Button raised title={'Reset'} onPress={doReset} />
        {loading && <ActivityIndicator />}
      </Card>
    </ScrollView>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Upload;
