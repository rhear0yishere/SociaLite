import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CreateChannelForm from '../screens/CreateChannelForm';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Links: LinksScreen,
  Channels: CreateChannelForm

});

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});


export default createSwitchNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,

});
