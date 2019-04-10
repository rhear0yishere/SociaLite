import React from 'react';
import { ExpoLinksView } from '@expo/samples';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import ChannelModel from './channelModel'
import { ListItem, SearchBar } from 'react-native-elements';
import PostModel from './postModel'
import { ScrollView, StyleSheet, Text,Button,View,FlatList,TextInput} from 'react-native';
import EventModel from './eventModel'


class AllChannels extends React.Component {

state = {
    changed: true
}

  // renderSeparator = () => {
  //   return (
  //     // <View
  //     //   style={{
  //     //     height: 1,
  //     //     width: '86%',
  //     //     backgroundColor: '#CED0CE',
  //     //     marginLeft: '14%',
  //     //   }}
  //     // />
  //     <Button
  //     // onPress={this.log}
  //     title="Comment"
  //     color="#841584"
  //     accessibilityLabel="Learn more about this purple button"
  //   />
  //   );
  // };

  // log(){
  //   console.log(item._id, "ITEM ID 2")
  // }

componentDidMount(){
    this.setState({
        changed:true
    })
}
componentWillReceiveProps(){
    this.setState({
        changed:false
    })
}
  render() {

    console.log(this.props.allchannels, "PROPS")
   
  
    return (
      <ScrollView>
      
      <View>
            </View>
    
              <FlatList
              data={this.props.allchannels}
              renderItem={({ item }) => (
              <View>
                <ListItem
                  title={`${item.text}`}
                 
                  
                />
                   <Button
                  title="comment"
                  onPress={() => 
                    console.log(item._id, "ITEM ID")
                  }
                />
              </View>
              )}
              
              // ItemSeparatorComponent={this.renderSeparator}
              /> 


              </ScrollView>
                  );
                }
              }

export default AllChannels;


