import React from 'react';
import { ExpoConfigView } from '@expo/samples';

import DateTimePicker from 'react-native-modal-datetime-picker';

import { ScrollView, StyleSheet, Text,Button,View,FlatList,TextInput,Modal,TouchableHighlight,Image,TouchableOpacity} from 'react-native';
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
    searchData: [],
    isDateTimePickerVisible: false,
    pickedDate: [],
   
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




  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 
  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    let picked= JSON.stringify(date).split("T")[0]
    this.setState({
      pickedDate: picked
    }, ()=>{
     
     console.log(this.state.pickedDate)
     this._hideDateTimePicker();
    })
    
  };

  createEvent = (name) => {
    let newEvent = {
      title:this.state.title,  
      location:this.state.location,
      term: this.state.term,
      image: this.state.image,
      time: '',
      date:this.state.pickedDate
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
  




  createAndClose(){
    this.createEvent()
    this.setModalVisible2(!this.state.modalVisible2)

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
    const { selectedHours, selectedMinutes } = this.state;

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
                style={[styles.buttonContainer, styles.loginButton]}
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

            <View style={{ flex: 1 }}>
        <TouchableOpacity  style={[styles.buttonContainer, styles.loginButton]} onPress={this._showDateTimePicker}>
          <Text>Pick a Date</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />

        <Text>{this.state.pickedDate}</Text>
      </View>

            <TextInput 
            style={styles.inputs}
              placeholder="Event Title"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(title) => this.setState({title})}
              />
          <TextInput 
          style={styles.inputs}
              placeholder="location"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(location) => this.setState({location})}
              />
           <TextInput 
           style={styles.inputs}
              placeholder="term"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(term) => this.setState({term})}
            />
            
              <TouchableHighlight
                style={[styles.buttonContainer, styles.yelpButton]}
                onPress={() => this.searchYelp('searchYelp')   
              }>
                <Text>Search on Yelp</Text>
              </TouchableHighlight>




        <Button
            onPress={() => 
            this.createAndClose()}
            title="Submit Event"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
           
          />


  <TouchableHighlight
        style={[styles.buttonContainer, styles.cancelButton]}
                onPress={() => {
                  this.setModalVisible2(!this.state.modalVisible2);
                }}>
    <Text
    style={ styles.cancelText}> Cancel </Text>
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


        <TouchableHighlight
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={() => {
          this.setModalVisible2(true);
        }}>
                <Text>Submit New Event</Text>
              </TouchableHighlight>


      
          
         
      </View>


  <View>
 
   
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
            

            <ListItem
            
              title={`Date: ${item.date}`}
              onPress={() => 
                this.setState({
                  eventId : item._id
              },()=>{
                this.setModalVisible(true);
              })}
            />

          <ListItem
            
            title={`Address: ${item.location}`}
            onPress={() => 
              this.setState({
                eventId : item._id
            },()=>{
              this.setModalVisible(true);
            })}
        
          />

            <Image
            style={{marginLeft: 90, width: 200, height: 200}}
            source={{uri: item.image}}
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

         
          </ScrollView>
              );
            }
          }

export default SettingsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },

  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    // backgroundColor: '#939BAF',
    // borderRadius:30,
    borderBottomWidth: 1,
    width:250,
    height:100,
    marginLeft: 60,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    textAlign: 'center'
},
inputs:{
    height:50,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
    

},
inputIcon:{
  width:30,
  height:30,
  marginLeft:15,
  justifyContent: 'center'
},
buttonContainer: {
  height:30,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  width:250,
  borderRadius:30,
},
loginButton: {
  backgroundColor: '#5B677D' ,
  width: 250,
  textAlign: 'center',
  marginLeft: 60,
},


eventsText: {
  color: '#5B677D',
  fontSize: 30,
  width: 250,
  textAlign: 'center',
  marginLeft: 60,
},

yelpButton: {
  backgroundColor: '#FF3E10' ,
  width: 250,
  textAlign: 'center',
  marginLeft: 60,
},

cancelButton: {
  width: 85,
  textAlign: 'center',
  marginLeft: 150
},

cancelText:{
  color:'#FF3E10'
},


loginText: {
  color: 'white',
},


});


