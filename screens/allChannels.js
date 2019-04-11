import React from 'react';
import { ExpoLinksView } from '@expo/samples';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import ChannelModel from './channelModel'
import { ListItem, SearchBar } from 'react-native-elements';
import PostModel from './postModel'
import { ScrollView, StyleSheet, Text,Button,View,FlatList,TextInput} from 'react-native';
import EventModel from './eventModel'
import CommentModel from './commentModel.js'


class AllChannels extends React.Component {

state = {
    postId: ''
}
createComment = (name) => {
  let newComment = {
    text:this.state.text,  
  }
  let channel_id = this.props.hi
  let event_id = this.props.event_id
  let post_id = this.state.postId
  CommentModel.create(newComment, channel_id,event_id,post_id ).then((res) => {
    let comments = this.state.comments;
    let newComments = comments.push(res.data);
    this.setState({ newComments})
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
                  <TextInput 
                    placeholder="NEW EVENT TITLE"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({text})}
                    />
                   <Button
                  title="comment"
                  onPress={() => 
                    this.setState({
                      postId: item._id
                    }, ()=>{
                      this.createComment()
                    })
                  }
                />
              </View>
              )}
                /> 
              </ScrollView>
                  );
                }
              }

export default AllChannels;


