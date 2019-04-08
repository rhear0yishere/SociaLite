import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScrollView, StyleSheet, Text,Button,View,FlatList} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';

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
                  eventId: this.state.eventId
              })
              console.log(this.state.eventId, "EVENT ID");
                })}






            />
          )}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          />   
          </ScrollView>
              );
            }
          }

export default SettingsScreen;
