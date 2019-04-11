import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EventScreen from '../screens/EventScreen'
const HomeStack = createSwitchNavigator({
  Home: HomeScreen,
  // Links: LinksScreen,
  // Channels: CreateChannelForm

});

const LinksStack = createSwitchNavigator({
  Links: LinksScreen,



});

const SettingsStack = createSwitchNavigator({
  Settings: SettingsScreen,
});

const EventStack = createSwitchNavigator({
  Events: EventScreen
})

export default createStackNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  EventStack

});
