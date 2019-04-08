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
    allChannels: []
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

  componentDidMount(){
    this.fetchData();
  
   }
  
    fetchData(){
      ChannelModel.all().then( (res) => {
        this.setState ({
          allChannels: res.data.channels[0]
        })

        console.log(this.state.allChannels.name,"!!!!!!!!!!!!!!!")
      })

  
    }

  render() {


    const { navigation } = this.props;
    const channelId = navigation.getParam('channelId', 'NO-ID');

    return (
  
      // <Text>
      //   { this.state.allChannels.name}
      //   </Text>

          <FlatList
          data={this.state.allChannels.events}
          renderItem={({ item }) => (
            <ListItem
              // title={`${item._id}`}
              title={`${item.name}`}
            />
          )}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          />   
              );
            }
          }

export default SettingsScreen;
