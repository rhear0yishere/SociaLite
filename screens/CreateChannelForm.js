var React = require('react');
var ReactNative = require('react-native');
import ChannelModel from './channelModel'
import EventModel from './eventModel'

import ChannelPage from './ChannelPage'


var {
  AppRegistry,
  AsyncStorage,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  AlertIOS,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,

} = ReactNative;

class CreateChannelForm extends React.Component {

  state ={
    name :'',
    channels: [],
    events:[],
    allChannels: [],
    clickedChannel: null ,
    email: this.props.email
   
  }


  // componentWillReceiveProps(){
  //   this.fetchData();
  // }
 
  componentDidMount(){
   this.fetchData();
 
  }
 
 
   fetchData(){
     ChannelModel.all().then( (res) => {
       this.setState ({
         allChannels: res.data.channels
       })

       console.log(this.state.allChannels, "ALL CHANNELS")
       
     })
 
   }


  //  clickChannel = ()=>{
  //    this.setState ({
  //      clickedChannel: this.state.allChannels[5]._id
  //    })
  //  }

  

createChannel = (name) => {
  let newPost = {
    name:this.state.name,  
    createdBy: "Rhea@gmail.com"
  }

  ChannelModel.create(newPost).then((res) => {
    let channels = this.state.channels;
    let newChannels = channels.push(res.data);
    this.setState({ newChannels })
  })
}

createEvent = (name) => {
  let newEvent = {
    title:this.state.title,  
    location:this.state.location
  }

  EventModel.create(newEvent).then((res) => {
    let events = this.state.events;
    let newEvents = events.push(res.data);
    this.setState({ newEvents })
  })
}

  render() {

  
    if(this.props.displayForm){

      return (
        <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


          <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Channel Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(name) => this.setState({name})}
              />
        </View>

        <Button
            onPress={() => this.createChannel('submit')}
            title="Submit Channel"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />


          <TextInput style={styles.inputs}
              placeholder="Event Title"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(title) => this.setState({title})}
              />
          <TextInput style={styles.inputs}
              placeholder="location"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(location) => this.setState({location})}
              />
        <Button
            onPress={() => this.createEvent('submitEvent')}
            title="Submit Evemt"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          </View>

          

          
          <ChannelPage matchClick = {this.state.clickedChannel} channels= {this.state.allChannels}/>

   


        </ScrollView>

      </View>
      );
      } else{
          return(<Text></Text>)
          
      }
    } 
  }


export default CreateChannelForm;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
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
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  
  
  });


