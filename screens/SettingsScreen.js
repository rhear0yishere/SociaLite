import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScrollView, StyleSheet, Text,Button,View,FlatList,TextInput,Modal,TouchableHighlight,Image} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import EventModel from './eventModel'
import Yelp from './googlePlaces'
import ChannelModel from './channelModel'
import EventScreen from './EventScreen';
import axios from 'axios';


class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Channel',
  };
  
  state ={
    
    allChannels: [],
    clickedChannel:'',
    modalVisible: false,
    modalVisible2: false,
    searchData: []
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setModalVisible2(visible) {
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


  createEvent = (name) => {
    let newEvent = {
      title:this.state.title,  
      location:this.state.location,
      term: this.state.term,
      image: this.state.image
    }
    let channel_id = this.props.channelId;
    EventModel.create(newEvent, channel_id ).then((res) => {
      let events = this.state.events;
      let newEvents = events.push(res.data);
      this.setState({ newEvents })
    })
    this.fetchData()
  }

  deleteChannel=()=>{
    ChannelModel.delete(this.props.channelId)
  
  }

  componentDidMount(){
    this.fetchData()
  }
  componentWillReceiveProps(){
    this.fetchData()
  }

  searchYelp(){
    const config = {
      headers: {'Authorization': 'Bearer iHpi2TtumFKHMqHI10EIrlBQQMOlx13iiicob9kJ7kGBle8lYdHXeuNHbsM1O2qGw-Ow1odGrThCgktT94QgtewS07vy-a-ia-hHT55Nhc5xYilvPjy1zN_IXoetXHYx'},
      params: {
        term: this.state.term,
        location: this.state.location
      }
    }
  axios.get('https://api.yelp.com/v3/businesses/search', config)
  .then(response => 
    this.setState({
      searchData: response.data.businesses
    },()=>{
      console.log(this.state.searchData)
    }));
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


<Button
        onPress={this.deleteChannel}
        title="Delete This Channel"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
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
            <ScrollView>

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
            onPress={() => this.searchYelp('searchYelp')   
          }
            title="Search on Yelp"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        <Button
            onPress={() => this.createEvent('submitEvent')}
            title="Submit Event"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          

<TouchableHighlight
                onPress={() => {
                  this.setModalVisible2(!this.state.modalVisible2);
                }}>
                <Text>Done</Text>
              </TouchableHighlight>
        <FlatList
          data={this.state.searchData}

          renderItem={({ item }) => (
        
            <View>
              
                <ListItem
              // title={`${item._id}`}
              title={`${item.name}`}
            /> 
          
          <Text>{item.location.display_address[0]}</Text>
          <Text>{item.location.display_address[1]}</Text>

          <Image
          style={{width: 66, height: 58}}
          source={{uri: item.image_url}}
        />

        <Button
        title= "Add" 
        onPress={() => this.setState({
          title: item.name,
          location: item.location.display_address[0],
          image: item.image_url
        }, ()=>{
          this.createEvent('submitEvent')
        })}        
        />

          </View>
            
          )}
      
        />    
            </ScrollView>


            </View>
          </View>
        </Modal>
          
        <Button
        onPress={() => {
          this.setModalVisible2(true);
        }}

        title= "Submit New Event"
        
        
        />
          
         
      </View>


  <View>
 
   
        </View>

  
        <Text>Events</Text>

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
            <Image
            style={{width: 100, height: 100}}
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

export default SettingsScreen;
