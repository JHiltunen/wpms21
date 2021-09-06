import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {ActivityIndicator} from 'react-native';
import {Button, Image} from 'react-native-elements';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <View style={styles.row}>
      <View style={styles.imagebox}>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={styles.textbox}>
        <Text style={styles.listTitle}>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
        <Button
          raised
          onPress={() => {
            navigation.navigate('Single', singleMedia);
          }}
          title="View"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#eee',
    borderRadius: 6,
    flex: 1,
  },

  imagebox: {
    flex: 1,
  },

  image: {
    flex: 1,
    borderRadius: 6,
  },

  textbox: {
    flex: 2,
    padding: 10,
  },

  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default ListItem;
