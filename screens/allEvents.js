import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScrollView, StyleSheet, Text,Button,View,FlatList,TextInput} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import EventModel from './eventModel'
import Yelp from './googlePlaces'
import ChannelModel from './channelModel'

class AllEvents extends React.Component {

  state ={
    
    allChannels: [],
    clickedChannel:''
  
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


  


  render() {
      
    
    return (
  <ScrollView>
     

  <View>
       
        </View>

          <FlatList
          data={this.props.data}
          renderItem={({ item }) => (

          <View>
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

        <Image
          style={{width: 66, height: 58}}
          source={{uri: item.image}}
        />


        </View>
          )}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          />   



          </ScrollView>
              );
            }
          }

export default AllEvents;
