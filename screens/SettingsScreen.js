import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScrollView, StyleSheet, Text,Button,View,FlatList,TextInput} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import EventModel from './eventModel'

import ChannelModel from './channelModel'

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Channel',
  };
  
  state ={
    
    allChannels: [],
    clickedChannel:''
    
  }

  // ()=>{
  //   const { navigation } = this.props;
  //   const channelId = navigation.getParam('channelId', 'NO-ID');
  //   return({channelId}.channelId)
  // }
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


  createEvent = (name) => {
    let newEvent = {
      title:this.state.title,  
      location:this.state.location
    }
    let channel_id = this.state.clickedChannel;
    EventModel.create(newEvent, channel_id ).then((res) => {
      let events = this.state.events;
      let newEvents = events.push(res.data);
      this.setState({ newEvents })
    })
  }

  componentWillMount(){
    const { navigation } = this.props;
    const channelId = navigation.getParam('channelId', 'NO-ID');
    this.setState({
      clickedChannel: ({channelId}.channelId)
    })
  
    this.fetchData();
     }

  componentWillReceiveProps(){
    const { navigation } = this.props;
    const channelId = navigation.getParam('channelId', 'NO-ID');
    this.setState({
      clickedChannel: ({channelId}.channelId)
    })

    this.fetchData();
  
  }

  
    fetchData(){
      ChannelModel.all().then( (res) => {
        for (i in res.data.channels){
          if (res.data.channels[i]._id == this.state.clickedChannel){
            this.setState ({
              allChannels: res.data.channels[i]
            })
          }
        }
      })
    }


  render() {
      
    
    return (
  <ScrollView>
  <View>
    <Text>{this.state.clickedChannel} Clicked Channel</Text>  
    <Text>{this.state.allChannels._id} :)</Text>  
        </View>

          <FlatList
          data={this.state.allChannels.events}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.title}`}
            
              onPress={() => 

                this.setState({
                  eventId : item._id
              }, () => {
                this.props.navigation.navigate('Events', {
                  eventId: this.state.eventId,
                  channelId: this.state.clickedChannel
              })
              console.log(this.state.eventId, "EVENT ID");
                })}

            />
          )}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          />   



<TextInput 
              placeholder="Event Title"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(title) => this.setState({title})}
              />
          <TextInput 
              placeholder="location"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(location) => this.setState({location})}
              />
        <Button
            onPress={() => this.createEvent('submitEvent')}
            title="Submit Event"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          </ScrollView>
              );
            }
          }

export default SettingsScreen;
