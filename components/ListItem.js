import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ListItem = ({singleMedia}) => {
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.imagebox}>
        <Image
          style={styles.image}
          source={{uri: singleMedia.thumbnails.w160}}
        />
      </View>
      <View style={styles.textbox}>
        <Text style={styles.listTitle}>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    margin: 20,
    padding: 15,
    marginBottom: 5,
    borderRadius: 20,
    flex: 1,
    backgroundColor: '#89AAE6',
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
};

export default ListItem;
