import React from 'react';
import { ScrollView, StyleSheet, Text,Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import CreateChannel from "./CreateChannel";

class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {

    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const email = navigation.getParam('email', 'some default value');
    const LoggedIn = navigation.getParam('LoggedIn', 'NO-ID');
   
    return (
      <ScrollView style={styles.container}>
        <Text>{email}</Text>
        <Text>{LoggedIn}</Text>
        <Button
          title="Home"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Home', {
              itemId: 86,
            });
          }}
        />
      <CreateChannel LoggedIn= {LoggedIn}/>

      </ScrollView>
    );
  }
}

export default LinksScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});


