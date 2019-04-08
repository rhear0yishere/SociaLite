import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScrollView, StyleSheet, Text,Button } from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Channel',
  };

  render() {

    const { navigation } = this.props;
    const channelId = navigation.getParam('channelId', 'NO-ID');
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <Text>{channelId}HELLO</Text>
    );
  }
}
