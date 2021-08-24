import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {baseUrl} from '../utils/variables';
import ListItem from './ListItem';

const List = (props) => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetch(baseUrl + 'media');
        const mediaWithoutThumbnail = await response.json();
        const allFiles = mediaWithoutThumbnail.map(async (media) => {
          const response = await fetch(baseUrl + 'media/' + media.file_id);
          const file = await response.json();
          return file;
        });
        setMediaArray(await Promise.all(allFiles));
      } catch (e) {
        console.log(e.message);
      }
    };
    loadMedia();
  }, []);
  console.log('List: mediaArray', mediaArray);

  return (
    <FlatList
      data={mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default List;
