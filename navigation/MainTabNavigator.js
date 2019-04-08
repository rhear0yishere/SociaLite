import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CreateChannelForm from '../screens/CreateChannelForm';

const HomeStack = createSwitchNavigator({
  Home: HomeScreen,
  // Links: LinksScreen,
  // Channels: CreateChannelForm

});

const LinksStack = createBottomTabNavigator({
  Links: LinksScreen,
  Settings: SettingsScreen,


});

const SettingsStack = createSwitchNavigator({
  Settings: SettingsScreen,
});


export default createStackNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,

});
