import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScrollView, StyleSheet, Text,Button,View,FlatList,TextInput,Modal,TouchableHighlight} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import EventModel from './eventModel'
import Yelp from './googlePlaces'
import ChannelModel from './channelModel'
import EventScreen from './EventScreen';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Channel',
  };
  
  state ={
    
    allChannels: [],
    clickedChannel:'',
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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


  createEvent = (name) => {
    let newEvent = {
      title:this.state.title,  
      location:this.state.location,
      term: this.state.term
    }
    let channel_id = this.props.channelId;
    EventModel.create(newEvent, channel_id ).then((res) => {
      let events = this.state.events;
      let newEvents = events.push(res.data);
      this.setState({ newEvents })
    })
  }

  deleteChannel=()=>{
    ChannelModel.delete(this.state.clickedChannel)
  }

  componentDidMount(){
    this.fetchData()
  }
  componentWillReceiveProps(){
    this.fetchData()
  }

  

    fetchData(){
  

      ChannelModel.all().then( (res) => {
        for (i in res.data.channels){
          if (res.data.channels[i]._id == this.props.channelId){
            this.setState ({
              allChannels: res.data.channels[i]
            })
          }
          
        }
      })
    }


  render() {
    const { navigation } = this.props;
    // const channelId = navigation.getParam('channelId', 'NO-ID');
    
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
                <Text>WHERES THE DONE BUTTON?</Text>
                <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Done</Text>
              </TouchableHighlight>
                  <EventScreen channelId = {this.props.channelId} eventId= {this.state.eventId}/>

            
            </View>
          </View>
        </Modal>

      </View>


    <Text>{this.props.channelId}</Text>
    <Text>{this.state.allChannels._id} THIS IS WRONG</Text>

  
      <Yelp
      location= {this.state.location}
      term= {this.state.term}
      />


  <View>
 
      <Button
        onPress={this.deleteChannel}
        title="Delete Channel"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
   
        </View>

          <FlatList
          data={this.state.allChannels.events}
          renderItem={({ item }) => (
          <View>
            <ListItem
              title={`${item.title}`}
            
              onPress={() => 
                this.setState({
                  eventId : item._id
              },()=>{
                this.setModalVisible(true);
              })}
            />

          </View>
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
           <TextInput 
              placeholder="term"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(term) => this.setState({term})}
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
