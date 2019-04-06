import React from 'react';
import { ScrollView, StyleSheet, Text,Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const email = navigation.getParam('email', 'some default value');
    
    return (
      <ScrollView style={styles.container}>
        <Text>{email}</Text>
        <Button
          title="Go to Home"
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home' })
              ],
            }))
          }}
        />

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


