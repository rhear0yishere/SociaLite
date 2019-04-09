import React from 'react';
import { ScrollView, StyleSheet, Text,Button,View,FlatList} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import ChannelModel from './channelModel'
import { ListItem, SearchBar } from 'react-native-elements';

class EventScreen extends React.Component {
  static navigationOptions = {
    title: 'Events',
  };

  state = {
    allChannels: [],
    clickedEvent: ''
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
          if ( res.data.channels[i].events[z]._id == this.state.clickedEvent){
            this.setState ({
              allChannels: res.data.channels[i].events[z]
            })
          }
        }

      }
    
  })
}


  render() {
  
    return (
      <ScrollView>
      <View>
        {/* <Text>{this.state.clickedChannel} Clicked Channel</Text>   */}
        <Text>{this.state.allChannels._id} :)</Text>  
            </View>
    
              <FlatList
              data={this.state.allChannels.posts}
              renderItem={({ item }) => (
                <ListItem
                  title={`${item.text}`}
                />
              )}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              />   
              </ScrollView>
                  );
                }
              }

export default EventScreen;


