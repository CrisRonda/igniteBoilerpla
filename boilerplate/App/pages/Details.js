import React from 'react';
import {View, Text} from 'react-native';

const Details = props => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#3d0c32',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 42, fontWeight: 'bold', color: 'white'}}>
        Details
      </Text>
    </View>
  );
};

export default Details;
