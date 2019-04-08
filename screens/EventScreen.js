import React from 'react';
import { ScrollView, StyleSheet, Text,Button,View,FlatList} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import ChannelModel from './channelModel'

class EventScreen extends React.Component {
  static navigationOptions = {
    title: 'Events',
  };

  state = {
    allChannels: [],
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  componentWillMount(){
    const { navigation } = this.props;
    const eventId = navigation.getParam('eventId', 'NO-ID');
    this.setState({
      clickedEvent: ({eventId}.eventId)
    })
  
    this.fetchData();
     }

  componentWillReceiveProps(){
    const { navigation } = this.props;
    const eventId = navigation.getParam('eventId', 'NO-ID');
    this.setState({
      clickedEvent: ({eventId}.eventId)
    })

    this.fetchData();
  
  }


  fetchData(){
    ChannelModel.all().then( (res) => {
      for (i in res.data.channels){
        for (z in res.data.channels[i].events){
          console.log(res.data.channels[i].events[z]._id, "EVENTS")
        }
        

      }
    
  })
}



    // fetchData(){
    //   ChannelModel.all().then( (res) => {
    //     for (i in res.data.channels){
    //       if (res.data.channels[i]._id == this.state.clickedChannel){
    //         this.setState ({
    //           allChannels: res.data.channels[i]
    //         })
    //       }
    //     }
    //   })
    // }

  render() {
    const { navigation } = this.props;
    const eventId = navigation.getParam('eventId', 'NO-ID');
   
    return (
        <View>
            <Text>{eventId}</Text>
        </View>
    );
  }
}

export default EventScreen;


