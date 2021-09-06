import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, StyleSheet} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {format} from 'date-fns';
import {Text, Image} from 'react-native-elements';
import {ActivityIndicator} from 'react-native-paper';

const Single = ({route}) => {
  const {params} = route;
  console.log('Single', route.params);
  return (
    <SafeAreaView style={styles.container}>
      <Text>User who created post: {params.user_id}</Text>
      <Text>
        Date added: {format(new Date(params.time_added), 'dd.MMMM.yyyy')}
      </Text>
      <Image
        style={{width: 350, height: 350}}
        source={{uri: uploadsUrl + params.filename}}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text h3>{params.title}</Text>
      <Text>{params.description}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Single.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Single;
