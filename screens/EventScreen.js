import React from 'react';
import { ExpoLinksView } from '@expo/samples';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import ChannelModel from './channelModel'
import { ListItem, SearchBar } from 'react-native-elements';
import PostModel from './postModel'
import { ScrollView, StyleSheet, Text,Button,View,FlatList,TextInput} from 'react-native';


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
    const channelId = navigation.getParam('channelId', 'NO-ID');
    console.log({channelId}, "CHANNEL ID")

    this.setState({
      clickedEvent: ({eventId}.eventId),
      clickedChannel: {channelId}.channelId
      // clickedChannel: "5cac3bce84430c41603724de"
    })
  
    this.fetchData();
     }

  componentWillReceiveProps(){
    const { navigation } = this.props;
    const eventId = navigation.getParam('eventId', 'NO-ID');
    const channelId = navigation.getParam('channelId', 'NO-ID');
    console.log({channelId}, "CHANNEL ID")

    this.setState({
      clickedEvent: ({eventId}.eventId),
      clickedChannel: {channelId}.channelId
      // clickedChannel: "5cac3bce84430c41603724de"

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



createPost = (name) => {
  let newPost = {
    text:this.state.text,  
  }
  let channel_id = this.state.clickedChannel;
  let event_id = this.state.clickedEvent
  PostModel.create(newPost, channel_id,event_id ).then((res) => {
    let posts = this.state.posts;
    let newPosts = posts.push(res.data);
    this.setState({ newPosts})
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




          <TextInput 
              placeholder="Event Title"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({text})}
              />

        <Button
            onPress={() => this.createPost('submitPost')}
            title="Submit Post"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />


              </ScrollView>
                  );
                }
              }

export default EventScreen;


