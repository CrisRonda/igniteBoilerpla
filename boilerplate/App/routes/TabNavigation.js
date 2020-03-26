import React from 'react';
import Home from '../pages/Home';
import Details from '../pages/Details';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Modal from '../pages/Modal';
import Map from '../pages/Map';
const MainTab = createBottomTabNavigator();

const MainStackScreen = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Home" component={Home} />
      <MainTab.Screen name="Details" component={Details} />
      <MainTab.Screen name="Modal" component={Modal} />
      <MainTab.Screen name="Map" component={Map} />
    </MainTab.Navigator>
  );
};
export default MainStackScreen;
