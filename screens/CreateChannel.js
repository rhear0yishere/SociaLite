import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';
import CreateChannelForm from './CreateChannelForm'

class CreateChannel extends React.Component {
//   static navigationOptions = {
//     title: 'Links',
//   };

state ={
  displayForm: false,
  email: this.props.email
}

onButtonPress = () => {
  this.setState({
   displayForm: true
  });
}


  render() {

    if (this.props.LoggedIn){
      return (
        <ScrollView style={styles.container}>
        <Button
            onPress={this.onButtonPress}
            title="View Channels"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <CreateChannelForm displayForm= {this.state.displayForm} email= {this.state.email} nav= {this.props.nav}/>
        </ScrollView>
      );

    } 
  else{
      return(
        <ScrollView style={styles.container}>
        <Text>Log In to Create A Channel</Text>
      </ScrollView>
      )
    }


   

  }
}

export default CreateChannel;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});


