import React from 'react';
import { ExpoLinksView } from '@expo/samples';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import ChannelModel from './channelModel'
import { ListItem, SearchBar } from 'react-native-elements';
import PostModel from './postModel'
import { ScrollView, StyleSheet, Text,Button,View,FlatList,TextInput,Modal,TouchableHighlight} from 'react-native';
import EventModel from './eventModel'

import AllChannels from './allChannels'

class EventScreen extends React.Component {
  static navigationOptions = {
    title: 'Events',
  };

  state = {
    allChannels: [],
    clickedEvent: '',
    modalVisible: false,
    modalVisible2: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setModal2Visible(visible) {
    this.setState({modalVisible2: visible});
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
 
    this.fetchData();
  }

  componentWillReceiveProps(){

    this.fetchData();
  
  }


  fetchData(){
    ChannelModel.all().then( (res) => {
      for (i in res.data.channels){
        for (z in res.data.channels[i].events){
          console.log(res.data.channels[i].events[z]._id, "EVENTS")
          if ( res.data.channels[i].events[z]._id == this.props.eventId){
            this.setState ({
              allChannels: res.data.channels[i].events[z]
            })
          }
        }

      }
    
  })
}

editEvent = () => {
  let channel_id = this.props.channelId;
  let event_id = this.props.eventId
  let title = {
    title: this.state.title,
    location: this.state.location
  }

  EventModel.edit (title, channel_id, event_id)
}


createPost = (name) => {
  let newPost = {
    text:this.state.text,  
  }
  let channel_id = this.props.channelId;
  let event_id = this.props.eventId
  PostModel.create(newPost, channel_id,event_id ).then((res) => {
    let posts = this.state.posts;
    let newPosts = posts.push(res.data);
    this.setState({ newPosts})
  })
}



  render() {

   
  
    return (

<ScrollView>

        <View style={{marginTop: 50}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 50}}>
            <View>
                  <TextInput 
                    placeholder="NEW EVENT TITLE"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(title) => this.setState({title})}
                    />

                <Button
                  onPress={
                    () => this.editEvent('editEvent')}
                  title="Submit Event Edit"
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                />

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Done</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Edit Event</Text>
        </TouchableHighlight>
      </View>


      <View style={{marginTop: 20}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible2}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 50}}>
            <View>
            <TextInput 
              placeholder="Post Text"
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

              <TouchableHighlight
                onPress={() => {
                  this.setModal2Visible(!this.state.modalVisible2);
                }}>
                <Text>Done</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
          
        <TouchableHighlight
          onPress={() => {
            this.setModal2Visible(true);
          }}>
          <Text>Create Post</Text>
        </TouchableHighlight>
      </View>

            <AllChannels
              allchannels= {this.state.allChannels.posts}/>
              </ScrollView>
 
    )

            }
             }

export default EventScreen;


