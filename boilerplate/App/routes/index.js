import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainStackScreen from './TabNavigation';
const RootStack = createStackNavigator();

const RootNavigation = () => {
  return (
    <RootStack.Navigator mode="modal" headerMode="none">
      <RootStack.Screen name="Main" component={MainStackScreen} />
    </RootStack.Navigator>
  );
};

export default RootNavigation;
