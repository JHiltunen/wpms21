import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {Card, ListItem, Text, Button, Icon} from 'react-native-elements';
import {ActivityIndicator} from 'react-native-paper';
import {Audio, Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import {formatDate} from '../utils/dateFunctions';

const Single = ({route}) => {
  const {params} = route;
  const {getUserInfo} = useUser();
  const [ownerInfo, setOwnerInfo] = useState({username: ''});
  const [likes, setLikes] = useState([]);
  const [iAmLikingIt, setIAmLikingIt] = useState(false);
  const videoRef = useRef(null);
  const [disabled, setDisabled] = useState(false);

  const getOwnerInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setOwnerInfo(await getUserInfo(params.user_id, token));
    } catch (e) {
      console.log('Error', e.message);
    }
  };
  const getLikes = async () => {
    // TODO: use api hooks to get favourites
    // setLikes()
    // set the value of iAmLikingIt
  };

  useEffect(() => {
    getOwnerInfo();
    getLikes();
  }, []);

  return (
    <Card>
      <ListItem>
        {params.media_type === 'image' && <Icon name="image" type="ionicon" />}
        {params.media_type === 'video' && (
          <Icon name="videocam" type="ionicon" />
        )}
        <ListItem.Content>
          <ListItem.Title>{params.title}</ListItem.Title>
          <ListItem.Subtitle>
            {formatDate(new Date(params.time_added), 'eeee d. MMMM y')}
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            klo {formatDate(new Date(params.time_added), 'HH.mm')}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <Card.Divider />
      {params.media_type === 'image' && (
        <Card.Image
          source={{uri: uploadsUrl + params.filename}}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
      )}
      {params.media_type === 'video' && (
        <TouchableOpacity // usePoster hides video so use this to start it
          disabled={disabled}
          onPress={() => {
            videoRef.current.playAsync();
            setDisabled(true); // disable touchableOpacity when video is started
          }}
        >
          <Video
            ref={videoRef}
            style={styles.image}
            source={{uri: uploadsUrl + params.filename}}
            useNativeControls
            resizeMode="contain"
            usePoster
            posterSource={{uri: uploadsUrl + params.screenshot}}
          />
        </TouchableOpacity>
      )}
      {params.media_type === 'audio' && (
        <>
          <Text>Audio not supported YET.</Text>
          <Audio></Audio>
        </>
      )}
      <Card.Divider />
      <Text style={styles.description}>{params.description}</Text>
      <ListItem>
        <Text>{ownerInfo.username}</Text>
      </ListItem>
      <ListItem>
        {/* TODO: show like or dislike button depending on the current like status,
        calculate like count for a file */}
        {iAmLikingIt ? (
          <Button
            title="Like"
            onPress={() => {
              // use api hooks to POST a favourite
            }}
          />
        ) : (
          <Button
            title="Unlike"
            onPress={() => {
              // use api hooks to DELETE a favourite
            }}
          />
        )}
        <Text>Total likes: {likes.length}</Text>
      </ListItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  description: {
    marginBottom: 10,
  },
});

Single.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Single;
